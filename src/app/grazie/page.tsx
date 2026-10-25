import type { Metadata } from "next";
import Image from "next/image";
import SiteFooter from "@/components/SiteFooter";
import DiscoveryCta from "@/components/DiscoveryCta";
import { Flower } from "@/components/Decor";

export const metadata: Metadata = {
  title: "Grazie · La tua guida PRIMEXIA™ è in arrivo",
  robots: { index: false, follow: false },
};

const DISCOVERY_URL = process.env.NEXT_PUBLIC_DISCOVERY_URL || "https://primexia-discovery.netlify.app/";

export default async function Grazie({ searchParams }: { searchParams: Promise<{ s?: string; n?: string }> }) {
  const sp = await searchParams;
  const variant = sp.s === "donna" ? "donna" : "uomo";
  const name = (sp.n ?? "").replace(/[^\p{L}\s'-]/gu, "").slice(0, 30).trim();

  const steps = [
    { n: "01", title: "Controlla la tua email", body: "La guida arriva in pochi minuti. Se non la vedi, guarda anche in Promozioni o Spam." },
    { n: "02", title: "Leggila con calma", body: "Dodici pagine per capire cosa sta cambiando nel tuo corpo e come lavora il metodo." },
    {
      n: "03",
      title: "Ti scriviamo su WhatsApp",
      body: "Nei prossimi giorni lo Studio ti contatta per capire insieme se il percorso è adatto a te. Senza impegno.",
    },
  ];

  return (
    <div data-variant={variant} className="min-h-dvh bg-bg">
      <header
        className="px-4 pt-16 pb-16 text-center sm:px-6 sm:pt-20"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgb(201 169 110 / 0.08), transparent 60%), var(--bg)" }}
      >
        <p className="kicker fade-up">Studio in Lifespan Nutrition · Longevity Hub · Verona</p>
        <p className="brand fade-up mt-8 text-[clamp(2.4rem,8vw,4.2rem)] leading-none" style={{ ["--i" as string]: 1 }}>
          PRIMEXIA<span className="text-[0.4em] tracking-normal align-super">™</span>
        </p>
        <Flower size={44} className="fade-up mx-auto mt-6 text-gold" />
        <p className="kicker fade-up mt-10" style={{ ["--i" as string]: 2 }}>
          Richiesta ricevuta
        </p>
        <h1 className="fade-up mx-auto mt-4 max-w-[20ch] text-[clamp(2rem,5vw,3rem)] leading-[1.2]" style={{ ["--i" as string]: 3 }}>
          {name ? `Grazie ${name}.` : "Grazie."} La tua guida è in arrivo.
        </h1>
        <p className="fade-up mx-auto mt-5 max-w-[48ch] text-[1.2rem] text-body italic" style={{ ["--i" as string]: 4 }}>
          Ti abbiamo inviato via email la guida gratuita PRIMEXIA METHOD™ {variant === "donna" ? "Donna" : "Uomo"}.
        </p>
      </header>

      <main>
        <section className="px-4 pb-20 sm:px-6">
          <ol className="mx-auto grid max-w-[940px] gap-4 md:grid-cols-3">
            {steps.map((s, i) => (
              <li
                key={s.n}
                className="fade-up border border-t-2 border-[var(--line)] border-t-gold bg-card px-6 py-6"
                style={{ ["--i" as string]: i + 5 }}
              >
                <p className="kicker !text-[0.68rem]">Passo {s.n}</p>
                <h2 className="mt-2 text-[1.35rem] text-cream">{s.title}</h2>
                <p className="mt-2 text-[1.02rem] text-body">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mx-auto h-px max-w-[680px] bg-[var(--gold-border)]" />

        {/* Upsell Discovery */}
        <section className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-[880px]">
            <div className="text-center">
              <p className="kicker">Se vuoi iniziare subito</p>
              <p className="brand mt-6 text-[clamp(2rem,6vw,3.2rem)] leading-none">
                PRIMEXIA<span className="text-[0.4em] tracking-normal align-super">™</span>
              </p>
              <p className="kicker mt-2 !tracking-[0.5em] text-gold">Discovery</p>
              <p className="mx-auto mt-8 max-w-[34ch] font-serif text-[1.45rem] leading-snug text-cream italic">
                Il primo incontro con la nutrizione molecolare di precisione.
              </p>
            </div>

            <div className="mt-12 grid items-center gap-10 border border-[var(--gold-border)] bg-card p-7 sm:p-10 md:grid-cols-[180px_1fr]">
              <div className="relative mx-auto aspect-[2/3] w-[150px] shadow-[0_24px_50px_-20px_rgb(0_0_0_/_0.9)] md:w-full">
                <Image src="/img/libro-primexia-method.webp" alt="Libro digitale PRIMEXIA METHOD" fill sizes="180px" className="object-cover" />
              </div>
              <div>
                <ul className="space-y-5">
                  <li className="border-l border-[var(--gold-border)] pl-5">
                    <p className="kicker !text-[0.68rem]">Incluso</p>
                    <p className="mt-1 text-[1.1rem] text-body">
                      <span className="text-cream">Il libro digitale PRIMEXIA METHOD™</span>, per conoscere filosofia, principi
                      e architettura del metodo.
                    </p>
                  </li>
                  <li className="border-l border-[var(--gold-border)] pl-5">
                    <p className="kicker !text-[0.68rem]">Incluso</p>
                    <p className="mt-1 text-[1.1rem] text-body">
                      <span className="text-cream">Un programma alimentare introduttivo di 7 giorni</span>, per sperimentare
                      l&apos;impostazione del metodo nella tua quotidianità.
                    </p>
                  </li>
                </ul>
                <div className="mt-8 flex flex-col items-center gap-2 border-t border-[var(--rule)] pt-8 sm:items-start">
                  <p className="kicker-muted">Investimento</p>
                  <p className="font-serif text-6xl leading-none font-light text-gold">€ 47</p>
                  <p className="text-[0.95rem] text-muted italic">Pagamento unico · ricevi il link via email</p>
                  <DiscoveryCta href={DISCOVERY_URL} variant={variant} />
                </div>
              </div>
            </div>
            <p className="mx-auto mt-6 max-w-[640px] text-center text-[0.92rem] leading-relaxed text-muted italic">
              Discovery è un&apos;esperienza introduttiva: non comprende check metabolico, esami del sangue, piano
              nutrizionale individuale, consulenze o supervisione diretta, che fanno parte del percorso completo PRIMEXIA
              METHOD™.
            </p>
            <p className="mx-auto mt-10 max-w-[520px] text-center font-serif text-[1.25rem] text-gold-lt italic">
              Il prossimo passo è informarti, capire e scegliere consapevolmente.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
