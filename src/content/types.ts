export type Variant = "uomo" | "donna";

export type Option = { value: string; label: string };

export type Testimonial = {
  label: string;
  name: string;
  meta: string;
  quote: string;
};

export type LandingContent = {
  variant: Variant;
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    tag: string; // "Uomo" | "Donna" (italic, under brand)
    title: string;
    meta: string;
    lead: string;
    bullets: string[];
    cta: string;
    ctaSub: string;
  };
  insight: {
    label: string;
    title: string;
    intro: string;
    items: { n: string; title: string; body: string }[];
    quote: string;
  };
  guide: {
    label: string;
    title: string;
    items: { title: string; body: string }[];
  };
  method: {
    label: string;
    statement: [string, string];
    intro: string;
    start: { label: string; title: string; body: string };
    phases: { name: string; label: string; body: string }[];
    highlight: string;
  };
  stories: {
    label: string;
    title: string;
    items: Testimonial[];
    note: string;
  };
  bio: {
    paragraphs: string[];
  };
  form: {
    label: string;
    title: string;
    subtitle: string;
    difficulties: Option[];
    goals: Option[];
  };
  faq: { q: string; a: string }[];
  closing: { statement: string; cta: string; ctaSub: string };
};

export const AGE_OPTIONS: Option[] = [
  { value: "under_30", label: "Meno di 30" },
  { value: "30_40", label: "30-40" },
  { value: "40_50", label: "40-50" },
  { value: "50_60", label: "50-60" },
  { value: "over_60", label: "Oltre 60" },
];

export const KG_OPTIONS: Option[] = [
  { value: "nessuno", label: "Nessuno" },
  { value: "1_5", label: "1-5 kg" },
  { value: "5_10", label: "5-10 kg" },
  { value: "10_15", label: "10-15 kg" },
  { value: "15_20", label: "15-20 kg" },
  { value: "oltre_20", label: "Oltre 20 kg" },
];

export const TRIED_OPTIONS: Option[] = [
  { value: "prima_volta", label: "No, è la prima volta" },
  { value: "fai_da_te", label: "Sì, diete fai da te" },
  { value: "nutrizionista", label: "Sì, con un nutrizionista o dietologo" },
  { value: "app_calorie", label: "Sì, app o conteggio delle calorie" },
  { value: "sostitutivi", label: "Sì, pasti sostitutivi o integratori" },
  { value: "digiuno", label: "Sì, digiuno intermittente" },
];

export const OUTCOME_OPTIONS: Option[] = [
  { value: "ripreso", label: "Ho perso peso ma l'ho ripreso" },
  { value: "scarsi", label: "Risultati scarsi o nulli" },
  { value: "difficile", label: "Troppo difficile da seguire" },
  { value: "in_parte", label: "Ha funzionato in parte" },
];

export const PHASES_NOTE = "RESET prepara, IGNITE accompagna, ANCHOR rafforza l'autonomia.";
