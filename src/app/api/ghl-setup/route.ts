import { NextResponse } from "next/server";
import { GHL_API, PRIMEXIA_FIELDS, ghlCreds, ghlHeaders, listContactFields } from "@/lib/ghl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Crea (se mancano) i campi personalizzati PRIMEXIA nel sub-account GHL.
 * Protetto da header x-setup-key = env GHL_SETUP_KEY. Idempotente.
 */
export async function POST(req: Request) {
  const key = process.env.GHL_SETUP_KEY;
  if (!key || req.headers.get("x-setup-key") !== key) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
  const { token, locationId } = ghlCreds();
  if (!token || !locationId) return NextResponse.json({ ok: false, error: "missing_creds" }, { status: 503 });

  const existing = await listContactFields(token, locationId);
  const report: { name: string; status: string; id?: string; fieldKey?: string }[] = [];

  for (const f of PRIMEXIA_FIELDS) {
    const hit = existing.find((g) => g.name.trim().toLowerCase() === f.name.toLowerCase());
    if (hit) {
      report.push({ name: f.name, status: "esistente", id: hit.id, fieldKey: hit.fieldKey });
      continue;
    }
    const body: Record<string, unknown> = { name: f.name, dataType: f.dataType, model: "contact" };
    if ("options" in f) body.options = f.options;
    const r = await fetch(`${GHL_API}/locations/${locationId}/customFields`, {
      method: "POST",
      headers: ghlHeaders(token),
      body: JSON.stringify(body),
    });
    const txt = await r.text();
    if (!r.ok) {
      report.push({ name: f.name, status: `errore_${r.status}: ${txt.slice(0, 160)}` });
      continue;
    }
    const data = JSON.parse(txt) as { customField?: { id: string; fieldKey?: string } };
    report.push({ name: f.name, status: "creato", id: data.customField?.id, fieldKey: data.customField?.fieldKey });
  }
  return NextResponse.json({ ok: true, report });
}
