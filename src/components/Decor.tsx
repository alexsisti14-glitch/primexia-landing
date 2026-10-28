import type { Variant } from "@/content/types";

/** Fiore della vita: il simbolo usato in tutte le pagine PRIMEXIA. */
export function Flower({ className = "", size = 56 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.1">
        <circle cx="50" cy="50" r="18" />
        <circle cx="50" cy="32" r="18" />
        <circle cx="50" cy="68" r="18" />
        <circle cx="34.4" cy="41" r="18" />
        <circle cx="65.6" cy="41" r="18" />
        <circle cx="34.4" cy="59" r="18" />
        <circle cx="65.6" cy="59" r="18" />
        <circle cx="50" cy="50" r="36" strokeWidth="0.5" opacity="0.3" />
      </g>
    </svg>
  );
}

/** Wordmark PRIMEXIA™ con sottotitolo letter-spaced. */
export function Wordmark({ sub, className = "" }: { sub?: string; className?: string }) {
  return (
    <div className={`text-center ${className}`}>
      <p className="brand text-[clamp(2.6rem,9vw,5.2rem)] leading-[1.1]" style={{ textShadow: "0 0 80px rgb(201 169 110 / 0.08)" }}>
        PRIMEXIA<sup className="ml-1 align-super text-[0.35em] tracking-normal">™</sup>
      </p>
      {sub && <p className="kicker mt-2 !tracking-[0.5em] text-gold">{sub}</p>}
    </div>
  );
}

/** Copertina della guida gratuita, nello stile del PDF Stories. */
export function GuideCover({ variant }: { variant: Variant }) {
  const label = variant === "uomo" ? "Uomo" : "Donna";
  const claim =
    variant === "uomo"
      ? "Il tuo corpo ha una propria architettura biologica."
      : "Ogni donna ha una propria architettura biologica.";
  return (
    <figure className="mx-auto w-[min(64vw,280px)] shrink-0">
      <div
        className="float-book relative aspect-[3/4.1] border border-[var(--gold-border)] px-5 py-7 text-center shadow-[0_40px_80px_-24px_rgb(0_0_0_/_0.8),0_0_80px_-20px_rgb(212_176_106_/_0.25)]"
        style={{ background: "linear-gradient(160deg, #2b1b0d 0%, #140b05 55%, #080402 100%)" }}
        role="img"
        aria-label={`Copertina della guida gratuita PRIMEXIA METHOD ${label}`}
      >
        <span className="absolute inset-y-0 left-0 w-[6px] bg-gradient-to-r from-[#3a2512] to-transparent" aria-hidden="true" />
        <p className="font-sans text-[0.6rem] tracking-[0.2em] text-gold uppercase">Lifespan Nutrition – Longevity Hub</p>
        <Flower size={36} className="mx-auto mt-6 text-gold" />
        <p className="brand mt-5 text-[1.45rem]">PRIMEXIA<span className="text-[0.5em] tracking-normal">™</span></p>
        <p className="mt-0.5 font-serif text-[0.95rem] tracking-[0.18em] text-gold-lt">Method · {label}</p>
        <div className="rule-gold mx-auto my-4" />
        <p className="font-serif text-[0.95rem] leading-snug text-cream italic">{claim}</p>
        <p className="absolute inset-x-0 bottom-6 font-sans text-[0.68rem] tracking-[0.22em] text-gold uppercase">
          Elena Bosi
        </p>
      </div>
      <figcaption className="mx-auto mt-4 w-fit bg-gold px-4 py-2 font-sans text-[0.7rem] tracking-[0.16em] whitespace-nowrap text-bg uppercase sm:px-4 sm:text-[0.72rem] sm:tracking-[0.22em]">
        PDF gratuito · via email
      </figcaption>
    </figure>
  );
}
