import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PRIMEXIA™ METHOD · Elena Bosi",
    short_name: "PRIMEXIA",
    description: "Nutrizione molecolare di precisione · Lifespan Nutrition – Longevity Hub, Verona",
    start_url: "/",
    display: "standalone",
    background_color: "#0e0805",
    theme_color: "#0e0805",
    lang: "it",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
