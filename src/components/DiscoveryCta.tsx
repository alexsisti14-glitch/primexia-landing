"use client";

import { track } from "@/lib/pixel";
import type { Variant } from "@/content/types";

export default function DiscoveryCta({ href, variant }: { href: string; variant: Variant }) {
  // Link di pagamento Stripe ufficiale: client_reference_id per sapere da quale landing arriva
  const url = new URL(href);
  url.searchParams.set("client_reference_id", `guida_${variant}`);

  return (
    <a
      href={url.toString()}
      onClick={() => track("InitiateCheckout", { content_name: "PRIMEXIA Discovery", value: 47, currency: "EUR" })}
      className="btn-gold mt-6"
    >
      Acquista PRIMEXIA™ Discovery
      <small>Pagamento sicuro · Stripe</small>
    </a>
  );
}
