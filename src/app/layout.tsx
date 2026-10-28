import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import { SITE_URL } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "492276469982334";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PRIMEXIA™ METHOD · Nutrizione molecolare di precisione · Elena Bosi",
    template: "%s | PRIMEXIA™ METHOD",
  },
  description:
    "PRIMEXIA™ METHOD è il metodo di nutrizione molecolare di precisione di Elena Bosi, Lifespan Nutrition – Longevity Hub, Verona. Tre fasi RESET, IGNITE, ANCHOR. Guida gratuita per donna e per uomo.",
  applicationName: "PRIMEXIA™ METHOD",
  authors: [{ name: "Elena Bosi", url: "https://www.lifespannutrition.it" }],
  creator: "Elena Bosi",
  publisher: "Lifespan Nutrition – Longevity Hub",
  keywords: [
    "PRIMEXIA",
    "PRIMEXIA Method",
    "nutrizione molecolare di precisione",
    "Elena Bosi",
    "nutrizionista Verona",
    "metabolismo dopo i 40",
    "menopausa alimentazione",
    "grasso addominale",
    "composizione corporea",
    "Lifespan Nutrition",
    "longevità",
  ],
  category: "health",
  alternates: { canonical: "/", languages: { "it-IT": "/" } },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "PRIMEXIA™ METHOD",
    url: "/",
    images: [{ url: "/og/og-default.jpg", width: 1200, height: 630, alt: "PRIMEXIA™ METHOD · Elena Bosi" }],
  },
  twitter: { card: "summary_large_image", images: ["/og/og-default.jpg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: false, email: false, address: false },
  other: { "geo.region": "IT-VR", "geo.placename": "Verona", "geo.position": "45.4384;10.9916", ICBM: "45.4384, 10.9916" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0e0805",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body>
        {children}
        <CookieBanner />
        <Script id="fb-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');var c=null;try{c=localStorage.getItem('pmx_consent')}catch(e){}if(c!=='granted'){fbq('consent','revoke')}fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      </body>
    </html>
  );
}
