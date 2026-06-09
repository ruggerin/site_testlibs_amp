"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { figmaClamp } from "@/lib/figma-scale";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Hero Desktop — Figma 2:893 (frame 1920; hero até y≈1063). */
const ARTBOARD_W = 1920;
const HERO_H_PX = 1063;

const TITLE_PX = 465;
const TITLE_SIZE = figmaClamp(TITLE_PX, {
  min: 140,
  max: TITLE_PX,
  vw: (TITLE_PX / ARTBOARD_W) * 100,
});

const TAG_FONT = figmaClamp(52, {
  min: 16,
  max: 52,
  vw: (52 / ARTBOARD_W) * 100,
});

const BLEED_LEFT = "-2vw";

/** Posições Figma (px no frame 1920×1063). */
const FIGMA = {
  tag1: { x: 338, y: 235, w: 510 },
  tag1Marker: { x: 765, y: 172 },
  title: { x: -46, y: 295 },
  /** +55px / +40px vs. Figma — alinha sob o “i” de serviços no preview */
  tag2: { x: 920, y: 826, w: 744 },
  tag2Marker: { x: 868, y: 723 },
} as const;

const pxTop = (y: number) => `${(y / HERO_H_PX) * 100}%`;
const pxLeft = (x: number) => `max(1rem, ${(x / ARTBOARD_W) * 100}vw)`;
const pxWidth = (w: number) => `min(${(w / ARTBOARD_W) * 100}vw, ${(w / 16).toFixed(3)}rem)`;

const titleStyle = {
  fontFamily: "var(--font-darker-grotesque)",
  fontSize: TITLE_SIZE,
  lineHeight: 0.667,
  letterSpacing: "-0.06em",
} as const;

type TaglineProps = {
  lines: [string, string?];
  align: "left" | "right";
  markerAtRight?: boolean;
};

function ServicosTagline({ lines, align, markerAtRight }: TaglineProps) {
  const lineClass =
    `font-semibold uppercase leading-[1.154] text-[#232323] ${align === "right" ? "text-right" : "text-left"}`;

  return (
    <div
      className={`servicos-tagline relative flex w-max max-w-full flex-col gap-3 ${align === "right" ? "items-end" : "items-start"}`}
    >
      <span
        className={`servicos-tagline-marker absolute bg-[var(--orange)] ${markerAtRight ? "right-0" : "left-0"}`}
        aria-hidden
        style={{
          bottom: "calc(100% + clamp(0.45rem, 1.1em, 1.25rem))",
          width: "clamp(48px, 4.3vw, 83px)",
          height: "clamp(10px, 0.68vw, 13px)",
          transformOrigin: markerAtRight ? "right center" : "left center",
        }}
      />
      <div style={{ fontFamily: "var(--font-inter)", fontSize: TAG_FONT }}>
        <span style={{ display: "block", overflow: "hidden" }}>
          <span className={`servicos-tagline-line sm:whitespace-nowrap ${lineClass}`} style={{ display: "inline-block" }}>
            {lines[0]}
          </span>
        </span>
        {lines[1] ? (
          <span style={{ display: "block", overflow: "hidden" }}>
            <span className={`servicos-tagline-line ${lineClass}`} style={{ display: "inline-block" }}>
              {lines[1]}
            </span>
          </span>
        ) : null}
      </div>
    </div>
  );
}

/** Hero /servicos — Figma 2:893. */
export default function ServicosHero() {
  const heroRef = useRef<HTMLElement>(null);
  const heroHeight = `min(100svh, ${HERO_H_PX}px)`;

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".hero-servicos-wrap", { x: -36 }, { x: 0, duration: 1.1 })
        .fromTo(
          ".hero-servicos-title",
          {
            scale: 1.24,
            opacity: 0,
            filter: "blur(16px)",
            y: 28,
            transformOrigin: "left center",
          },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 1.4,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .fromTo(".servicos-tagline-marker",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, stagger: 0.35, ease: "power2.inOut" }, "-=0.8")
        .fromTo(".servicos-tagline-line",
          { y: "108%" },
          { y: "0%", duration: 1.5, stagger: 0.2, ease: "power3.out" }, "<0.18");

      gsap.to(".hero-servicos-wrap", {
        xPercent: -22,
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
    <section ref={heroRef} data-page-hero className="relative overflow-x-clip overflow-y-visible bg-white">
      <div
        className="relative w-full overflow-visible"
        style={{ height: heroHeight, minHeight: heroHeight }}
      >
        {/* Tudo conectado. */}
        <div
          className="servicos-tagline pointer-events-none absolute z-20"
          style={{
            top: pxTop(FIGMA.tag1.y),
            left: pxLeft(FIGMA.tag1.x),
            width: pxWidth(FIGMA.tag1.w),
          }}
        >
          <ServicosTagline lines={["Tudo conectado."]} align="right" markerAtRight />
        </div>

        {/* serviços */}
        <div
          className="hero-servicos-wrap pointer-events-none absolute left-0 z-10 will-change-transform"
          style={{ top: pxTop(FIGMA.title.y) }}
        >
          <h1
            className="hero-servicos-title font-black uppercase text-[var(--orange)] whitespace-nowrap"
            style={{
              ...titleStyle,
              transform: `translateX(${BLEED_LEFT})`,
            }}
          >
            serviços
          </h1>
        </div>

        {/* Do jeito que deve ser. — canto inf. direito do hero, abaixo do título */}
        <div
          className="servicos-tagline pointer-events-none absolute z-30"
          style={{
            top: pxTop(FIGMA.tag2.y),
            left: pxLeft(FIGMA.tag2.x),
            width: pxWidth(FIGMA.tag2.w),
          }}
        >
          <ServicosTagline
            lines={["Do jeito que", "deve ser."]}
            align="left"
          />
        </div>
      </div>
    </section>
  );
}
