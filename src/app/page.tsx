import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { Flower } from "@/components/Decor";
import { HomeJsonLd } from "@/components/JsonLd";

const CARDS = [
  { href: "/donna", kicker: "Guida gratuita · Donna", title: "PRIMEXIA™ Method Donna", body: "Ogni donna ha una propria architettura biologica." },
  { href: "/uomo", kicker: "Guida gratuita · Uomo", title: "PRIMEXIA™ Method Uomo", body: "Il tuo corpo ha una propria architettura biologica." },
];

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <HomeJsonLd />
      <main className="flex-1 px-4 py-14 text-center sm:px-6 sm:py-20">
        <p className="kicker">Lifespan Nutrition – Longevity Hub</p>
        <h1>
          <span className="brand mt-6 block text-[clamp(2.6rem,9vw,5rem)] leading-none">
            PRIMEXIA<span className="text-[0.4em] tracking-normal align-super">™</span>
          </span>
          <span className="kicker mt-3 block !tracking-[0.5em] text-gold">Method</span>
          <span className="sr-only"> · Nutrizione molecolare di precisione di Elena Bosi, Verona</span>
        </h1>
        <Flower size={44} className="mx-auto mt-8 text-gold" />
        <p className="mx-auto mt-8 max-w-[30ch] text-[1.2rem] text-body italic">
          Architettura di regolazione metabolica e trasformazione della forma corporea.
        </p>
        <p className="mx-auto mt-5 max-w-[56ch] text-[1.02rem] text-body">
          PRIMEXIA™ METHOD è il metodo proprietario di nutrizione molecolare di precisione ideato da Elena Bosi, fondatrice di
          Lifespan Nutrition – Longevity Hub a Verona. Tre fasi, RESET, IGNITE e ANCHOR, costruite sulla biologia della donna e
          dell&apos;uomo. Scegli la guida gratuita adatta a te.
        </p>
        <div className="mx-auto mt-10 max-w-[520px] border border-[var(--gold-border)]">
          {CARDS.map((c, i) => (
            <Link
              key={c.href}
              href={c.href}
              className={`block px-7 py-7 text-left transition-colors duration-200 hover:bg-card-2 ${i ? "border-t border-[var(--gold-border)]" : "bg-card"}`}
            >
              <span className="kicker !text-[0.75rem]">{c.kicker}</span>
              <span className="mt-2 block font-serif text-[1.6rem] tracking-[0.06em] text-gold-lt">{c.title}</span>
              <span className="mt-1 block text-body italic">{c.body}</span>
              <span className="btn-line !mt-1 !min-h-0 !px-0 !text-gold">Scopri →</span>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
