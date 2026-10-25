import type { Metadata } from "next";
import { BookOpen, CalendarDays, Mail, MessageCircle } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import { MoleculeArt } from "@/components/Decor";
import DiscoveryCta from "@/components/DiscoveryCta";

export const metadata: Metadata = {
  title: "Grazie · La tua guida PRIMEXIA™ è in arrivo",
  robots: { index: false, follow: false },
};

const DISCOVERY_URL = process.env.NEXT_PUBLIC_DISCOVERY_URL || "https://primexia-discovery.netlify.app/";

export default async function Grazie({
  searchParams,
}: {
  searchParams: Promise<{ s?: string; n?: string }>;
}) {
  const sp = await searchParams;
  const variant = sp.s === "donna" ? "donna" : "uomo";
  const name = (sp.n ?? "").replace(/[^\p{L}\s'-]/gu, "").slice(0, 30).trim();
  const lei = variant === "donna";

  const steps = [
    {
      icon: Mail,
      title: "Controlla la tua email",
      body: "La guida arriva in pochi minuti. Se non la vedi, guarda anche in Promozioni o Spam.",
    },
    {
      icon: BookOpen,
      title: "Leggila con calma",
      body: "Bastano 15 minuti per capire cosa sta succedendo nel tuo corpo e come lavora il metodo.",
    },
    {
      icon: MessageCircle,
      title: "Ti scriviamo su WhatsApp",
      body: `Nei prossimi giorni il team dello studio ti contatta per capire se il percorso è adatto a te. Nessun impegno.`,
    },
  ];

  return (
    <div data-variant={variant} className="min-h-dvh bg-bg text-fg">
      <header
        className="grain relative isolate overflow-hidden px-4 pt-8 pb-20 text-on-primary sm:px-6 sm:pb-24"
        style={{ background: "linear-gradient(165deg, var(--primary), var(--primary-2) 60%, var(--primary))" }}
      >
        <MoleculeArt className="pointer-events-none absolute -top-48 -right-48 -z-10 w-[720px] text-accent opacity-35" />
        <p className="mx-auto max-w-5xl font-serif text-xl tracking-[0.22em]">
          PRIMEXIA<span className="text-accent">™</span>
        </p>
        <div className="mx-auto mt-14 max-w-3xl text-center">
          <p className="hero-in text-[0.72rem] font-bold uppercase tracking-[0.26em] text-accent">Richiesta ricevuta</p>
          <h1 className="hero-in mt-5 text-[clamp(2.4rem,6vw,4rem)] leading-[1.04] font-medium" style={{ ["--i" as string]: 1 }}>
            {name ? `Grazie ${name}, ` : "Grazie, "}la tua guida è in arrivo.
          </h1>
          <p className="hero-in mx-auto mt-6 max-w-[56ch] text-lg text-on-primary-soft" style={{ ["--i" as string]: 2 }}>
            Ti abbiamo inviato via email la guida gratuita PRIMEXIA METHOD™ {lei ? "Donna" : "Uomo"}.
          </p>
        </div>
      </header>

      <main>
        <section className="px-4 sm:px-6">
          <ol className="mx-auto -mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="hero-in rounded-3xl border border-border bg-card p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)]"
                style={{ ["--i" as string]: i + 3 }}
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-accent text-on-accent">
                    <s.icon size={18} aria-hidden />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-fg-muted">Passo {i + 1}</span>
                </div>
                <h2 className="mt-4 font-sans text-lg font-bold tracking-normal">{s.title}</h2>
                <p className="mt-1.5 text-fg-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Discovery upsell */}
        <section className="px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[32px] bg-primary text-on-primary md:grid-cols-[1.2fr_1fr]">
            <div className="p-8 sm:p-12">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-accent">Se vuoi iniziare subito</p>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-[1.06] font-medium">PRIMEXIA™ Discovery</h2>
              <p className="mt-2 font-serif text-xl italic text-on-primary-soft">
                Il primo incontro con la nutrizione molecolare di precisione.
              </p>
              <ul className="mt-8 space-y-4 text-on-primary-soft">
                <li className="flex gap-3">
                  <BookOpen size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <span>
                    <strong className="text-on-primary">Il libro digitale PRIMEXIA METHOD™</strong>, per conoscere
                    filosofia, principi e architettura del metodo.
                  </span>
                </li>
                <li className="flex gap-3">
                  <CalendarDays size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <span>
                    <strong className="text-on-primary">Un programma alimentare introduttivo di 7 giorni</strong>, per
                    provare l&apos;impostazione del metodo nella tua quotidianità.
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center border-t border-white/10 bg-white/[0.04] p-8 sm:p-12 md:border-t-0 md:border-l">
              <p className="text-sm uppercase tracking-[0.2em] text-on-primary-soft">Accesso immediato</p>
              <p className="mt-2 font-serif text-7xl leading-none text-accent">47 €</p>
              <p className="mt-2 text-sm text-on-primary-soft">Pagamento unico · ricevi il link via email</p>
              <DiscoveryCta href={DISCOVERY_URL} variant={variant} />
              <p className="mt-6 text-xs leading-relaxed text-on-primary-soft">
                Discovery è un&apos;esperienza introduttiva: non comprende check metabolico, esami, piano nutrizionale
                individuale, consulenze o supervisione diretta, che fanno parte del percorso completo PRIMEXIA METHOD™.
              </p>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-fg-muted">
            Il prossimo passo è informarti, capire e scegliere con consapevolezza. Nessuna fretta.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
