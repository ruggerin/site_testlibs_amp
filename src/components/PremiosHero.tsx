"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { figmaClamp } from "@/lib/figma-scale";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Hero /premios — Figma 2:564 head (1951×741 @ artboard 1920). */
const ARTBOARD_W = 1920;
const HERO_H_PX = 741;

const TITLE_PX = 465;
const TITLE_SIZE = figmaClamp(TITLE_PX, {
  min: 100,
  max: TITLE_PX,
  vw: (TITLE_PX / ARTBOARD_W) * 100,
});

const TAG_FONT = figmaClamp(52, {
  min: 14,
  max: 52,
  vw: (52 / ARTBOARD_W) * 100,
});

const BLEED_LEFT = "-2.5vw";

const FIGMA = {
  tagTop: { x: 1016, y: 63, w: 935 },
  title: { x: -20, y: 189 },
  tagBottom: { x: 170, w: 929 },
} as const;

const pxTop = (y: number) => `${(y / HERO_H_PX) * 100}%`;
const pxLeft = (x: number) =>
  x <= 0
    ? `clamp(-28px, ${(x / ARTBOARD_W) * 100}vw, 12px)`
    : `clamp(12px, ${(x / ARTBOARD_W) * 100}vw, ${x}px)`;
const pxWidth = (w: number) => `min(${(w / ARTBOARD_W) * 100}vw, ${(w / 16).toFixed(3)}rem)`;

/** Espaço título → tag inferior (Figma ~153px / 741px ≈ 20.6%). */
const TAG_BELOW_TITLE = "clamp(1rem, 20.6vh, 9.5625rem)";

type TaglineProps = {
  lines: [string, string?];
  align: "left" | "right";
  markerAtRight?: boolean;
};

function PremiosTagline({ lines, align, markerAtRight }: TaglineProps) {
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
        className={`shrink-0 bg-[var(--orange)] ${markerAtRight ? "ml-auto" : ""}`}
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
      className="relative z-10 overflow-x-clip bg-white pb-10 md:pb-12"
      aria-label="Prêmios"
    >
      <div
        className="relative mx-auto w-full max-w-[1951px]"
        style={{
          minHeight: `clamp(620px, ${(HERO_H_PX / ARTBOARD_W) * 100}vw, ${HERO_H_PX + 80}px)`,
        }}
      >
        <div
          className="premios-tagline pointer-events-none absolute z-20"
          style={{
            top: pxTop(FIGMA.tagTop.y),
            left: pxLeft(FIGMA.tagTop.x),
            width: pxWidth(FIGMA.tagTop.w),
          }}
        >
          <PremiosTagline
            lines={["e clientes que confiam no nosso trabalho."]}
            align="left"
          />
        </div>

        {/* Título + tag inferior em fluxo — tag sobe com o título e não é cortada */}
        <div
          className="hero-premios-wrap pointer-events-none absolute left-0 z-10 w-full will-change-transform"
          style={{ top: pxTop(FIGMA.title.y) }}
        >
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

          <div
            className="premios-tagline max-w-full"
            style={{
              marginTop: TAG_BELOW_TITLE,
              marginLeft: pxLeft(FIGMA.tagBottom.x),
              width: pxWidth(FIGMA.tagBottom.w),
            }}
          >
            <PremiosTagline
              lines={[
                "Prêmios são a consequência",
                "de estratégias bem executadas",
              ]}
              align="left"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
