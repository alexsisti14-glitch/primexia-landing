import type { Metadata } from "next";
import Landing from "@/components/Landing";
import { donna } from "@/content/donna";

export const metadata: Metadata = {
  title: donna.metaTitle,
  description: donna.metaDescription,
  openGraph: { title: donna.metaTitle, description: donna.metaDescription, locale: "it_IT", type: "website" },
};

export default function Page() {
  return <Landing content={donna} />;
}
