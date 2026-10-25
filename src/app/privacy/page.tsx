import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy e cookie · PRIMEXIA™",
  robots: { index: false, follow: false },
};

export default function Privacy() {
  return (
    <div className="min-h-dvh bg-bg">
      <header className="border-b border-[var(--rule)] bg-bg-deep px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="brand text-xl">
            PRIMEXIA<span className="text-[0.55em] tracking-normal">™</span>
          </Link>
          <h1 className="mt-8 text-[clamp(2rem,5vw,3rem)]">Informativa privacy e cookie</h1>
          <p className="kicker-muted mt-3">Ai sensi degli artt. 13 e 14 del Regolamento UE 2016/679 (GDPR)</p>
        </div>
      </header>
      <main className="px-4 py-14 sm:px-6">
        <article className="mx-auto max-w-3xl space-y-8 leading-relaxed [&_h2]:text-[1.5rem] [&_h2]:text-cream [&_p]:mt-2 [&_p]:text-body [&_li]:text-body [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
          <section>
            <h2>Titolare del trattamento</h2>
            <p>
              Elena Bosi · Studio in Lifespan Nutrition – Longevity Hub, Via Madonna del Terraglio 13, 37129 Verona ·
              P.IVA 04541260230 · PEC studionutribosi@pec.it · Email:{" "}
              <a className="underline" href="mailto:studionutrizionebosi@gmail.com">
                studionutrizionebosi@gmail.com
              </a>
            </p>
          </section>
          <section>
            <h2>Quali dati raccogliamo</h2>
            <ul>
              <li>Dati di contatto: nome, email, numero di telefono.</li>
              <li>
                Risposte al questionario: sesso, fascia d&apos;età, difficoltà, obiettivi, kg da perdere (facoltativo),
                esperienze precedenti. Alcune risposte possono riguardare il benessere personale e sono trattate solo
                con il tuo consenso esplicito.
              </li>
              <li>Dati di navigazione e, solo con consenso, dati raccolti dal pixel di Meta.</li>
            </ul>
          </section>
          <section>
            <h2>Perché li trattiamo e base giuridica</h2>
            <ul>
              <li>Inviarti la guida gratuita e ricontattarti per presentarti il percorso: consenso (art. 6.1.a e 9.2.a GDPR).</li>
              <li>Inviarti comunicazioni e contenuti informativi: consenso facoltativo, revocabile in ogni momento.</li>
              <li>Misurare l&apos;efficacia delle campagne pubblicitarie: consenso ai cookie di profilazione.</li>
            </ul>
          </section>
          <section>
            <h2>Chi tratta i dati per nostro conto</h2>
            <p>
              I dati sono gestiti tramite il CRM HighLevel (LeadConnector) e il sito è ospitato su Vercel. Questi fornitori
              operano come responsabili del trattamento e possono trasferire dati fuori dall&apos;UE sulla base delle
              Clausole Contrattuali Standard della Commissione Europea. I dati non vengono venduti né diffusi.
            </p>
          </section>
          <section>
            <h2>Per quanto tempo</h2>
            <p>
              Fino alla revoca del consenso e comunque non oltre 24 mesi dall&apos;ultimo contatto, salvo obblighi di legge.
            </p>
          </section>
          <section>
            <h2>I tuoi diritti</h2>
            <p>
              Puoi chiedere in qualsiasi momento accesso, rettifica, cancellazione, limitazione, portabilità dei dati e
              revocare il consenso scrivendo a studionutrizionebosi@gmail.com. Puoi anche presentare reclamo al Garante
              per la protezione dei dati personali (garanteprivacy.it).
            </p>
          </section>
          <section id="cookie" className="scroll-mt-6">
            <h2>Cookie</h2>
            <p>
              Il sito usa cookie tecnici necessari al funzionamento e, solo se accetti, il pixel di Meta (Meta Platforms
              Ireland Ltd.) per misurare le visite e le conversioni delle campagne pubblicitarie. Puoi cambiare la tua scelta
              in qualsiasi momento cancellando i dati del sito dal browser: il banner comparirà di nuovo.
            </p>
          </section>
          <p className="kicker-muted">Ultimo aggiornamento: ottobre 2026.</p>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
