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
      {sub && <p className="kicker mt-2 !tracking-[0.5em] text-gold/80">{sub}</p>}
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
    <figure className="mx-auto w-[min(48vw,240px)] shrink-0">
      <div
        className="float-book relative aspect-[3/4.1] border border-[var(--gold-border)] px-3 py-5 text-center sm:px-5 sm:py-7 shadow-[0_40px_80px_-24px_rgb(0_0_0_/_0.8),0_0_80px_-20px_rgb(201_169_110_/_0.18)]"
        style={{ background: "linear-gradient(160deg, #2a1b0e 0%, #1c1109 55%, #120b05 100%)" }}
        role="img"
        aria-label={`Copertina della guida gratuita PRIMEXIA METHOD ${label}`}
      >
        <span className="absolute inset-y-0 left-0 w-[6px] bg-gradient-to-r from-[#3a2512] to-transparent" aria-hidden="true" />
        <p className="font-sans text-[0.46rem] tracking-[0.3em] text-gold/80 uppercase">Studio in Lifespan Nutrition</p>
        <Flower size={30} className="mx-auto mt-4 text-gold sm:mt-6" />
        <p className="brand mt-3 text-[1.1rem] sm:mt-5 sm:text-[1.35rem]">PRIMEXIA<span className="text-[0.5em] tracking-normal">™</span></p>
        <p className="mt-0.5 font-serif text-[0.85rem] tracking-[0.18em] text-gold-lt">Method · {label}</p>
        <div className="rule-gold mx-auto my-3 sm:my-4" />
        <p className="font-serif text-[0.74rem] leading-snug text-body italic sm:text-[0.82rem]">{claim}</p>
        <p className="absolute inset-x-0 bottom-4 font-sans sm:bottom-6 text-[0.44rem] tracking-[0.22em] text-gold/70 uppercase">
          Elena Bosi · Guida gratuita
        </p>
      </div>
      <figcaption className="mx-auto mt-4 w-fit bg-gold/90 px-3 py-1.5 font-sans text-[0.5rem] tracking-[0.16em] whitespace-nowrap text-bg uppercase sm:px-4 sm:text-[0.56rem] sm:tracking-[0.22em]">
        PDF gratuito · via email
      </figcaption>
    </figure>
  );
}
