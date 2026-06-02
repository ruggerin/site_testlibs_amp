"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { figmaClamp } from "@/lib/figma-scale";
import { FULL_BLEED } from "@/lib/site";
import type { Award } from "@/data/awards";

const ARTBOARD_W = 1920;
const CARD_W_PX = 390;
const CARD_H_PX = 500;
const SECTION_H_PX = 780;
const GAP_PX = 23;

// px visíveis do card d=2 no canto do stage
const SLIVER_PX = 22;

const LABEL_SIZE = figmaClamp(32, { min: 14, max: 32, vw: 1.67 });
const DESC_SIZE = figmaClamp(48, { min: 18, max: 48, vw: 2.5 });

const CARD_W = figmaClamp(CARD_W_PX, {
  min: 180,
  max: CARD_W_PX,
  vw: (CARD_W_PX / ARTBOARD_W) * 100,
});
const CARD_H = figmaClamp(CARD_H_PX, {
  min: 220,
  max: CARD_H_PX,
  vw: (CARD_H_PX / ARTBOARD_W) * 100,
});

/** Intervalo entre slides — avanço automático. */
const AUTOPLAY_MS = 4500;

function wrapOffset(i: number, current: number, total: number) {
  let d = i - current;
  if (d > total / 2) d -= total;
  if (d < -total / 2) d += total;
  return d;
}

function cardVisual(offset: number) {
  const d = Math.abs(offset);
  if (d === 0) {
    return { scale: 1, bg: "#D9D9D9", zIndex: 30, opacity: 1, rotateY: 0 };
  }
  if (d === 1) {
    return {
      scale: 0.90,
      bg: "#7A7A7A",
      zIndex: 20,
      opacity: 1,
      rotateY: offset > 0 ? -28 : 28,
    };
  }
  // d >= 2 — sliver visível no canto; rotateY alto deixa o card muito fino
  return {
    scale: 0.78,
    bg: "#404040",
    zIndex: 5,
    opacity: 0.65,
    rotateY: offset > 0 ? -70 : 70,
  };
}

/**
 * Posição X de cada card relativa ao centro do stage.
 * d<=1: offset normal por step.
 * d>=2: ancoragem no canto do stage, mostrando exatamente SLIVER_PX do card.
 */
function getCardX(
  offset: number,
  step: number,
  stageHalfW: number,
  cardW: number
): number {
  const d = Math.abs(offset);
  if (d <= 1) return offset * step;

  const sign = Math.sign(offset);
  const v = cardVisual(offset);
  // largura visual aproximada com foreshortening do rotateY
  const cosA = Math.cos((Math.abs(v.rotateY) * Math.PI) / 180);
  const visualHalfW = (cardW * v.scale * cosA) / 2;
  // posicionar borda interna do card a SLIVER_PX do canto do stage
  return sign * (stageHalfW - SLIVER_PX + visualHalfW);
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
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metrics = useRef({ cardW: 300, step: 320, stageHalfW: 720 });
  const animating = useRef(false);
  const currentRef = useRef(0);
  const prevIndexRef = useRef(0);
  const hasEnteredRef = useRef(false);
  const isVisibleRef = useRef(false);
  const autoplayPausedRef = useRef(false);
  currentRef.current = current;

  const measure = useCallback(() => {
    const stage = stageRef.current;
    const first = cardRefs.current[0];
    if (!first || !stage) return;
    const cardW = first.offsetWidth;
    const gap = Math.max(10, window.innerWidth * (GAP_PX / ARTBOARD_W));
    metrics.current = {
      cardW,
      step: cardW + gap,
      stageHalfW: stage.offsetWidth / 2,
    };
  }, []);

  const applyFrame = useCallback(
    (index: number, animate: boolean) => {
      if (!stageRef.current) {
        if (animate) animating.current = false;
        return;
      }

      const { step, stageHalfW, cardW } = metrics.current;
      const prevIndex = prevIndexRef.current;
      prevIndexRef.current = index;

      const tween = {
        duration: animate ? 0.85 : 0,
        ease: "power3.inOut" as const,
        onComplete: () => {
          animating.current = false;
        },
      };

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const newOffset = wrapOffset(i, index, awards.length);
        const v = cardVisual(newOffset);
        const x = getCardX(newOffset, step, stageHalfW, cardW);

        if (!animate) {
          gsap.set(card, {
            x,
            scale: v.scale,
            opacity: v.opacity,
            rotateY: v.rotateY,
            backgroundColor: v.bg,
            zIndex: v.zIndex,
          });
          return;
        }

        const oldOffset = wrapOffset(i, prevIndex, awards.length);
        const wasOffScreen = Math.abs(oldOffset) >= 2;
        const crossesCenter =
          newOffset !== 0 && Math.sign(oldOffset) !== Math.sign(newOffset);

        if (wasOffScreen && crossesCenter) {
          const teleportOffset = Math.sign(newOffset) * Math.abs(oldOffset);
          const startV = cardVisual(teleportOffset);
          gsap.set(card, {
            x: getCardX(teleportOffset, step, stageHalfW, cardW),
            scale: startV.scale,
            opacity: 0,
            rotateY: startV.rotateY,
            zIndex: startV.zIndex,
          });
        }

        gsap.to(card, {
          x,
          scale: v.scale,
          opacity: v.opacity,
          rotateY: v.rotateY,
          backgroundColor: v.bg,
          zIndex: v.zIndex,
          ...tween,
        });

        // Zoom na imagem interna: card central fica levemente ampliado
        const img = imgRefs.current[i];
        if (img) {
          const imgScale = Math.abs(newOffset) === 0 ? 1.07 : 1.0;
          if (animate) gsap.to(img, { scale: imgScale, ...tween });
          else gsap.set(img, { scale: imgScale });
        }
      });
    },
    [awards.length]
  );

  useLayoutEffect(() => {
    cardRefs.current.forEach((card) => {
      if (card) gsap.set(card, { xPercent: -50, yPercent: -50 });
    });
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

  // Entrada + visibilidade (autoplay só quando a seção está no viewport)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !hasEnteredRef.current) {
          hasEnteredRef.current = true;
          section.classList.add("scroll-reveal-visible");
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

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

  // Avanço automático (pausa no hover, aba oculta ou durante animação)
  useEffect(() => {
    if (awards.length <= 1) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const tick = () => {
      if (
        document.hidden ||
        !isVisibleRef.current ||
        autoplayPausedRef.current ||
        animating.current
      ) {
        return;
      }
      step(1);
    };

    const id = window.setInterval(tick, AUTOPLAY_MS);

    const onReduced = () => {
      if (reduced.matches) window.clearInterval(id);
    };
    reduced.addEventListener("change", onReduced);

    return () => {
      window.clearInterval(id);
      reduced.removeEventListener("change", onReduced);
    };
  }, [awards.length, step]);

  const active = awards[current]!;

  return (
    <section
      ref={sectionRef}
      className={`${FULL_BLEED} scroll-reveal relative overflow-x-clip bg-[#232323]`}
      aria-label="Carrossel de prêmios"
      aria-live="polite"
      onMouseEnter={() => {
        autoplayPausedRef.current = true;
      }}
      onMouseLeave={() => {
        autoplayPausedRef.current = false;
      }}
      onFocusCapture={() => {
        autoplayPausedRef.current = true;
      }}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          autoplayPausedRef.current = false;
        }
      }}
    >
      <div
        className="relative w-full max-w-none"
        style={{
          minHeight: figmaClamp(SECTION_H_PX, {
            min: 480,
            max: SECTION_H_PX,
            vw: (SECTION_H_PX / ARTBOARD_W) * 100,
          }),
        }}
      >
        <div className="relative w-full" style={{ height: CARD_H }}>
          {/* Stage 3D */}
          <div
            ref={stageRef}
            className="absolute inset-0 overflow-hidden"
            style={{ perspective: "1600px" }}
          >
            {awards.map((award, i) => (
              <div
                key={award.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute left-1/2 top-1/2 overflow-hidden bg-white will-change-transform"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  transformOrigin: "50% 50%",
                }}
              >
                {/* Wrapper interno — GSAP anima scale aqui para o zoom do card ativo */}
                <div
                  ref={(el) => { imgRefs.current[i] = el; }}
                  className="hover-zoom-media absolute inset-0 will-change-transform"
                >
                  {award.image ? (
                    <Image
                      src={award.image}
                      alt=""
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 70vw, 573px"
                    />
                  ) : null}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Figma Group 34 — label + descrição + setas */}
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
