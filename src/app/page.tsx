import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import { MoleculeArt } from "@/components/Decor";

export default function Home() {
  return (
    <div data-variant="uomo" className="flex min-h-dvh flex-col bg-bg">
      <main className="grain relative isolate flex flex-1 items-center overflow-hidden bg-primary px-4 py-20 text-on-primary sm:px-6">
        <MoleculeArt className="pointer-events-none absolute -right-40 -bottom-40 -z-10 w-[700px] text-accent opacity-30" />
        <div className="mx-auto w-full max-w-4xl text-center">
          <p className="font-serif text-2xl tracking-[0.24em]">
            PRIMEXIA<span className="text-accent">™</span> Method
          </p>
          <h1 className="mt-6 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.06] font-medium">
            Scegli la guida gratuita pensata per te
          </h1>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <Link href="/donna" data-variant="donna" className="group flex items-center justify-between rounded-3xl bg-primary-2 p-7 text-left ring-1 ring-white/15 transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98]">
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.22em] text-accent">Guida</span>
                <span className="mt-1 block font-serif text-3xl">Donna</span>
              </span>
              <ArrowRight className="text-accent transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link href="/uomo" className="group flex items-center justify-between rounded-3xl bg-primary-2 p-7 text-left ring-1 ring-white/15 transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98]">
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.22em] text-accent">Guida</span>
                <span className="mt-1 block font-serif text-3xl">Uomo</span>
              </span>
              <ArrowRight className="text-accent transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
