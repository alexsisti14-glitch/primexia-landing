"use client";

import { ArrowRight } from "lucide-react";
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
      onClick={() =>
        track("InitiateCheckout", { content_name: "PRIMEXIA Discovery", value: 47, currency: "EUR" })
      }
      className="btn-primary mt-8 w-full"
    >
      Inizia con Discovery <ArrowRight size={18} aria-hidden />
    </a>
  );
}
