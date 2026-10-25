"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

const VIDEO_ID = "315pjbcZnGU";

/** Video di presentazione di Elena (YouTube, caricato solo al click: niente cookie YouTube prima del consenso). */
export default function VideoElena() {
  const [play, setPlay] = useState(false);
  return (
    <figure className="mx-auto w-[min(36vw,200px)] shrink-0">
      <div className="relative aspect-[9/16] overflow-hidden border border-[var(--rule)] border-t-gold bg-black">
        {play ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&playsinline=1`}
            title="Elena Bosi presenta PRIMEXIA METHOD™"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlay(true)}
            className="group absolute inset-0 cursor-pointer"
            aria-label="Guarda il video di Elena Bosi"
          >
            <Image src="/img/video-elena.webp" alt="" fill sizes="200px" className="object-cover" />
            <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-bg shadow-lg transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-95">
              <Play size={20} fill="currentColor" className="ml-0.5" aria-hidden />
            </span>
          </button>
        )}
      </div>
      <figcaption className="kicker-muted mt-3 text-center">Guarda il video</figcaption>
    </figure>
  );
}
