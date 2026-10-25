import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://primexia-landing-sviluppo-alex.vercel.app"),
  title: "PRIMEXIA™ Method · Elena Bosi",
  description:
    "Nutrizione molecolare di precisione. Scarica la guida gratuita PRIMEXIA METHOD™ di Elena Bosi, Studio in Lifespan Nutrition, Verona.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1c1109",
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
