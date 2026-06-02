"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type ImageLightboxProps = {
  open: boolean;
  src: string;
  alt: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
};

function LightboxArrow({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:border-[var(--orange)] hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] md:h-14 md:w-14"
      style={{
        [direction === "prev" ? "left" : "right"]: "clamp(12px, 2vw, 28px)",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d={direction === "prev" ? "M13 4L6 10l7 6" : "M7 4l7 6-7 6"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function ImageLightbox({
  open,
  src,
  alt,
  onClose,
  onPrev,
  onNext,
}: ImageLightboxProps) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft" && onPrev) {
        e.preventDefault();
        onPrev();
      } else if (e.key === "ArrowRight" && onNext) {
        e.preventDefault();
        onNext();
      }
    },
    [open, onClose, onPrev, onNext],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/88 backdrop-blur-[2px]"
        aria-label="Fechar visualização"
        onClick={onClose}
      />

      <div className="relative z-[1] flex w-full max-w-[min(96vw,1600px)] flex-col items-center">
        <p id={titleId} className="sr-only">
          {alt}
        </p>

        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute -top-2 right-0 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white transition-colors hover:border-[var(--orange)] hover:text-[var(--orange)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] sm:-top-12"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path
              d="M4 4l10 10M14 4L4 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {onPrev ? (
          <LightboxArrow direction="prev" onClick={onPrev} label="Foto anterior" />
        ) : null}
        {onNext ? (
          <LightboxArrow direction="next" onClick={onNext} label="Próxima foto" />
        ) : null}

        <div
          className="relative w-full overflow-hidden rounded-sm bg-[#1a1a1a] shadow-2xl ring-1 ring-white/10"
          style={{ height: "min(88svh, 1080px)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            key={src}
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="96vw"
            priority
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
