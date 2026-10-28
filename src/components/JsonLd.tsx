import { ORG, SITE_URL } from "@/lib/site";
import type { LandingContent } from "@/content/types";

function Script({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const orgId = `${SITE_URL}/#organization`;
const personId = `${SITE_URL}/#elena-bosi`;
const brandId = `${SITE_URL}/#primexia-method`;

/** Entità comuni: studio, fondatrice, metodo, libro. */
export function baseGraph() {
  return [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": orgId,
      name: ORG.name,
      url: SITE_URL,
      logo: `${SITE_URL}/apple-icon.png`,
      image: `${SITE_URL}/og/og-default.jpg`,
      email: ORG.email,
      telephone: ORG.telephone,
      vatID: `IT${ORG.vat}`,
      founder: { "@id": personId },
      address: {
        "@type": "PostalAddress",
        streetAddress: ORG.street,
        postalCode: ORG.postalCode,
        addressLocality: ORG.city,
        addressRegion: ORG.region,
        addressCountry: ORG.country,
      },
      areaServed: [
        { "@type": "Country", name: "Italia" },
        { "@type": "AdministrativeArea", name: "Canton Ticino" },
      ],
      sameAs: ORG.sameAs,
      brand: { "@id": brandId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: "Elena Bosi",
      jobTitle: "Psychosomatic Nutrition Counselor · Lifespan Nutrition Specialist",
      description:
        "Fondatrice di PRIMEXIA™ METHOD e di Lifespan Nutrition – Longevity Hub a Verona. Oltre 10 anni di esperienza in nutrizione, metabolismo e longevità.",
      worksFor: { "@id": orgId },
      image: `${SITE_URL}/img/elena-bosi.webp`,
      sameAs: ["https://www.linkedin.com/in/elena-bosi-b798421a3/", "https://www.instagram.com/studioinlifespan_nutrition/"],
      knowsAbout: [
        "Nutrizione molecolare di precisione",
        "Composizione corporea",
        "Regolazione metabolica",
        "Nutrizione psicosomatica",
        "Longevità",
      ],
    },
    {
      "@type": "Brand",
      "@id": brandId,
      name: "PRIMEXIA™ METHOD",
      alternateName: ["PRIMEXIA Method", "PRIMEXIA"],
      description:
        "Metodo proprietario di nutrizione molecolare di precisione in tre fasi (RESET, IGNITE, ANCHOR), con versioni dedicate per donna e per uomo. Marchio registrato EUIPO n. 302026000062725.",
      logo: `${SITE_URL}/apple-icon.png`,
    },
    {
      "@type": "Book",
      name: "Il Nutrimento Eterno",
      alternativeHeadline: "Dal fuoco primordiale alla longevità",
      author: { "@id": personId },
      inLanguage: "it",
      image: `${SITE_URL}/img/libro-nutrimento-eterno.webp`,
      contributor: { "@type": "Person", name: "Camillo Ricordi", roleName: "Prefazione" },
    },
  ];
}

export function HomeJsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: "PRIMEXIA™ METHOD",
            inLanguage: "it-IT",
            publisher: { "@id": orgId },
          },
          ...baseGraph(),
        ],
      }}
    />
  );
}

export function LandingJsonLd({ c, path, title, description }: { c: LandingContent; path: string; title: string; description: string }) {
  const url = `${SITE_URL}${path}`;
  const who = c.variant === "donna" ? "Donna" : "Uomo";
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${url}#webpage`,
            url,
            name: title,
            description,
            inLanguage: "it-IT",
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: { "@id": brandId },
            author: { "@id": personId },
            primaryImageOfPage: `${SITE_URL}/og/og-${c.variant}.jpg`,
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "PRIMEXIA™ METHOD", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: `Guida gratuita ${who}`, item: url },
              ],
            },
          },
          {
            "@type": "Service",
            name: `PRIMEXIA™ METHOD ${who}`,
            serviceType: "Percorso di nutrizione molecolare di precisione",
            provider: { "@id": orgId },
            brand: { "@id": brandId },
            areaServed: ["Italia", "Canton Ticino"],
            audience: { "@type": "PeopleAudience", audienceType: c.variant === "donna" ? "Donne adulte" : "Uomini adulti" },
            description: `Percorso di tre mesi in tre fasi (RESET, IGNITE, ANCHOR) con check metabolico, cinque consulenze con Elena Bosi e supervisione medica per gli aspetti di competenza. ${c.method.intro}`,
          },
          {
            "@type": "DigitalDocument",
            name: `Guida gratuita PRIMEXIA™ METHOD ${who}`,
            encodingFormat: "application/pdf",
            inLanguage: "it",
            author: { "@id": personId },
            isAccessibleForFree: true,
            hasPart: c.guide.items.map((g) => ({ "@type": "CreativeWork", name: g.title, abstract: g.body })),
          },
          {
            "@type": "FAQPage",
            mainEntity: c.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          ...baseGraph(),
        ],
      }}
    />
  );
}
