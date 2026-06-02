"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ZoomImage from "@/components/ZoomImage";
import ImageLightbox from "@/components/ImageLightbox";

export type PhotoDriftItem = { src: string; label: string };

/** Todas as fotos no mesmo tamanho (retrato). */
const CARD_CLASS =
  "shrink-0 w-[clamp(260px,32vw,420px)] aspect-[4/5] overflow-hidden";

const LOOP_DURATION = 85;

type PhotoDriftStripProps = {
  photos: PhotoDriftItem[];
};

/** Uma fileira — loop infinito; clique na foto abre lightbox; hover pausa. */
export default function PhotoDriftStrip({ photos }: PhotoDriftStripProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [hoverPaused, setHoverPaused] = useState(false);

  const loopItems = [...photos, ...photos];

  const setTrackPaused = useCallback((pause: boolean) => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: pause ? 0 : 1,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  }, []);

  const isPaused = hoverPaused || lightboxIndex !== null;

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
    { scope: rootRef, dependencies: [photos.length] },
  );

  useEffect(() => {
    setTrackPaused(isPaused);
  }, [isPaused, setTrackPaused]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index % photos.length);
  }, [photos.length]);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + photos.length) % photos.length,
    );
  }, [photos.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % photos.length,
    );
  }, [photos.length]);

  const active = lightboxIndex !== null ? photos[lightboxIndex] : null;

  return (
    <>
      <div
        ref={rootRef}
        className="photo-drift-gallery w-full overflow-hidden"
        onMouseEnter={() => setHoverPaused(true)}
        onMouseLeave={() => setHoverPaused(false)}
      >
        <div className="overflow-hidden">
          <div className="photo-drift-track flex w-max items-stretch gap-1.5 will-change-transform sm:gap-2">
            {loopItems.map((photo, i) => {
              const photoIndex = i % photos.length;
              return (
                <button
                  key={`${photo.src}-${i}`}
                  type="button"
                  className={`${CARD_CLASS} cursor-zoom-in border-0 bg-transparent p-0 text-left`}
                  aria-label={`Ampliar foto: ${photo.label}`}
                  onClick={() => openLightbox(photoIndex)}
                >
                  <ZoomImage
                    src={photo.src}
                    alt={photo.label}
                    className="pointer-events-none h-full w-full"
                    overlayClassName="bg-black/20"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {active ? (
        <ImageLightbox
          open
          src={active.src}
          alt={active.label}
          onClose={closeLightbox}
          onPrev={photos.length > 1 ? goPrev : undefined}
          onNext={photos.length > 1 ? goNext : undefined}
        />
      ) : null}
    </>
  );
}
