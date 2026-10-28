import Link from "next/link";
import { Flower } from "./Decor";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--rule)] bg-bg-deep px-4 pt-14 pb-28 text-center sm:px-6 sm:pb-14">
      <Flower size={30} className="mx-auto text-gold" />
      <p className="brand mt-4 text-lg">PRIMEXIA<span className="text-[0.55em] tracking-normal">™</span></p>
      <div className="mx-auto mt-6 max-w-2xl space-y-2 font-sans text-[0.75rem] leading-relaxed tracking-[0.14em] text-muted uppercase">
        <p>Lifespan Nutrition – Longevity Hub · Via Madonna del Terraglio 13, 37129 Verona</p>
        <ul className="flex flex-col items-center sm:flex-row sm:justify-center sm:gap-4">
          <li>
            <a href="https://www.lifespannutrition.it" className="inline-flex min-h-11 items-center text-gold hover:text-gold-lt" target="_blank" rel="noopener">
              www.lifespannutrition.it
            </a>
          </li>
          <li>
            <a href="mailto:studionutrizionebosi@gmail.com" className="inline-flex min-h-11 items-center normal-case hover:text-gold-lt">
              studionutrizionebosi@gmail.com
            </a>
          </li>
          <li>
            <a href="tel:+393462877008" className="inline-flex min-h-11 items-center hover:text-gold-lt">
              +39 346 287 7008
            </a>
          </li>
        </ul>
        <p>P.IVA 04541260230 · PEC studionutribosi@pec.it</p>
        <p>PRIMEXIA™ è un marchio registrato · EUIPO n. 302026000062725 · UIBM 3 aprile 2026</p>
      </div>
      <p className="mx-auto mt-6 max-w-xl font-serif text-[0.98rem] leading-relaxed text-muted italic">
        PRIMEXIA™ Method è un percorso di nutrizione con finalità di educazione alimentare e regolazione dello stile di
        vita. Non ha finalità diagnostiche o terapeutiche e non sostituisce il parere o la terapia del medico. Le esperienze
        riportate sono individuali e i risultati possono variare.
      </p>
      <p className="mx-auto mt-4 max-w-xl font-sans text-[0.75rem] leading-relaxed tracking-[0.1em] text-muted">
        Questo sito non fa parte del sito Facebook o di Meta Platforms, Inc. e non è approvato da Meta in alcun modo.
      </p>
      <p className="mt-5">
        <Link href="/privacy" className="kicker-muted inline-flex min-h-11 items-center underline-offset-4 hover:text-gold-lt hover:underline">
          Privacy e cookie
        </Link>
      </p>
    </footer>
  );
}
