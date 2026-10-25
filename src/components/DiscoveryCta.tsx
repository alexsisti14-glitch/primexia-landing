"use client";

import { track } from "@/lib/pixel";
import type { Variant } from "@/content/types";

export default function DiscoveryCta({ href, variant }: { href: string; variant: Variant }) {
  const url = new URL(href);
  url.searchParams.set("utm_source", "primexia_landing");
  url.searchParams.set("utm_medium", "thankyou");
  url.searchParams.set("utm_campaign", `guida_${variant}`);

  return (
    <a
      href={url.toString()}
      onClick={() => track("InitiateCheckout", { content_name: "PRIMEXIA Discovery", value: 47, currency: "EUR" })}
      className="btn-gold mt-6"
    >
      Scopri PRIMEXIA™ Discovery
      <small>Accesso immediato</small>
    </a>
  );
}
