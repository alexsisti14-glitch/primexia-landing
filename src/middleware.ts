import { NextResponse, type NextRequest } from "next/server";

/** In produzione porta tutto sul dominio ufficiale primexia.io (niente contenuti duplicati su *.vercel.app o www). */
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (process.env.VERCEL_ENV === "production" && (host.endsWith(".vercel.app") || host.startsWith("www."))) {
    const url = new URL(req.nextUrl.pathname + req.nextUrl.search, "https://primexia.io");
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!api/|_next/|og/|img/|favicon|icon|apple-icon).*)"] };
