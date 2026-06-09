"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { figmaClamp } from "@/lib/figma-scale";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Hero /cases — Figma 2:832 (head, 2176×1046; artboard 1920). */
const ARTBOARD_W = 1920;
const HERO_H_PX = 1046;

const TITLE_PX = 427;
const TITLE_SIZE = figmaClamp(TITLE_PX, {
  min: 120,
  max: TITLE_PX,
  vw: (TITLE_PX / ARTBOARD_W) * 100,
});

const TAG_FONT = figmaClamp(52, {
  min: 16,
  max: 52,
  vw: (52 / ARTBOARD_W) * 100,
});

/** Grupo head Figma em x:-20 — título sangra à esquerda. */
const BLEED_LEFT = "-2.5vw";

const FIGMA = {
  /** Figma 2:838 — layout_QITTXG x:297 */
  tag1: { x: 297, y: 218, w: 482 },
  tag1Marker: { x: 696, y: 155 },
  title: { x: -20, y: 424 },
  tag2: { x: 865, y: 786, w: 744 },
  tag2Marker: { x: 868, y: 723 },
} as const;

const pxTop = (y: number) => `${(y / HERO_H_PX) * 100}%`;
const pxLeft = (x: number) =>
  x <= 0
    ? `clamp(-28px, ${(x / ARTBOARD_W) * 100}vw, 12px)`
    : `clamp(12px, ${(x / ARTBOARD_W) * 100}vw, ${x}px)`;
const pxWidth = (w: number) => `min(${(w / ARTBOARD_W) * 100}vw, ${(w / 16).toFixed(3)}rem)`;

type TaglineProps = {
  lines: [string, string?];
  align: "left" | "right";
  markerAtRight?: boolean;
};

function CasesTagline({ lines, align, markerAtRight }: TaglineProps) {
  const lineClass = `block font-semibold uppercase leading-[1.154] text-[#F7F7F7] ${
    align === "right" ? "text-right" : "text-left"
  }`;

  return (
    <div
      className={`cases-tagline relative flex w-max max-w-full flex-col gap-3 ${
        align === "right" ? "items-end" : "items-start"
      }`}
    >
      <span
        className={`absolute bg-[#232323] ${markerAtRight ? "right-0" : "left-0"}`}
        aria-hidden
        style={{
          bottom: "calc(100% + clamp(0.45rem, 1.1em, 1.25rem))",
          width: "clamp(48px, 4.3vw, 83px)",
          height: "clamp(10px, 0.68vw, 13px)",
        }}
      />
      <div style={{ fontFamily: "var(--font-inter)", fontSize: TAG_FONT }}>
        <span className={`${lineClass} sm:whitespace-nowrap`}>{lines[0]}</span>
        {lines[1] ? <span className={lineClass}>{lines[1]}</span> : null}
      </div>
    </div>
  );
}

export default function CasesHero() {
  const heroRef = useRef<HTMLElement>(null);
  const heroHeight = `min(100svh, ${HERO_H_PX}px)`;

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".hero-cases-wrap", { x: -36 }, { x: 0, duration: 1.1 })
        .fromTo(
          ".hero-cases-title",
          {
            scale: 1.2,
            opacity: 0,
            filter: "blur(12px)",
            transformOrigin: "left center",
          },
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.3 },
          "-=0.2"
        )
        .fromTo(
          ".cases-tagline",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.1 },
          "-=0.75"
        );

      gsap.to(".hero-cases-wrap", {
        xPercent: -10,
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
      data-page-hero
      className="relative overflow-x-clip bg-[var(--orange)]"
      aria-label="Projetos"
    >
      <div
        className="relative mx-auto w-full max-w-[1928px]"
        style={{ height: heroHeight, minHeight: heroHeight }}
      >
        <div
          className="cases-tagline pointer-events-none absolute z-20"
          style={{
            top: pxTop(FIGMA.tag1.y),
            left: pxLeft(FIGMA.tag1.x),
            width: pxWidth(FIGMA.tag1.w),
          }}
        >
          <CasesTagline lines={["Quando tudo se conecta,"]} align="right" markerAtRight />
        </div>

        <div
          className="hero-cases-wrap pointer-events-none absolute left-0 z-10 w-full will-change-transform"
          style={{ top: pxTop(FIGMA.title.y) }}
        >
          <h1
            className="hero-cases-title font-black uppercase text-[#232323] whitespace-nowrap"
            style={{
              fontFamily: "var(--font-darker-grotesque)",
              fontSize: TITLE_SIZE,
              lineHeight: 0.218,
              letterSpacing: "-0.06em",
              transform: `translateX(${BLEED_LEFT})`,
            }}
          >
            projetos
          </h1>
        </div>

        <div
          className="cases-tagline pointer-events-none absolute z-20"
          style={{
            top: pxTop(FIGMA.tag2.y),
            left: pxLeft(FIGMA.tag2.x),
            width: pxWidth(FIGMA.tag2.w),
          }}
        >
          <CasesTagline
            lines={["o resultado deixa de ser esforço."]}
            align="left"
          />
        </div>
      </div>
    </section>
  );
}
