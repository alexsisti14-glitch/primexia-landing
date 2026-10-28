import type { Metadata } from "next";
import Landing from "@/components/Landing";
import { LandingJsonLd } from "@/components/JsonLd";
import { donna } from "@/content/donna";

const title = "Guida gratuita PRIMEXIA™ METHOD Donna · Elena Bosi";
const description = donna.metaDescription;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/donna" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "/donna",
    title,
    description,
    images: [{ url: "/og/og-donna.jpg", width: 1200, height: 630, alt: "PRIMEXIA™ METHOD Donna" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og/og-donna.jpg"] },
};

export default function Page() {
  return (
    <>
      <LandingJsonLd c={donna} path="/donna" title={title} description={description} />
      <Landing content={donna} />
    </>
  );
}
