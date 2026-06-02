"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { figmaClamp } from "@/lib/figma-scale";
import { FULL_BLEED, PREMIOS_PAD_X } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Hero /premios — Figma 2:564 head (1920×741); layout mapeado em 100svh. */
const ARTBOARD_W = 1920;
const HERO_H_PX = 741;

const TITLE_PX = 465;
const TITLE_SIZE = `clamp(4.5rem, min(${(TITLE_PX / ARTBOARD_W) * 100}vw, 34svh), ${TITLE_PX}px)`;

const TAG_FONT = figmaClamp(52, {
  min: 14,
  max: 52,
  vw: (52 / ARTBOARD_W) * 100,
});

const BLEED_LEFT = "-2.5vw";

/** Posições Figma → % da altura do hero (741px). */
const FIGMA = {
  tagTop: { x: 1016, y: 63, w: 935 },
  tagBottom: { x: 170, w: 929 },
} as const;

const pctTop = (y: number) => `${(y / HERO_H_PX) * 100}%`;
const pxLeft = (x: number) =>
  x <= 0
    ? `clamp(-28px, ${(x / ARTBOARD_W) * 100}vw, 12px)`
    : `clamp(12px, ${(x / ARTBOARD_W) * 100}vw, ${x}px)`;
const pxWidth = (w: number) => `min(${(w / ARTBOARD_W) * 100}vw, ${(w / 16).toFixed(3)}rem)`;

type TaglineProps = {
  lines: [string, string?];
  align: "left" | "right";
};

function PremiosTagline({ lines, align }: TaglineProps) {
  const lineClass = `block font-semibold uppercase leading-[1.154] text-[#232323] ${
    align === "right" ? "text-right" : "text-left"
  }`;

  return (
    <div
      className={`premios-tagline relative flex w-full max-w-full flex-col gap-3 ${
        align === "right" ? "items-end" : "items-start"
      }`}
    >
      <span
        className={`shrink-0 bg-[var(--orange)] ${align === "right" ? "ml-auto" : ""}`}
        aria-hidden
        style={{
          width: "clamp(48px, 4.3vw, 83px)",
          height: "clamp(10px, 0.68vw, 13px)",
        }}
      />
      <div style={{ fontFamily: "var(--font-inter)", fontSize: TAG_FONT }}>
        <span className={lineClass}>{lines[0]}</span>
        {lines[1] ? <span className={lineClass}>{lines[1]}</span> : null}
      </div>
    </div>
  );
}

export default function PremiosHero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".hero-premios-wrap", { x: -32 }, { x: 0, duration: 1.1 })
        .fromTo(
          ".hero-premios-title",
          {
            scale: 1.12,
            opacity: 0,
            filter: "blur(10px)",
            transformOrigin: "left center",
          },
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.15 },
          "-=0.2"
        )
        .fromTo(
          ".premios-tagline",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.1 },
          "-=0.65"
        );

      gsap.to(".hero-premios-wrap", {
        xPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
        },
      });
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className={`${FULL_BLEED} z-10 h-[100svh] min-h-[100svh] overflow-hidden bg-white`}
      aria-label="Prêmios"
    >
      <div className="relative h-full w-full">
        {/* Tag superior — Figma y:63 */}
        <div
          className="premios-tagline pointer-events-none absolute z-20"
          style={{
            top: pctTop(FIGMA.tagTop.y),
            left: pxLeft(FIGMA.tagTop.x),
            width: pxWidth(FIGMA.tagTop.w),
          }}
        >
          <PremiosTagline lines={["e clientes que confiam no nosso trabalho."]} align="left" />
        </div>

        {/* Título — centro vertical do 100svh (flex evita conflito com GSAP no transform) */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center">
          <div className="hero-premios-wrap w-full will-change-transform">
            <h1
              className="hero-premios-title font-black uppercase text-[var(--orange)]"
              style={{
                fontFamily: "var(--font-darker-grotesque)",
                fontSize: TITLE_SIZE,
                lineHeight: 0.667,
                letterSpacing: "-0.06em",
                transform: `translateX(${BLEED_LEFT})`,
              }}
            >
              prêmios
            </h1>
          </div>
        </div>

        {/* Tag inferior — Figma y:520 (abaixo do título, dentro do 100svh) */}
        <div
          className="premios-tagline pointer-events-none absolute z-20 max-w-[min(100%,48rem)]"
          style={{
            bottom: "clamp(1.25rem, 5.5svh, 4rem)",
            left: pxLeft(FIGMA.tagBottom.x),
            width: pxWidth(FIGMA.tagBottom.w),
            paddingRight: PREMIOS_PAD_X,
          }}
        >
          <PremiosTagline
            lines={["Prêmios são a consequência", "de estratégias bem executadas"]}
            align="left"
          />
        </div>
      </div>
    </section>
  );
}
