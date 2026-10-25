import type { Variant } from "@/content/types";

/** Abstract molecular orbit art used behind the hero. Decorative only. */
export function MoleculeArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 600" fill="none" aria-hidden="true" className={className}>
      <g stroke="currentColor" strokeWidth="1">
        <circle cx="300" cy="300" r="120" opacity="0.35" />
        <circle cx="300" cy="300" r="190" opacity="0.22" />
        <circle cx="300" cy="300" r="270" opacity="0.12" />
        <ellipse cx="300" cy="300" rx="270" ry="96" opacity="0.18" transform="rotate(-28 300 300)" />
        <ellipse cx="300" cy="300" rx="270" ry="96" opacity="0.14" transform="rotate(32 300 300)" />
        <path d="M180 300 L300 180 L420 300 L300 420 Z" opacity="0.2" />
      </g>
      <g fill="currentColor">
        <circle cx="300" cy="180" r="5" opacity="0.8" />
        <circle cx="420" cy="300" r="4" opacity="0.6" />
        <circle cx="300" cy="420" r="5" opacity="0.7" />
        <circle cx="180" cy="300" r="4" opacity="0.6" />
        <circle cx="490" cy="186" r="3" opacity="0.5" />
        <circle cx="112" cy="412" r="3" opacity="0.5" />
        <circle cx="300" cy="300" r="8" opacity="0.9" />
      </g>
    </svg>
  );
}

/** CSS-only mockup of the free PDF guide cover (mirrors the real guide). */
export function GuideMockup({ variant }: { variant: Variant }) {
  const label = variant === "uomo" ? "Uomo" : "Donna";
  const claim =
    variant === "uomo"
      ? "Il tuo corpo ha una propria architettura biologica."
      : "Ogni donna ha una propria architettura biologica.";
  return (
    <div className="relative mx-auto w-[min(78vw,300px)] [perspective:1200px]">
      <div
        className="absolute -inset-6 rounded-[40px] blur-2xl"
        style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
        aria-hidden="true"
      />
      <div
        className="relative aspect-[3/4] overflow-hidden rounded-[6px_18px_18px_6px] border border-white/10 p-6 text-on-primary shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] [transform:rotateY(-14deg)_rotateX(4deg)] sm:p-7"
        style={{ background: "linear-gradient(160deg, var(--primary-2), var(--primary) 70%)" }}
        role="img"
        aria-label={`Copertina della guida gratuita PRIMEXIA METHOD ${label}`}
      >
        <div className="absolute inset-y-0 left-0 w-3 rounded-l-[6px] bg-black/25" aria-hidden="true" />
        <MoleculeArt className="absolute -right-16 -bottom-16 w-56 text-accent opacity-60" />
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-accent">Guida gratuita</p>
        <p className="mt-6 font-serif text-[1.9rem] leading-none tracking-[0.18em]">PRIMEXIA</p>
        <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-accent">
          Method™ · {label}
        </p>
        <div className="my-5 h-px w-10 bg-accent/70" />
        <p className="font-serif text-lg italic leading-snug text-on-primary-soft">{claim}</p>
        <p className="absolute bottom-6 left-6 text-[0.6rem] uppercase tracking-[0.2em] text-on-primary-soft sm:left-7">
          Elena Bosi · Verona
        </p>
      </div>
    </div>
  );
}
