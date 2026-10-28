import type { Metadata } from "next";
import Landing from "@/components/Landing";
import { LandingJsonLd } from "@/components/JsonLd";
import { uomo } from "@/content/uomo";

const title = "Guida gratuita PRIMEXIA™ METHOD Uomo · Elena Bosi";
const description = uomo.metaDescription;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/uomo" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "/uomo",
    title,
    description,
    images: [{ url: "/og/og-uomo.jpg", width: 1200, height: 630, alt: "PRIMEXIA™ METHOD Uomo" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og/og-uomo.jpg"] },
};

export default function Page() {
  return (
    <>
      <LandingJsonLd c={uomo} path="/uomo" title={title} description={description} />
      <Landing content={uomo} />
    </>
  );
}
