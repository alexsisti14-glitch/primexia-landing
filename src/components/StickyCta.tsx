"use client";

import { useEffect, useState } from "react";

/**
 * CTA fissa in basso su mobile: compare dopo il bottone dell'hero
 * e sparisce quando il questionario è visibile.
 */
export default function StickyCta({ label }: { label: string }) {
  const [heroGone, setHeroGone] = useState(false);
  const [formIn, setFormIn] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const form = document.getElementById("questionario");
    if (!hero || !form || !("IntersectionObserver" in window)) return;
    const ioHero = new IntersectionObserver(([e]) => setHeroGone(!e.isIntersecting && e.boundingClientRect.top < 0));
    const ioForm = new IntersectionObserver(([e]) => setFormIn(e.isIntersecting), { rootMargin: "0px 0px -20% 0px" });
    ioHero.observe(hero);
    ioForm.observe(form);
    return () => {
      ioHero.disconnect();
      ioForm.disconnect();
    };
  }, []);

  const show = heroGone && !formIn;

  return (
    <div
      className={`safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-[var(--gold-border)] bg-bg-deep/95 px-4 pt-3 backdrop-blur transition-[transform,opacity] duration-300 ease-out sm:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
      aria-hidden={!show}
    >
      <a href="#questionario" className="btn-gold w-full !min-h-[52px] !py-3" tabIndex={show ? 0 : -1}>
        {label}
      </a>
    </div>
  );
}
