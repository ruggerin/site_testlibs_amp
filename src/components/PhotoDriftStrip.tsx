"use client";

import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ZoomImage from "@/components/ZoomImage";

export type PhotoDriftItem = { src: string; label: string };

/** Todas as fotos no mesmo tamanho (retrato). */
const CARD_CLASS =
  "shrink-0 w-[clamp(260px,32vw,420px)] aspect-[4/5] overflow-hidden";

const LOOP_DURATION = 85;

type PhotoDriftStripProps = {
  photos: PhotoDriftItem[];
};

/** Uma fileira — loop infinito; clique pausa/retoma. */
export default function PhotoDriftStrip({ photos }: PhotoDriftStripProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [paused, setPaused] = useState(false);

  const loopItems = [...photos, ...photos];

  useGSAP(
    () => {
      const track = rootRef.current?.querySelector<HTMLElement>(".photo-drift-track");
      if (!track) return;

      tweenRef.current = gsap.to(track, {
        xPercent: -50,
        duration: LOOP_DURATION,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: rootRef, dependencies: [photos.length] }
  );

  const togglePause = useCallback(() => {
    setPaused((prev) => {
      const next = !prev;
      if (tweenRef.current) {
        gsap.to(tweenRef.current, {
          timeScale: next ? 0 : 1,
          duration: 0.35,
          ease: "power2.out",
        });
      }
      return next;
    });
  }, []);

  return (
    <div
      ref={rootRef}
      className="photo-drift-gallery w-full overflow-hidden"
      role="button"
      tabIndex={0}
      aria-pressed={paused}
      aria-label={paused ? "Retomar carrossel de fotos" : "Pausar carrossel de fotos"}
      onClick={togglePause}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          togglePause();
        }
      }}
    >
      <div className="cursor-pointer overflow-hidden">
        <div className="photo-drift-track flex w-max items-stretch gap-1.5 will-change-transform sm:gap-2">
          {loopItems.map((photo, i) => (
            <div key={`${photo.src}-${i}`} className={CARD_CLASS}>
              <ZoomImage
                src={photo.src}
                alt={photo.label}
                className="h-full w-full"
                overlayClassName="bg-black/20"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
