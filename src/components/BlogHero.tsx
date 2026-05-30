"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { figmaClamp } from "@/lib/figma-scale";

/** Hero /blog — Figma head 2:435 (2401×1007; grupo em x:-68 no frame 1920). */
const ARTBOARD_W = 1920;
const HEAD_H = 1007;

const TITLE_SIZE = figmaClamp(565, {
  min: 56,
  max: 565,
  vw: (565 / ARTBOARD_W) * 100,
});

const TAG_SIZE = figmaClamp(52, {
  min: 14,
  max: 52,
  vw: (52 / ARTBOARD_W) * 100,
});

const INTRO_SIZE = figmaClamp(28, { min: 15, max: 28, vw: 1.45 });

const INTRO =
  "Explore nossa curadoria de insights sobre marketing 360, dados e branding para entender como o mercado está evoluindo e como sua marca pode liderar essa mudança.";

/** Coordenadas no frame 1920 (offset do grupo head -68 já somado). */
const FIGMA = {
  tagTop: { x: 112, y: 88, w: 735 },
  blog: { x: -68, y: 349 },
  amp: { x: 1000, y: 0 },
  intro: { x: 30, y: 760, w: 715 },
  tagBottom: { x: 970, y: 774, w: 820 },
} as const;

const pxTop = (y: number) => `${(y / HEAD_H) * 100}%`;
const pxLeft = (x: number) =>
  x <= 0
    ? `clamp(-48px, ${(x / ARTBOARD_W) * 100}vw, 12px)`
    : `clamp(12px, ${(x / ARTBOARD_W) * 100}vw, ${x}px)`;
const pxWidth = (w: number) => `min(${(w / ARTBOARD_W) * 100}vw, ${(w / 16).toFixed(3)}rem)`;

const heroHeight = figmaClamp(HEAD_H, {
  min: 420,
  max: HEAD_H,
  vw: (HEAD_H / ARTBOARD_W) * 100,
});

type TaglineProps = {
  lines: string[];
  align: "left" | "right";
  markerAtRight?: boolean;
};

function BlogTagline({ lines, align, markerAtRight }: TaglineProps) {
  const textAlign = align === "right" ? "text-right" : "text-left";

  return (
    <div
      className={`relative flex w-full flex-col gap-3 ${
        align === "right" ? "items-end" : "items-start"
      }`}
    >
      <span
        className={`absolute bg-[var(--orange)] ${markerAtRight ? "right-0" : "left-0"}`}
        aria-hidden
        style={{
          bottom: "calc(100% + clamp(0.45rem, 1.1em, 1.25rem))",
          width: "clamp(48px, 4.3vw, 83px)",
          height: "clamp(10px, 0.68vw, 13px)",
        }}
      />
      <div
        className={textAlign}
        style={{ fontFamily: "var(--font-inter)", fontSize: TAG_SIZE }}
      >
        {lines.map((line) => (
          <span
            key={line}
            className={`block font-semibold uppercase leading-[1.154] text-[#232323] ${textAlign}`}
          >
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function BlogHero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".blog-hero-title",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.06 }
        )
        .fromTo(
          ".blog-hero-tag, .blog-hero-intro",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.5"
        );
    },
    { scope: rootRef }
  );

  const titleStyle = {
    fontFamily: "var(--font-darker-grotesque)",
    fontSize: TITLE_SIZE,
    lineHeight: 0.165,
    letterSpacing: "-0.06em",
  } as const;

  return (
    <section
      ref={rootRef}
      className="relative overflow-x-clip bg-white"
      aria-label="Blog AMP"
    >
      <div
        className="relative mx-auto w-full max-w-[1920px] pt-[clamp(12.35rem,22.75vh,14.625rem)]"
        style={{ height: heroHeight, minHeight: heroHeight }}
      >
        <div
          className="blog-hero-tag pointer-events-none absolute z-20"
          style={{
            top: pxTop(FIGMA.tagTop.y),
            left: pxLeft(FIGMA.tagTop.x),
            width: pxWidth(FIGMA.tagTop.w),
          }}
        >
          <BlogTagline
            lines={["Além de entregar resultados,"]}
            align="right"
            markerAtRight
          />
        </div>

        <span
          className="blog-hero-title pointer-events-none absolute z-10 m-0 whitespace-nowrap font-black uppercase text-[var(--orange)]"
          style={{
            ...titleStyle,
            top: pxTop(FIGMA.blog.y),
            left: pxLeft(FIGMA.blog.x),
          }}
        >
          blog
        </span>

        <span
          className="blog-hero-title pointer-events-none absolute z-10 m-0 whitespace-nowrap font-black uppercase text-[var(--orange)]"
          style={{
            ...titleStyle,
            top: pxTop(FIGMA.amp.y),
            left: pxLeft(FIGMA.amp.x),
          }}
        >
          amp
        </span>

        <p
          className="blog-hero-intro pointer-events-none absolute z-20 m-0 font-normal leading-[2.21] text-[#232323]"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: INTRO_SIZE,
            top: pxTop(FIGMA.intro.y),
            left: pxLeft(FIGMA.intro.x),
            width: pxWidth(FIGMA.intro.w),
          }}
        >
          {INTRO}
        </p>

        <div
          className="blog-hero-tag pointer-events-none absolute z-20"
          style={{
            top: pxTop(FIGMA.tagBottom.y),
            left: pxLeft(FIGMA.tagBottom.x),
            width: pxWidth(FIGMA.tagBottom.w),
          }}
        >
          <BlogTagline
            lines={["compartilhamos o pensamento por trás deles"]}
            align="left"
          />
        </div>
      </div>
    </section>
  );
}
