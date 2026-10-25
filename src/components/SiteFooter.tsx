import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-primary px-4 py-14 text-on-primary-soft sm:px-6">
      <div className="mx-auto max-w-3xl text-center text-sm leading-relaxed">
        <p className="font-serif text-2xl tracking-[0.2em] text-on-primary">
          PRIMEXIA<span className="text-accent">™</span>
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.2em]">Studio in Lifespan Nutrition · Longevity Hub</p>
        <p className="mt-6">
          Via Madonna del Terraglio 13, 37129 Verona · P.IVA 04541260230
          <br />
          <a href="mailto:studionutrizionebosi@gmail.com" className="underline-offset-2 hover:text-on-primary hover:underline">
            studionutrizionebosi@gmail.com
          </a>{" "}
          ·{" "}
          <a href="tel:+393462877008" className="underline-offset-2 hover:text-on-primary hover:underline">
            +39 346 287 7008
          </a>
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-xs opacity-80">
          Il percorso ha finalità di educazione alimentare e regolazione dello stile di vita, senza finalità
          diagnostiche o terapeutiche, e non sostituisce il parere del medico curante. Le esperienze riportate sono
          individuali e i risultati possono variare. PRIMEXIA™ è un marchio registrato · EUIPO n. 302026000062725 ·
          UIBM 3 aprile 2026.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-xs opacity-60">
          Questo sito non fa parte del sito Facebook o di Meta Platforms, Inc. e non è approvato da Meta in alcun
          modo. Facebook è un marchio registrato di Meta Platforms, Inc.
        </p>
        <p className="mt-6 text-xs">
          <Link href="/privacy" className="underline underline-offset-2 hover:text-on-primary">
            Privacy e cookie
          </Link>
        </p>
      </div>
    </footer>
  );
}
