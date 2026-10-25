import { NextResponse } from "next/server";
import { GHL_API, PIPELINE_NAME, PIPELINE_STAGES, PRIMEXIA_FIELDS, ghlCreds, ghlHeaders, listContactFields, listPipelines } from "@/lib/ghl";

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
  // Pipeline PRIMEXIA METHOD
  let pipeline: unknown;
  try {
    const existingP = (await listPipelines(token, locationId)).find(
      (x) => x.name.trim().toLowerCase() === PIPELINE_NAME.toLowerCase(),
    );
    if (existingP) {
      pipeline = { status: "esistente", id: existingP.id, stages: existingP.stages.map((s) => s.name) };
    } else {
      const r = await fetch(`${GHL_API}/opportunities/pipelines`, {
        method: "POST",
        headers: ghlHeaders(token),
        body: JSON.stringify({
          locationId,
          name: PIPELINE_NAME,
          showInFunnel: true,
          showInPieChart: true,
          stages: PIPELINE_STAGES.map((name, position) => ({ name, position, showInFunnel: true, showInPieChart: true })),
        }),
      });
      const txt = await r.text();
      pipeline = r.ok ? { status: "creata", body: JSON.parse(txt) } : { status: `errore_${r.status}`, detail: txt.slice(0, 300) };
    }
  } catch (e) {
    pipeline = { status: "errore", detail: String(e).slice(0, 300) };
  }

  return NextResponse.json({ ok: true, report, pipeline });
}
