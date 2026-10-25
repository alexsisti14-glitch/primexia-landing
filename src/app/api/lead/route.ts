import { NextResponse } from "next/server";
import { GHL_API, STAGE_NEW, fieldIdMap, ghlCreds, ghlHeaders, primexiaPipeline, type FieldKey } from "@/lib/ghl";

/**
 * Lead endpoint → GoHighLevel (sub-account "PRIMEXIA METHOD").
 *
 * 1. API (TOKEN_GHL + GHL_ID_LUOGO): upsert del contatto con tag e campi personalizzati PRIMEXIA + nota.
 * 2. Webhook (GHL_WEBHOOK_URL_UOMO / GHL_WEBHOOK_URL_DONNA): payload piatto che fa partire
 *    il workflow giusto in base alla landing.
 */

export const runtime = "nodejs";

type Body = {
  sesso?: string;
  eta?: string;
  difficolta?: string[];
  obiettivi?: string[];
  kg?: string;
  provato?: string;
  esito?: string;
  nome?: string;
  email?: string;
  telefono?: string;
  privacy?: boolean;
  marketing?: boolean;
  website?: string;
  landing?: string;
  pageUrl?: string;
  eventId?: string;
  labels?: {
    eta?: string;
    difficolta?: string[];
    obiettivi?: string[];
    kg?: string;
    provato?: string;
    esito?: string;
  };
  utm?: Record<string, string>;
};

const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const cleanArr = (v: unknown) => (Array.isArray(v) ? v.map((x) => clean(x, 120)).filter(Boolean).slice(0, 12) : []);

function normalizePhone(raw: string) {
  let p = raw.replace(/[^\d+]/g, "");
  if (p.startsWith("00")) p = `+${p.slice(2)}`;
  if (!p.startsWith("+")) p = p.startsWith("39") && p.length >= 11 ? `+${p}` : `+39${p}`;
  return p;
}

function webhookFor(landing: "uomo" | "donna") {
  return landing === "donna"
    ? process.env.GHL_WEBHOOK_URL_DONNA || process.env.GHL_WEBHOOK_URL
    : process.env.GHL_WEBHOOK_URL_UOMO || process.env.GHL_WEBHOOK_URL;
}

/** Health check: verifica token, location e campi (non espone segreti). */
export async function GET() {
  const { token, locationId } = ghlCreds();
  const webhooks = { uomo: Boolean(webhookFor("uomo")), donna: Boolean(webhookFor("donna")) };
  if (!token || !locationId) return NextResponse.json({ api: "missing", webhooks });
  try {
    const r = await fetch(`${GHL_API}/locations/${locationId}`, { headers: ghlHeaders(token), cache: "no-store" });
    const name = r.ok ? ((await r.json()) as { location?: { name?: string } }).location?.name : undefined;
    let fields = 0;
    try {
      fields = (await fieldIdMap(token, locationId)).size;
    } catch {}
    return NextResponse.json({ api: r.ok ? "ok" : `error_${r.status}`, location: name ?? null, campiPrimexia: fields, webhooks });
  } catch {
    return NextResponse.json({ api: "unreachable", webhooks });
  }
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (clean(body.website)) return NextResponse.json({ ok: true }); // honeypot

  const nome = clean(body.nome, 80);
  const email = clean(body.email, 160).toLowerCase();
  const telefono = normalizePhone(clean(body.telefono, 30));
  const sesso = body.sesso === "donna" ? "donna" : "uomo";
  const landing: "uomo" | "donna" = body.landing === "donna" ? "donna" : body.landing === "uomo" ? "uomo" : sesso;

  if (!nome || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || telefono.replace(/\D/g, "").length < 8 || !body.privacy) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const labels = body.labels ?? {};
  const utm = Object.fromEntries(Object.entries(body.utm ?? {}).map(([k, v]) => [k, clean(v, 200)]));
  const a = {
    sesso: sesso === "donna" ? "Donna" : "Uomo",
    eta: clean(labels.eta),
    difficolta: cleanArr(labels.difficolta),
    obiettivi: cleanArr(labels.obiettivi),
    kg: clean(labels.kg) || "Non indicato",
    provato: clean(labels.provato),
    esito: clean(labels.esito),
    landing: landing === "donna" ? "Donna" : "Uomo",
    marketing: body.marketing ? "Sì" : "No",
  };

  const riepilogo = [
    `Questionario PRIMEXIA · Landing ${a.landing.toUpperCase()}`,
    `Sesso: ${a.sesso}`,
    `Età: ${a.eta}`,
    `Difficoltà: ${a.difficolta.join(", ")}`,
    `Obiettivi: ${a.obiettivi.join(", ")}`,
    `Kg da perdere: ${a.kg}`,
    `Ha provato altro: ${a.provato}`,
    a.esito ? `Com'è andata: ${a.esito}` : "",
    `Consenso privacy: Sì · Consenso marketing: ${a.marketing}`,
    `UTM: ${
      Object.entries(utm)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}=${v}`)
        .join(" · ") || "nessuno"
    }`,
    `Pagina: ${clean(body.pageUrl, 400)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const tags = [
    "primexia-lead",
    `guida-${landing}`,
    `sesso-${sesso}`,
    body.eta ? `eta-${clean(body.eta, 20)}` : "",
    body.marketing ? "consenso-marketing" : "",
    utm.source ? `utm-${utm.source}` : "",
  ].filter(Boolean);

  const values: Record<FieldKey, string | string[]> = {
    sesso: a.sesso,
    eta: a.eta,
    difficolta: a.difficolta,
    obiettivi: a.obiettivi,
    kg: a.kg,
    provato: a.provato,
    esito: a.esito,
    landing: a.landing,
    marketing: a.marketing,
    utm_source: utm.source ?? "",
    utm_campaign: utm.campaign ?? "",
    utm_content: utm.content ?? "",
    riepilogo,
  };

  const { token, locationId } = ghlCreds();
  const webhook = webhookFor(landing);
  if (!(token && locationId) && !webhook) {
    console.error("[lead] GHL non configurato");
    return NextResponse.json({ ok: false, error: "crm_not_configured" }, { status: 503 });
  }

  const results: { api?: boolean; webhook?: boolean } = {};

  if (token && locationId) {
    try {
      const headers = ghlHeaders(token);
      let customFields: { id: string; field_value: string | string[] }[] = [];
      try {
        const ids = await fieldIdMap(token, locationId);
        customFields = (Object.keys(values) as FieldKey[])
          .filter((k) => ids.has(k) && (Array.isArray(values[k]) ? values[k].length : values[k]))
          .map((k) => ({ id: ids.get(k)!, field_value: values[k] }));
      } catch (e) {
        console.error("[lead] lettura campi GHL fallita", e);
      }
      const up = await fetch(`${GHL_API}/contacts/upsert`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          locationId,
          firstName: nome,
          email,
          phone: telefono,
          source: `Landing PRIMEXIA ${a.landing}`,
          tags,
          customFields,
        }),
      });
      if (!up.ok) throw new Error(`upsert ${up.status}: ${(await up.text()).slice(0, 300)}`);
      const data = (await up.json()) as { contact?: { id?: string } };
      if (data.contact?.id) {
        // Opportunità nella pipeline PRIMEXIA METHOD, fase "Nuovo lead · Uomo/Donna" (solo se non esiste già)
        try {
          const pipe = await primexiaPipeline(token, locationId);
          const stageId = pipe?.stages.get(STAGE_NEW[landing]);
          if (pipe && stageId) {
            const q = new URLSearchParams({ location_id: locationId, pipeline_id: pipe.pipelineId, contact_id: data.contact.id });
            const found = await fetch(`${GHL_API}/opportunities/search?${q}`, { headers, cache: "no-store" });
            const existing = found.ok ? ((await found.json()) as { opportunities?: unknown[] }).opportunities ?? [] : [];
            if (existing.length === 0) {
              const opp = await fetch(`${GHL_API}/opportunities/`, {
                method: "POST",
                headers,
                body: JSON.stringify({
                  locationId,
                  pipelineId: pipe.pipelineId,
                  pipelineStageId: stageId,
                  contactId: data.contact.id,
                  name: `${nome} · ${a.landing}`,
                  status: "open",
                  source: `Landing PRIMEXIA ${a.landing}`,
                }),
              });
              if (!opp.ok) console.error("[lead] opportunità GHL fallita", opp.status, (await opp.text()).slice(0, 200));
            }
          } else {
            console.error("[lead] pipeline PRIMEXIA METHOD o fase non trovata");
          }
        } catch (e) {
          console.error("[lead] errore pipeline GHL", e);
        }
        const note = await fetch(`${GHL_API}/contacts/${data.contact.id}/notes`, {
          method: "POST",
          headers,
          body: JSON.stringify({ body: riepilogo }),
        });
        if (!note.ok) console.error("[lead] nota GHL fallita", note.status);
      }
      results.api = true;
    } catch (e) {
      console.error("[lead] errore API GHL", e);
      results.api = false;
    }
  }

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: nome,
          email,
          phone: telefono,
          landing: a.landing,
          sesso: a.sesso,
          eta: a.eta,
          difficolta: a.difficolta.join(", "),
          obiettivi: a.obiettivi.join(", "),
          kg_da_perdere: a.kg,
          ha_provato_altro: a.provato,
          com_e_andata: a.esito,
          consenso_privacy: "Sì",
          consenso_marketing: a.marketing,
          tags: tags.join(","),
          riepilogo,
          utm_source: utm.source ?? "",
          utm_medium: utm.medium ?? "",
          utm_campaign: utm.campaign ?? "",
          utm_content: utm.content ?? "",
          utm_term: utm.term ?? "",
          fbclid: utm.fbclid ?? "",
          event_id: clean(body.eventId, 80),
          page_url: clean(body.pageUrl, 400),
          submitted_at: new Date().toISOString(),
        }),
      });
      results.webhook = res.ok;
      if (!res.ok) console.error("[lead] webhook GHL", res.status);
    } catch (e) {
      console.error("[lead] errore webhook GHL", e);
      results.webhook = false;
    }
  }

  const success = results.api === true || results.webhook === true;
  return NextResponse.json({ ok: success }, { status: success ? 200 : 502 });
}
