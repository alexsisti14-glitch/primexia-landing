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
      className="step-in fixed inset-x-3 bottom-3 z-40 mx-auto max-w-xl rounded-2xl border border-black/10 bg-white p-5 text-[0.9rem] text-neutral-800 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] sm:inset-x-auto sm:right-5 sm:bottom-5"
    >
      <p>
        Usiamo cookie tecnici e, con il tuo consenso, il pixel di Meta per misurare le campagne pubblicitarie.{" "}
        <Link href="/privacy#cookie" className="font-semibold underline underline-offset-2">
          Dettagli
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={() => choose(false)}
          className="min-h-11 cursor-pointer rounded-full px-4 font-semibold text-neutral-600 transition-colors hover:bg-neutral-100 active:scale-[0.97]"
        >
          Solo necessari
        </button>
        <button
          type="button"
          onClick={() => choose(true)}
          className="min-h-11 cursor-pointer rounded-full bg-neutral-900 px-5 font-semibold text-white transition-transform active:scale-[0.97]"
        >
          Accetta
        </button>
      </div>
    </div>
  );
}
