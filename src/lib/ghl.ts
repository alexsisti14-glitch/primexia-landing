import { AGE_OPTIONS, KG_OPTIONS, OUTCOME_OPTIONS, TRIED_OPTIONS } from "@/content/types";
import { uomo } from "@/content/uomo";
import { donna } from "@/content/donna";

export const GHL_API = "https://services.leadconnectorhq.com";
export const GHL_VERSION = "2021-07-28";

export function ghlCreds() {
  return {
    token: process.env.GHL_API_TOKEN || process.env.TOKEN_GHL,
    locationId: process.env.GHL_LOCATION_ID || process.env.GHL_ID_LUOGO,
  };
}

export function ghlHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Version: GHL_VERSION,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

const uniq = (a: string[]) => [...new Set(a)];

/** Campi personalizzati del contatto usati dal questionario PRIMEXIA. */
export const PRIMEXIA_FIELDS = [
  { key: "sesso", name: "PRIMEXIA Sesso", dataType: "SINGLE_OPTIONS", options: ["Uomo", "Donna"] },
  { key: "eta", name: "PRIMEXIA Età", dataType: "SINGLE_OPTIONS", options: AGE_OPTIONS.map((o) => o.label) },
  {
    key: "difficolta",
    name: "PRIMEXIA Difficoltà",
    dataType: "CHECKBOX",
    options: uniq([...uomo.form.difficulties, ...donna.form.difficulties].map((o) => o.label)),
  },
  {
    key: "obiettivi",
    name: "PRIMEXIA Obiettivi",
    dataType: "CHECKBOX",
    options: uniq([...uomo.form.goals, ...donna.form.goals].map((o) => o.label)),
  },
  {
    key: "kg",
    name: "PRIMEXIA Kg da perdere",
    dataType: "SINGLE_OPTIONS",
    options: ["Non indicato", ...KG_OPTIONS.map((o) => o.label)],
  },
  { key: "provato", name: "PRIMEXIA Ha provato altro", dataType: "SINGLE_OPTIONS", options: TRIED_OPTIONS.map((o) => o.label) },
  { key: "esito", name: "PRIMEXIA Com'è andata", dataType: "SINGLE_OPTIONS", options: OUTCOME_OPTIONS.map((o) => o.label) },
  { key: "landing", name: "PRIMEXIA Landing", dataType: "SINGLE_OPTIONS", options: ["Uomo", "Donna"] },
  { key: "marketing", name: "PRIMEXIA Consenso marketing", dataType: "SINGLE_OPTIONS", options: ["Sì", "No"] },
  { key: "utm_source", name: "PRIMEXIA UTM source", dataType: "TEXT" },
  { key: "utm_campaign", name: "PRIMEXIA UTM campaign", dataType: "TEXT" },
  { key: "utm_content", name: "PRIMEXIA UTM content", dataType: "TEXT" },
  { key: "riepilogo", name: "PRIMEXIA Riepilogo questionario", dataType: "LARGE_TEXT" },
] as const;

export type FieldKey = (typeof PRIMEXIA_FIELDS)[number]["key"];

type GhlField = { id: string; name: string; fieldKey?: string; dataType?: string };

export async function listContactFields(token: string, locationId: string): Promise<GhlField[]> {
  const r = await fetch(`${GHL_API}/locations/${locationId}/customFields?model=contact`, {
    headers: ghlHeaders(token),
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`customFields ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const data = (await r.json()) as { customFields?: GhlField[] };
  return data.customFields ?? [];
}

let cache: { at: number; map: Map<string, string> } | null = null;

/** name → id dei campi PRIMEXIA (cache 10 minuti). */
export async function fieldIdMap(token: string, locationId: string) {
  if (cache && Date.now() - cache.at < 10 * 60_000) return cache.map;
  const fields = await listContactFields(token, locationId);
  const map = new Map<string, string>();
  for (const f of PRIMEXIA_FIELDS) {
    const hit = fields.find((g) => g.name.trim().toLowerCase() === f.name.toLowerCase());
    if (hit) map.set(f.key, hit.id);
  }
  // cache solo se tutti i campi esistono (evita di memorizzare una mappa incompleta)
  if (map.size === PRIMEXIA_FIELDS.length) cache = { at: Date.now(), map };
  return map;
}
