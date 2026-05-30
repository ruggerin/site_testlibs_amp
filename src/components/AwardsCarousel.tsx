"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { figmaClamp } from "@/lib/figma-scale";
import type { Award } from "@/data/awards";

/**
 * Figma /premios — carrossel 2:553 (573×764) dentro do frame masc 2:570 (2088×1099).
 * Elipses 2:571/2:572 omitidas; animação fina fica para depois.
 */
const ARTBOARD_W = 1920;
const CARD_W_PX = 573;
const CARD_H_PX = 764;
const SECTION_H_PX = 1099;
const GAP_PX = 23;

const LABEL_SIZE = figmaClamp(32, { min: 14, max: 32, vw: 1.67 });
const DESC_SIZE = figmaClamp(48, { min: 18, max: 48, vw: 2.5 });

const CARD_W = figmaClamp(CARD_W_PX, {
  min: 220,
  max: CARD_W_PX,
  vw: (CARD_W_PX / ARTBOARD_W) * 100,
});
const CARD_H = figmaClamp(CARD_H_PX, {
  min: 280,
  max: CARD_H_PX,
  vw: (CARD_H_PX / ARTBOARD_W) * 100,
});

function wrapOffset(i: number, current: number, total: number) {
  let d = i - current;
  if (d > total / 2) d -= total;
  if (d < -total / 2) d += total;
  return d;
}

/** Visual estático — coverflow 3D (protótipo masc). */
function cardVisual(offset: number) {
  const d = Math.abs(offset);
  if (d === 0) {
    return { scale: 1, bg: "#D9D9D9", zIndex: 30, opacity: 1, rotateY: 0 };
  }
  if (d === 1) {
    return {
      scale: 0.84,
      bg: "#7A7A7A",
      zIndex: 20,
      opacity: 1,
      rotateY: offset > 0 ? -34 : 34,
    };
  }
  return {
    scale: 0.72,
    bg: "#505050",
    zIndex: 5,
    opacity: 0.35,
    rotateY: offset > 0 ? -40 : 40,
  };
}

function CarouselArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative z-40 flex size-[clamp(56px,4.3vw,82px)] shrink-0 cursor-pointer items-center justify-center bg-[var(--orange)] transition-opacity hover:opacity-85"
      aria-label={direction === "prev" ? "Prêmio anterior" : "Próximo prêmio"}
    >
      <svg
        width="40"
        height="22"
        viewBox="0 0 40 22"
        fill="none"
        aria-hidden
        className={direction === "prev" ? "rotate-180" : ""}
      >
        <path d="M38 11L2 2v18l36-9z" fill="white" />
      </svg>
    </button>
  );
}

export default function AwardsCarousel({ awards }: { awards: Award[] }) {
  const [current, setCurrent] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metrics = useRef({ cardW: 300, step: 320 });
  const animating = useRef(false);
  const currentRef = useRef(0);
  currentRef.current = current;

  const measure = useCallback(() => {
    const first = cardRefs.current[0];
    if (!first) return;
    const cardW = first.offsetWidth;
    const gap = Math.max(10, window.innerWidth * (GAP_PX / ARTBOARD_W));
    metrics.current = { cardW, step: cardW + gap };
  }, []);

  const applyFrame = useCallback(
    (index: number, animate: boolean) => {
      const stage = stageRef.current;
      const track = trackRef.current;
      if (!stage || !track) {
        if (animate) animating.current = false;
        return;
      }

      const { cardW, step } = metrics.current;
      if (cardW <= 0) {
        if (animate) animating.current = false;
        return;
      }
      const x = stage.offsetWidth / 2 - cardW / 2 - index * step;

      const tween = {
        duration: animate ? 0.85 : 0,
        ease: "power3.inOut" as const,
        onComplete: () => {
          animating.current = false;
        },
      };

      if (animate) gsap.to(track, { x, ...tween });
      else gsap.set(track, { x });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const v = cardVisual(wrapOffset(i, index, awards.length));
        const props = {
          scale: v.scale,
          opacity: v.opacity,
          rotateY: v.rotateY,
          backgroundColor: v.bg,
          zIndex: v.zIndex,
          ...tween,
        };
        if (animate) gsap.to(card, props);
        else gsap.set(card, props);
      });
    },
    [awards.length]
  );

  useLayoutEffect(() => {
    measure();
    applyFrame(currentRef.current, false);
  }, [measure, applyFrame]);

  useEffect(() => {
    const onResize = () => {
      measure();
      applyFrame(currentRef.current, false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure, applyFrame]);

  const step = useCallback(
    (dir: 1 | -1) => {
      if (animating.current) return;
      const next =
        (currentRef.current + dir + awards.length) % awards.length;
      animating.current = true;
      setCurrent(next);
      requestAnimationFrame(() => applyFrame(next, true));
    },
    [awards.length, applyFrame]
  );

  const active = awards[current]!;

  return (
    <section
      className="relative w-full overflow-x-clip bg-[#232323]"
      aria-label="Carrossel de prêmios"
    >
      {/* Área do carrossel — proporção Figma 764px altura no artboard */}
      <div
        className="relative mx-auto w-full max-w-[1920px]"
        style={{
          minHeight: figmaClamp(SECTION_H_PX, {
            min: 480,
            max: SECTION_H_PX,
            vw: (SECTION_H_PX / ARTBOARD_W) * 100,
          }),
        }}
      >
        <div
          ref={stageRef}
          className="relative mx-auto w-full overflow-hidden"
          style={{
            height: CARD_H,
            perspective: "1600px",
          }}
        >
          <div
            ref={trackRef}
            className="absolute left-0 top-1/2 flex -translate-y-1/2 will-change-transform"
            style={{
              gap: figmaClamp(GAP_PX, { min: 10, max: GAP_PX, vw: 1.2 }),
              transformStyle: "preserve-3d",
            }}
          >
            {awards.map((award, i) => (
              <div
                key={award.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="relative shrink-0 overflow-hidden bg-[#D9D9D9] will-change-transform"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  transformOrigin: "50% 50%",
                }}
              >
                {award.image ? (
                  <Image
                    src={award.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 70vw, 573px"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* Figma Group 34 — centralizado sob o card ativo */}
        <div className="relative z-30 flex w-full justify-center px-4 pb-10 pt-6 md:pb-14 md:pt-8">
          <div className="inline-flex max-w-[min(100%,1005px)] items-start justify-center gap-4 md:gap-5">
            <CarouselArrow direction="prev" onClick={() => step(-1)} />

            <div className="w-[min(100%,486px)] min-w-0 text-center">
              <p
                className="mb-2 font-black uppercase leading-none text-[var(--orange)] md:mb-3"
                style={{
                  fontFamily: "var(--font-darker-grotesque)",
                  fontSize: LABEL_SIZE,
                }}
              >
                {active.title}
              </p>
              <p
                className="font-black uppercase leading-[0.98] text-[#F7F7F7]"
                style={{
                  fontFamily: "var(--font-darker-grotesque)",
                  fontSize: DESC_SIZE,
                }}
              >
                {active.description}
              </p>
            </div>

            <CarouselArrow direction="next" onClick={() => step(1)} />
          </div>
        </div>
      </div>
    </section>
  );
}
