import { NextResponse } from "next/server";

/**
 * Lead endpoint → GoHighLevel (sub-account "PRIMEXIA METHOD").
 *
 * Two integrations, use one or both (env vars on Vercel):
 *  1. GHL_API_TOKEN + GHL_LOCATION_ID  → Private Integration token (LeadConnector API v2):
 *     upserts the contact with tags and adds a note with all questionnaire answers.
 *  2. GHL_WEBHOOK_URL → Inbound Webhook trigger of a GHL workflow: receives a flat JSON
 *     payload, useful to map fields to custom fields and to send the guide email.
 */

export const runtime = "nodejs";

const GHL_API = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

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
  if (!p.startsWith("+")) {
    // Italian mobile/landline without prefix
    p = p.startsWith("39") && p.length >= 11 ? `+${p}` : `+39${p}`;
  }
  return p;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: silently accept bots
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const nome = clean(body.nome, 80);
  const email = clean(body.email, 160).toLowerCase();
  const telefono = normalizePhone(clean(body.telefono, 30));
  const sesso = body.sesso === "donna" ? "donna" : "uomo";

  if (!nome || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || telefono.replace(/\D/g, "").length < 8 || !body.privacy) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const labels = body.labels ?? {};
  const answers = {
    sesso: sesso === "donna" ? "Donna" : "Uomo",
    eta: clean(labels.eta),
    difficolta: cleanArr(labels.difficolta),
    obiettivi: cleanArr(labels.obiettivi),
    kg_da_perdere: clean(labels.kg) || "Non indicato",
    provato_altro: clean(labels.provato),
    com_e_andata: clean(labels.esito),
  };
  const utm = Object.fromEntries(Object.entries(body.utm ?? {}).map(([k, v]) => [k, clean(v, 200)]));
  const landing = clean(body.landing, 20) || sesso;

  const tags = [
    "primexia-lead",
    `guida-${landing}`,
    `sesso-${sesso}`,
    body.eta ? `eta-${clean(body.eta, 20)}` : "",
    ...cleanArr(body.difficolta).map((d) => `diff-${d}`),
    ...cleanArr(body.obiettivi).map((o) => `obiettivo-${o}`),
    body.kg ? `kg-${clean(body.kg, 20)}` : "",
    body.provato ? `provato-${clean(body.provato, 30)}` : "",
    body.esito ? `esito-${clean(body.esito, 30)}` : "",
    body.marketing ? "consenso-marketing" : "",
    utm.source ? `utm-${utm.source}` : "",
  ].filter(Boolean);

  const noteBody = [
    `Questionario PRIMEXIA · Landing ${landing.toUpperCase()}`,
    `Sesso: ${answers.sesso}`,
    `Età: ${answers.eta}`,
    `Difficoltà: ${answers.difficolta.join(", ")}`,
    `Obiettivi: ${answers.obiettivi.join(", ")}`,
    `Kg da perdere: ${answers.kg_da_perdere}`,
    `Ha provato altro: ${answers.provato_altro}`,
    answers.com_e_andata ? `Com'è andata: ${answers.com_e_andata}` : "",
    `Consenso privacy: sì · Consenso marketing: ${body.marketing ? "sì" : "no"}`,
    `UTM: ${Object.entries(utm)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}=${v}`)
      .join(" · ") || "nessuno"}`,
    `Pagina: ${clean(body.pageUrl, 400)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const webhook = process.env.GHL_WEBHOOK_URL;

  if (!(token && locationId) && !webhook) {
    console.error("[lead] GHL non configurato: impostare GHL_API_TOKEN + GHL_LOCATION_ID oppure GHL_WEBHOOK_URL");
    return NextResponse.json({ ok: false, error: "crm_not_configured" }, { status: 503 });
  }

  const results: { api?: boolean; webhook?: boolean } = {};

  if (token && locationId) {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        Version: GHL_VERSION,
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      const up = await fetch(`${GHL_API}/contacts/upsert`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          locationId,
          firstName: nome,
          email,
          phone: telefono,
          source: `Landing PRIMEXIA ${landing}`,
          tags,
        }),
      });
      if (!up.ok) throw new Error(`upsert ${up.status}: ${(await up.text()).slice(0, 300)}`);
      const data = (await up.json()) as { contact?: { id?: string } };
      const contactId = data.contact?.id;
      if (contactId) {
        const note = await fetch(`${GHL_API}/contacts/${contactId}/notes`, {
          method: "POST",
          headers,
          body: JSON.stringify({ body: noteBody }),
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
          landing,
          ...answers,
          difficolta: answers.difficolta.join(", "),
          obiettivi: answers.obiettivi.join(", "),
          consenso_privacy: "si",
          consenso_marketing: body.marketing ? "si" : "no",
          tags: tags.join(","),
          riepilogo: noteBody,
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
