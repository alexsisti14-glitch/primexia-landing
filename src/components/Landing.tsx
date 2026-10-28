import Image from "next/image";
import type { LandingContent } from "@/content/types";
import Questionnaire from "./Questionnaire";
import StickyCta from "./StickyCta";
import Reveal from "./Reveal";
import SiteFooter from "./SiteFooter";
import { Flower, GuideCover } from "./Decor";

const BOOKS = [
  { src: "/img/libro-nutrimento-eterno.webp", title: "Il Nutrimento Eterno", sub: "Dal fuoco primordiale alla longevità" },
  { src: "/img/libro-primordialita-molecolare.webp", title: "La primordialità molecolare", sub: "Riscoprire la radice biologica del nutrimento" },
  { src: "/img/libro-orientamento-metabolico.webp", title: "Orientamento Metabolico", sub: "Scritti di biologia quotidiana" },
];

function SectionHead({ label, title, className = "" }: { label: string; title: string; className?: string }) {
  return (
    <div className={`reveal text-center ${className}`}>
      <p className="kicker">{label}</p>
      <h2 className="mx-auto mt-4 max-w-[22ch] text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.25]">{title}</h2>
    </div>
  );
}

function Sep() {
  return <div className="rule-gold mx-auto !w-[min(680px,90%)]" aria-hidden="true" />;
}

export default function Landing({ content: c }: { content: LandingContent }) {
  return (
    <div data-variant={c.variant} className="min-h-dvh bg-bg">
      <Reveal />

      {/* ---------- Testata (stile pagine PRIMEXIA) ---------- */}
      <header className="bg-bg-deep px-4 pt-6 pb-6 text-center sm:px-6 sm:pt-7 sm:pb-8">
        <p className="kicker hidden sm:block">Lifespan Nutrition – Longevity Hub · Verona</p>
        <div className="relative mx-auto size-[56px] sm:mt-5 sm:size-[68px] overflow-hidden rounded-full border border-[var(--gold-border)]">
          <Image src="/img/elena-bosi-volto.webp" alt="Elena Bosi" fill sizes="68px" className="object-cover" priority />
        </div>
        <p className="mt-3 font-serif text-[1.35rem] font-light tracking-[0.18em] text-cream uppercase sm:mt-4 sm:text-[1.6rem]">Elena Bosi</p>
        <p className="kicker-muted mt-1.5 !text-gold">
          CPC – Psychosomatic Nutrition Counselor · Lifespan Nutrition Specialist
          <span className="hidden sm:inline"> · Founder PRIMEXIA™ Method</span>
        </p>
      </header>

      <main>
        {/* ---------- HERO ---------- */}
        <section
          className="relative overflow-hidden border-t border-[var(--rule)] px-4 pt-7 pb-16 sm:px-6 sm:pt-10 lg:pt-20 lg:pb-24"
          style={{ background: "radial-gradient(ellipse at 75% 10%, rgb(212 176 106 / 0.10), transparent 55%), var(--bg)" }}
        >
          <div className="mx-auto grid max-w-[1040px] items-start gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
            <div className="flex flex-col">
              <p className="fade-up font-serif text-lg tracking-[0.3em] sm:text-xl text-gold uppercase" style={{ ["--i" as string]: 1 }}>
                PRIMEXIA™ <span className="tracking-[0.12em] text-gold normal-case italic">Method · {c.hero.tag}</span>
              </p>
              <h1
                className="fade-up mt-3 text-[clamp(1.95rem,5vw,3.4rem)] leading-[1.14] sm:mt-4"
                style={{ ["--i" as string]: 2 }}
              >
                {c.hero.title}
              </h1>
              <p className="fade-up mt-5 hidden font-sans text-[0.75rem] tracking-[0.12em] text-muted sm:block" style={{ ["--i" as string]: 3 }}>
                {c.hero.meta}
              </p>
              <div className="fade-up my-5 h-px bg-[var(--rule)] sm:my-8" style={{ ["--i" as string]: 3 }} />
              <p className="fade-up text-[1.2rem] leading-relaxed text-body italic sm:text-[1.3rem]" style={{ ["--i" as string]: 4 }}>
                {c.hero.lead}
              </p>
              <ul className="fade-up order-last mt-8 sm:order-none sm:mt-7" style={{ ["--i" as string]: 5 }}>
                {c.hero.bullets.map((b) => (
                  <li key={b} className="flex gap-4 border-b border-[var(--rule)] py-2.5 text-[1.08rem] text-body">
                    <span className="text-gold" aria-hidden>
                      —
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="fade-up mt-6 text-center sm:mt-10 lg:text-left" style={{ ["--i" as string]: 6 }}>
                <a href="#questionario" id="hero-cta" className="btn-gold w-full sm:w-auto">
                  {c.hero.cta}
                  <small>{c.hero.ctaSub}</small>
                </a>
              </div>
            </div>

            <div className="fade-up flex justify-center lg:pt-6" style={{ ["--i" as string]: 3 }}>
              <GuideCover variant={c.variant} />
            </div>
          </div>
        </section>

        <Sep />

        {/* ---------- IL PROBLEMA ---------- */}
        <section className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-[680px]">
            <SectionHead label={c.insight.label} title={c.insight.title} />
            <p className="reveal mt-6 text-center text-[1.15rem] text-body">{c.insight.intro}</p>
            <div className="mt-12 space-y-9">
              {c.insight.items.map((it, i) => (
                <div key={it.n} className="reveal border-l border-[var(--gold-border)] pl-6" style={{ ["--i" as string]: i }}>
                  <p className="kicker !text-[0.75rem] ">{it.n}</p>
                  <h3 className="mt-2 text-[clamp(1.2rem,2.6vw,1.5rem)] leading-snug text-cream">{it.title}</h3>
                  <p className="mt-2 text-[1.05rem] text-body">{it.body}</p>
                </div>
              ))}
            </div>
            <blockquote className="reveal mt-12 border border-[var(--gold-border)] bg-[var(--gold-soft)] px-7 py-7 text-center">
              <p className="font-serif text-[clamp(1.15rem,2.4vw,1.4rem)] leading-relaxed text-cream italic">
                {c.insight.quote}
              </p>
            </blockquote>
          </div>

          {/* Visual 01 · Risposte biologiche individuali */}
          <figure className="reveal relative mx-auto mt-16 max-w-[560px] overflow-hidden border border-[var(--gold-border)]">
            <div className="relative aspect-[4/5]">
              <Image
                src="/img/risposte-biologiche.webp"
                alt="Una donna e un uomo affiancati, con una trama dorata che evidenzia muscoli e metabolismo"
                fill
                sizes="(max-width: 640px) 100vw, 560px"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#080402] to-transparent" aria-hidden="true" />
            </div>
            <figcaption className="relative bg-[#080402] px-6 pt-2 pb-8 text-center sm:px-9 sm:pb-10">
              <p className="kicker">Risposte biologiche individuali</p>
              <p className="mt-3 font-serif text-[clamp(1.45rem,4.6vw,2rem)] leading-tight text-gold-lt">
                Perché due persone che seguono la stessa alimentazione ottengono risultati diversi?
              </p>
              <p className="mt-3 text-[1.02rem] text-cream italic">
                La risposta non si trova soltanto nelle calorie. Ogni organismo ha una propria biologia.
              </p>
            </figcaption>
          </figure>
        </section>

        <Sep />

        {/* ---------- DENTRO LA GUIDA ---------- */}
        <section className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-[940px]">
            <SectionHead label={c.guide.label} title={c.guide.title} />
            <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.guide.items.map((g, i) => (
                <li
                  key={g.title}
                  className="reveal border border-t-2 border-[var(--line)] border-t-gold bg-card px-6 py-6"
                  style={{ ["--i" as string]: i }}
                >
                  <p className="kicker !text-[0.75rem]">Capitolo {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-[1.3rem] leading-snug text-cream">{g.title}</h3>
                  <p className="mt-1.5 text-[1rem] text-body italic">{g.body}</p>
                </li>
              ))}
              <li className="reveal flex items-center justify-center border border-dashed border-[var(--gold-border)] px-6 py-8 text-center">
                <a href="#questionario" className="btn-line !text-gold">
                  Ricevi la guida →
                </a>
              </li>
            </ol>
          </div>
        </section>

        {/* ---------- IL METODO ---------- */}
        <section className="border-y border-[var(--rule)] bg-bg-raise px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-[680px]">
            <div className="reveal text-center">
              <p className="kicker">{c.method.label}</p>
              <Flower size={58} className="mx-auto mt-8 text-gold" />
              <p className="mt-8 font-serif text-[clamp(1.6rem,4vw,2.3rem)] leading-snug text-cream italic">
                {c.method.statement[0]}
                <br />
                {c.method.statement[1]}
              </p>
              <p className="mx-auto mt-6 max-w-[60ch] text-[1.08rem] text-body">{c.method.intro}</p>
            </div>

            <div className="reveal mt-12 border border-[var(--gold-border)] bg-card px-7 py-7">
              <p className="kicker !text-[0.75rem]">{c.method.start.label}</p>
              <h3 className="mt-2 text-[1.5rem] text-cream">{c.method.start.title}</h3>
              <p className="mt-2 text-[1.05rem] text-body">{c.method.start.body}</p>
            </div>

            <ol className="mt-5 space-y-5">
              {c.method.phases.map((p, i) => (
                <li
                  key={p.name}
                  className="reveal flex items-start gap-5 border border-[var(--gold-border)] bg-card px-6 py-6"
                  style={{ ["--i" as string]: i }}
                >
                  <span className="w-8 shrink-0 font-serif text-[2.2rem] leading-none text-gold/70">{i + 1}</span>
                  <div>
                    <h3 className="font-sans text-[0.75rem] font-semibold tracking-[0.2em] text-gold uppercase">
                      {p.name} <span className="font-normal text-muted">· {p.label}</span>
                    </h3>
                    <p className="mt-2 text-[1.05rem] text-body">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <blockquote className="reveal mt-12 border border-[var(--gold-border)] bg-[var(--gold-soft)] px-7 py-7">
              <p className="font-serif text-[clamp(1.1rem,2.3vw,1.35rem)] leading-relaxed text-cream italic">
                {c.method.highlight}
              </p>
            </blockquote>
          </div>

          {/* Visual 03 · Architettura nutrizionale personalizzata */}
          <figure className="reveal relative mx-auto mt-16 max-w-[560px] overflow-hidden border border-[var(--gold-border)]">
            <div className="relative aspect-square">
              <Image
                src="/img/architettura-nutrizionale.webp"
                alt="Una donna e un uomo schiena contro schiena tra molecole dorate"
                fill
                sizes="(max-width: 640px) 100vw, 560px"
                className="object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#080402] to-transparent" aria-hidden="true" />
            </div>
            <figcaption className="relative bg-[#080402] px-6 pt-2 pb-8 text-center sm:px-9 sm:pb-10">
              <p className="brand text-[1.5rem]">PRIMEXIA<span className="text-[0.5em] tracking-normal">™</span></p>
              <p className="kicker mt-1 !tracking-[0.45em]">Method</p>
              <p className="mx-auto mt-4 max-w-[34ch] text-[1.05rem] text-cream">
                Un&apos;architettura nutrizionale personalizzata, progettata intorno alla biologia individuale.
              </p>
              <ul className="mx-auto mt-6 grid max-w-[420px] grid-cols-2 gap-x-5 gap-y-3">
                {["Ricomposizione corporea", "Equilibrio metabolico", "Estetica e armonia", "Longevità e vitalità"].map((t) => (
                  <li key={t} className="border-t border-[var(--gold-border)] pt-2 font-sans text-[0.72rem] leading-snug font-semibold tracking-[0.14em] text-gold uppercase">
                    {t}
                  </li>
                ))}
              </ul>
            </figcaption>
          </figure>
        </section>

        {/* ---------- STORIE ---------- */}
        <section className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-[940px]">
            <SectionHead label={c.stories.label} title={c.stories.title} />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.stories.items.map((s, i) => (
                <figure
                  key={s.name}
                  className="reveal flex flex-col border border-t-2 border-[var(--line)] border-t-gold bg-card px-6 py-6"
                  style={{ ["--i" as string]: i }}
                >
                  <p className="kicker !text-[0.75rem]">{s.label}</p>
                  <figcaption className="mt-2">
                    <span className="block font-serif text-[1.3rem] text-cream">{s.name}</span>
                    <span className="kicker-muted !text-[0.75rem]">{s.meta}</span>
                  </figcaption>
                  <blockquote className="mt-4 text-[1.02rem] leading-relaxed text-body italic">«{s.quote}»</blockquote>
                </figure>
              ))}
            </div>
            <p className="mt-6 text-center font-sans text-[0.75rem] tracking-[0.12em] text-muted">{c.stories.note}</p>
          </div>
        </section>

        <Sep />

        {/* ---------- ELENA BOSI ---------- */}
        <section className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto grid max-w-[880px] gap-10 sm:grid-cols-[200px_1fr] sm:gap-12">
            <div className="reveal mx-auto w-[200px]">
              <div className="relative aspect-[578/1068] max-h-[340px] w-full overflow-hidden border border-[var(--gold-border)]">
                <Image
                  src="/img/elena-bosi.webp"
                  alt="Elena Bosi, fondatrice di PRIMEXIA METHOD"
                  fill
                  sizes="200px"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div className="reveal">
              <p className="kicker">Chi ha creato PRIMEXIA™</p>
              <h2 className="mt-3 text-[2.1rem] text-cream">Elena Bosi</h2>
              <p className="kicker-muted mt-2 leading-loose">
                CPC — Psychosomatic Nutrition Counselor
                <br />
                Lifespan Nutrition Specialist
                <br />
                Lifespan Nutrition – Longevity Hub · Verona
              </p>
              {c.bio.paragraphs.map((p) => (
                <p key={p} className="mt-5 text-[1.08rem] text-body">
                  {p}
                </p>
              ))}
              <p className="mt-5 text-[1.08rem] text-body">
                Il metodo è un marchio registrato e viene seguito con supervisione medica per gli aspetti di competenza.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-[880px]">
            <p className="kicker reveal text-center">Pubblicazioni</p>
            {/* Il Nutrimento Eterno in evidenza, con il commento del Prof. Ricordi */}
            <figure className="reveal mx-auto mt-8 grid max-w-[640px] items-center gap-8 sm:grid-cols-[200px_1fr]">
              <div className="relative mx-auto aspect-[2/3] w-[170px] shadow-[0_28px_60px_-20px_rgb(0_0_0_/_0.9)] sm:w-[200px]">
                <Image src={BOOKS[0].src} alt={`Copertina del libro ${BOOKS[0].title}`} fill sizes="200px" className="object-cover" />
              </div>
              <div className="text-center sm:text-left">
                <p className="font-serif text-[1.7rem] leading-tight text-gold-lt">{BOOKS[0].title}</p>
                <p className="mt-1 text-[1rem] text-muted italic">Dal fuoco primordiale alla longevità</p>
                <blockquote className="mt-6 border-l-0 sm:border-l sm:border-[var(--gold-border)] sm:pl-5">
                  <p className="font-serif text-[1.25rem] leading-relaxed text-cream italic">
                    «Questo libro non offre scorciatoie, né illusioni. Offre qualcosa di più raro: una riconnessione.»
                  </p>
                  <footer className="kicker-muted mt-3">Prof. Camillo Ricordi · Prefazione</footer>
                </blockquote>
              </div>
            </figure>
            <ul className="mx-auto mt-12 grid max-w-[360px] grid-cols-2 gap-6">
              {BOOKS.slice(1).map((b, i) => (
                <li key={b.title} className="reveal text-center" style={{ ["--i" as string]: i }}>
                  <div className="relative mx-auto aspect-[2/3] w-full max-w-[110px] shadow-[0_18px_36px_-16px_rgb(0_0_0_/_0.8)]">
                    <Image src={b.src} alt={`Copertina del libro ${b.title}`} fill sizes="110px" className="object-cover" />
                  </div>
                  <p className="mt-3 font-serif text-[0.98rem] leading-tight text-cream">{b.title}</p>
                  <p className="mt-1 text-[0.85rem] text-muted italic">{b.sub}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- QUESTIONARIO ---------- */}
        <section id="questionario" className="scroll-mt-4 border-y border-[var(--rule)] bg-bg-raise px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-[620px]">
            <div className="reveal mb-10 text-center">
              <p className="kicker">{c.form.label}</p>
              <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.4rem)] leading-tight">{c.form.title}</h2>
              <p className="mt-2 text-body italic">{c.form.subtitle}</p>
            </div>
            <Questionnaire content={c} />
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-[680px]">
            <SectionHead label="Domande frequenti" title="Prima di iniziare" />
            <div className="mt-10 border-t border-[var(--rule)]">
              {c.faq.map((f) => (
                <details key={f.q} className="group border-b border-[var(--rule)] py-3">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-6 py-2 font-serif text-[1.25rem] text-cream [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      className="shrink-0 font-sans text-lg text-gold transition-transform duration-200 ease-out group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-2 pb-2 text-[1.05rem] text-body">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <Sep />

        {/* ---------- CHIUSURA ---------- */}
        <section className="px-4 py-20 text-center sm:px-6 sm:py-24">
          <div className="reveal mx-auto max-w-[600px]">
            <Flower size={40} className="mx-auto text-gold" />
            <p className="mt-8 font-serif text-[clamp(1.5rem,3.4vw,2.1rem)] leading-snug text-gold-lt italic">
              {c.closing.statement}
            </p>
            <a href="#questionario" className="btn-gold mt-10">
              {c.closing.cta}
              <small>{c.closing.ctaSub}</small>
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
      <StickyCta label={c.hero.cta} />
    </div>
  );
}
