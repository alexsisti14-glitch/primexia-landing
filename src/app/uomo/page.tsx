import type { Metadata } from "next";
import Landing from "@/components/Landing";
import { uomo } from "@/content/uomo";

export const metadata: Metadata = {
  title: uomo.metaTitle,
  description: uomo.metaDescription,
  openGraph: { title: uomo.metaTitle, description: uomo.metaDescription, locale: "it_IT", type: "website" },
};

export default function Page() {
  return <Landing content={uomo} />;
}
