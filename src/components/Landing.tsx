import { ArrowDown, BookOpen, Check, Quote, ShieldCheck } from "lucide-react";
import type { LandingContent } from "@/content/types";
import Questionnaire from "./Questionnaire";
import Reveal from "./Reveal";
import SiteFooter from "./SiteFooter";
import { GuideMockup, MoleculeArt } from "./Decor";

export default function Landing({ content: c }: { content: LandingContent }) {
  const [featured, ...others] = c.testimonials.items;

  return (
    <div data-variant={c.variant} className="min-h-dvh bg-bg text-fg">
      <Reveal />
      <a
        href="#questionario"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-card focus:px-4 focus:py-2"
      >
        Vai al questionario
      </a>

      {/* ---------------- HERO ---------------- */}
      <header
        className="grain relative isolate overflow-hidden text-on-primary"
        style={{ background: "linear-gradient(165deg, var(--primary) 0%, var(--primary-2) 58%, var(--primary) 100%)" }}
      >
        <MoleculeArt className="pointer-events-none absolute -top-40 -right-48 -z-10 w-[760px] text-accent opacity-40 sm:-right-24" />
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-6 sm:px-6">
          <p className="font-serif text-xl tracking-[0.22em]">
            PRIMEXIA<span className="text-accent">™</span>
          </p>
          <p className="hidden text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-on-primary-soft sm:block">
            Studio in Lifespan Nutrition · Verona
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:pt-20 lg:pb-28">
          <div>
            <p className="hero-in text-[0.72rem] font-bold uppercase tracking-[0.26em] text-accent" style={{ ["--i" as string]: 0 }}>
              {c.hero.eyebrow}
            </p>
            <h1
              className="hero-in mt-5 text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.04] font-medium"
              style={{ ["--i" as string]: 1 }}
            >
              {c.hero.title}
            </h1>
            <p
              className="hero-in mt-6 max-w-[58ch] text-[1.05rem] leading-relaxed text-on-primary-soft sm:text-lg"
              style={{ ["--i" as string]: 2 }}
            >
              {c.hero.subtitle}
            </p>
            <div className="hero-in mt-9 flex flex-col items-start gap-3" style={{ ["--i" as string]: 3 }}>
              <a href="#questionario" className="btn-primary">
                {c.hero.cta} <ArrowDown size={18} aria-hidden />
              </a>
              <p className="text-xs tracking-wide text-on-primary-soft">{c.hero.ctaNote}</p>
            </div>
            <ul
              className="hero-in mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/15 pt-6 text-[0.8rem] text-on-primary-soft"
              style={{ ["--i" as string]: 4 }}
            >
              {c.hero.trust.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-accent" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-in" style={{ ["--i" as string]: 3 }}>
            <GuideMockup variant={c.variant} />
          </div>
        </div>
      </header>

      <main>
        {/* ---------------- PAIN ---------------- */}
        <section className="px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="reveal lg:sticky lg:top-16 lg:self-start">
              <p className="eyebrow">{c.pain.eyebrow}</p>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-[1.08] font-medium">{c.pain.title}</h2>
            </div>
            <div>
              <ol className="divide-y divide-border border-y border-border">
                {c.pain.items.map((p, i) => (
                  <li key={p.title} className="reveal flex gap-5 py-6 sm:gap-8 sm:py-8" style={{ ["--i" as string]: i }}>
                    <span className="font-serif text-3xl leading-none text-accent-ink tabular-nums sm:text-4xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-sans text-lg font-bold tracking-normal">{p.title}</h3>
                      <p className="mt-1.5 text-fg-muted">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="reveal mt-10 font-serif text-2xl leading-snug italic sm:text-[1.7rem]">{c.pain.closing}</p>
            </div>
          </div>
        </section>

        {/* ---------------- EMPATHY (donna) ---------------- */}
        {c.empathy && (
          <section className="grain bg-bg-alt px-4 py-20 sm:px-6 sm:py-24">
            <div className="reveal mx-auto max-w-3xl text-center">
              <p className="eyebrow">{c.empathy.eyebrow}</p>
              <h2 className="mt-4 text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.05] font-medium">{c.empathy.title}</h2>
              {c.empathy.body.map((b) => (
                <p key={b} className="mx-auto mt-5 max-w-[62ch] text-lg leading-relaxed text-fg-muted">
                  {b}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* ---------------- METHOD ---------------- */}
        <section className="relative overflow-hidden bg-primary px-4 py-20 text-on-primary sm:px-6 sm:py-28">
          <MoleculeArt className="pointer-events-none absolute -bottom-56 -left-56 w-[700px] text-accent opacity-25" />
          <div className="relative mx-auto max-w-6xl">
            <div className="reveal max-w-3xl">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-accent">{c.method.eyebrow}</p>
              <h2 className="mt-4 text-[clamp(2rem,4.4vw,3.3rem)] leading-[1.06] font-medium">{c.method.title}</h2>
              <p className="mt-6 max-w-[64ch] text-lg leading-relaxed text-on-primary-soft">{c.method.intro}</p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-[0.8fr_2fr]">
              <div className="reveal rounded-3xl border border-white/15 bg-white/[0.04] p-7">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">Si parte da qui</p>
                <h3 className="mt-3 text-2xl font-semibold">{c.method.start.title}</h3>
                <p className="mt-3 text-on-primary-soft">{c.method.start.body}</p>
              </div>
              <ol className="relative grid gap-6 md:grid-cols-3">
                <div
                  className="absolute top-[30px] right-8 left-8 hidden h-px md:block"
                  style={{ background: "linear-gradient(90deg, var(--phase-1), var(--phase-2), var(--phase-3))" }}
                  aria-hidden="true"
                />
                {c.method.phases.map((p, i) => (
                  <li key={p.name} className="reveal relative" style={{ ["--i" as string]: i + 1 }}>
                    <span
                      className="relative grid size-[60px] place-items-center rounded-full border-2 bg-primary font-serif text-xl font-semibold"
                      style={{ borderColor: `var(--phase-${i + 1})`, color: `var(--phase-${i + 1})` }}
                    >
                      {i + 1}
                    </span>
                    <p className="mt-5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-on-primary-soft">{p.label}</p>
                    <h3 className="mt-1 font-serif text-3xl tracking-[0.12em]">{p.name}</h3>
                    <p className="mt-3 text-on-primary-soft">{p.body}</p>
                  </li>
                ))}
              </ol>
            </div>

            <p className="reveal mt-14 max-w-3xl border-l-2 border-accent pl-6 font-serif text-xl leading-relaxed italic text-on-primary sm:text-2xl">
              {c.method.highlight}
            </p>
          </div>
        </section>

        {/* ---------------- GUIDE ---------------- */}
        <section className="px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
            <div className="reveal order-2 lg:order-1">
              <GuideMockup variant={c.variant} />
            </div>
            <div className="reveal order-1 lg:order-2">
              <p className="eyebrow flex items-center gap-2">
                <BookOpen size={15} aria-hidden /> {c.guide.eyebrow}
              </p>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-[1.08] font-medium">{c.guide.title}</h2>
              <ul className="mt-8 space-y-4">
                {c.guide.items.map((it) => (
                  <li key={it} className="flex gap-4">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent text-on-accent">
                      <Check size={15} strokeWidth={3} aria-hidden />
                    </span>
                    <span className="text-[1.05rem]">{it}</span>
                  </li>
                ))}
              </ul>
              <a href="#questionario" className="btn-primary mt-10">
                {c.guide.cta} <ArrowDown size={18} aria-hidden />
              </a>
            </div>
          </div>
        </section>

        {/* ---------------- TESTIMONIALS ---------------- */}
        <section className="bg-bg-alt px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="reveal max-w-2xl">
              <p className="eyebrow">{c.testimonials.eyebrow}</p>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-[1.08] font-medium">{c.testimonials.title}</h2>
            </div>

            <figure className="reveal mt-12 rounded-[28px] bg-primary p-8 text-on-primary sm:p-12">
              <Quote size={36} className="text-accent" aria-hidden />
              <blockquote className="mt-5 font-serif text-[clamp(1.4rem,2.6vw,2rem)] leading-snug">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-bold">{featured.name}</span>
                <span className="text-on-primary-soft"> · {featured.meta}</span>
              </figcaption>
            </figure>

            <div className="mt-6 columns-1 gap-6 md:columns-2">
              {others.map((t, i) => (
                <figure
                  key={t.name}
                  className="reveal mb-6 break-inside-avoid rounded-3xl border border-border bg-card p-7"
                  style={{ ["--i" as string]: i }}
                >
                  <blockquote className="text-[1.05rem] leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="font-bold">{t.name}</span>
                    <span className="text-fg-muted"> · {t.meta}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-2 text-xs text-fg-muted">{c.testimonials.note}</p>
          </div>
        </section>

        {/* ---------------- FOUNDER ---------------- */}
        <section className="px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div className="reveal">
              <div
                className="grain relative mx-auto grid aspect-[4/5] w-full max-w-[320px] place-items-center overflow-hidden rounded-[28px] text-on-primary"
                style={{ background: "linear-gradient(160deg, var(--primary-2), var(--primary))" }}
              >
                <MoleculeArt className="absolute inset-0 m-auto w-[130%] text-accent opacity-30" />
                <div className="relative text-center">
                  <p className="font-serif text-7xl tracking-[0.08em] text-accent">EB</p>
                  <p className="mt-3 text-[0.68rem] font-bold uppercase tracking-[0.26em] text-on-primary-soft">
                    Founder · PRIMEXIA™
                  </p>
                </div>
              </div>
            </div>
            <div className="reveal">
              <p className="eyebrow">{c.founder.eyebrow}</p>
              <h2 className="mt-4 text-[clamp(2.2rem,4.4vw,3.2rem)] leading-none font-medium">{c.founder.name}</h2>
              <p className="mt-3 text-sm font-semibold text-accent-ink">{c.founder.role}</p>
              {c.founder.bio.map((b) => (
                <p key={b} className="mt-5 text-[1.05rem] leading-relaxed text-fg-muted">
                  {b}
                </p>
              ))}
              <p className="mt-6 flex items-start gap-3 rounded-2xl bg-bg-alt p-5 text-[0.95rem]">
                <BookOpen size={20} className="mt-0.5 shrink-0 text-accent-ink" aria-hidden />
                <span>{c.founder.book}</span>
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- FORM ---------------- */}
        <section id="questionario" className="scroll-mt-4 bg-bg-alt px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-2xl">
            <div className="reveal mb-10 text-center">
              <p className="eyebrow">{c.form.eyebrow}</p>
              <h2 className="mt-4 text-[clamp(2rem,4.4vw,3rem)] leading-[1.06] font-medium">{c.form.title}</h2>
              <p className="mt-3 text-fg-muted">{c.form.subtitle}</p>
            </div>
            <Questionnaire content={c} />
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="reveal text-[clamp(2rem,4vw,2.8rem)] font-medium">Domande frequenti</h2>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {c.faq.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      className="grid size-8 shrink-0 place-items-center rounded-full border border-border text-xl leading-none transition-transform duration-200 ease-out group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[64ch] text-fg-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- FINAL CTA ---------------- */}
        <section
          className="grain relative overflow-hidden px-4 py-20 text-center text-on-primary sm:px-6 sm:py-24"
          style={{ background: "linear-gradient(165deg, var(--primary-2), var(--primary))" }}
        >
          <MoleculeArt className="pointer-events-none absolute -top-40 left-1/2 w-[640px] -translate-x-1/2 text-accent opacity-25" />
          <div className="reveal relative mx-auto max-w-3xl">
            <h2 className="text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.08] font-medium">{c.finalCta.title}</h2>
            <a href="#questionario" className="btn-primary mt-10">
              {c.finalCta.cta}
            </a>
            <p className="mt-6 text-sm text-on-primary-soft">
              Con supervisione medica per gli aspetti di competenza.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
