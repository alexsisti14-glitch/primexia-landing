"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Fbq = (...args: unknown[]) => void;
const KEY = "pmx_consent";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let v: string | null = null;
    try {
      v = localStorage.getItem(KEY);
    } catch {}
    if (!v) setOpen(true);
  }, []);

  const choose = (granted: boolean) => {
    try {
      localStorage.setItem(KEY, granted ? "granted" : "denied");
    } catch {}
    const fbq = (window as unknown as { fbq?: Fbq }).fbq;
    // Events queued while consent was revoked are released on grant.
    if (granted && fbq) fbq("consent", "grant");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Preferenze cookie"
      className="step-in fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 mx-auto max-w-lg border border-[var(--gold-border)] bg-bg-deep p-5 text-[1rem] text-body shadow-[0_20px_60px_-10px_rgb(0_0_0_/_0.8)] sm:inset-x-auto sm:right-5 sm:bottom-5"
    >
      <p>
        Usiamo cookie tecnici e, con il tuo consenso, il pixel di Meta per misurare le campagne pubblicitarie.{" "}
        <Link href="/privacy#cookie" className="text-gold-lt underline underline-offset-2">
          Dettagli
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={() => choose(false)}
          className="btn-line"
        >
          Solo necessari
        </button>
        <button
          type="button"
          onClick={() => choose(true)}
          className="btn-gold !min-h-11 !min-w-0 !px-6"
        >
          Accetta
        </button>
      </div>
    </div>
  );
}
