"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { figmaClamp } from "@/lib/figma-scale";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

const BLEED_LEFT = "-2vw";

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

const titleStyle = {
  fontFamily: "var(--font-darker-grotesque)",
  fontSize: TITLE_SIZE,
  lineHeight: 0.165,
  letterSpacing: "-0.06em",
} as const;

type TaglineProps = {
  lines: string[];
  align: "left" | "right";
  markerAtRight?: boolean;
};

function BlogTagline({ lines, align, markerAtRight }: TaglineProps) {
  const lineClass = `block font-semibold uppercase leading-[1.154] text-[#232323] ${
    align === "right" ? "text-right" : "text-left"
  }`;

  return (
    <div
      className={`blog-tagline relative flex w-full flex-col gap-3 ${
        align === "right" ? "items-end" : "items-start"
      }`}
    >
      <span
        className={`blog-tagline-marker absolute bg-[var(--orange)] ${markerAtRight ? "right-0" : "left-0"}`}
        aria-hidden
        style={{
          bottom: "calc(100% + clamp(0.45rem, 1.1em, 1.25rem))",
          width: "clamp(48px, 4.3vw, 83px)",
          height: "clamp(10px, 0.68vw, 13px)",
          transformOrigin: markerAtRight ? "right center" : "left center",
        }}
      />
      <div style={{ fontFamily: "var(--font-inter)", fontSize: TAG_SIZE }}>
        {lines.map((line) => (
          <span key={line} style={{ display: "block", overflow: "hidden" }}>
            <span
              className={`blog-tagline-line ${lineClass}`}
              style={{ display: "inline-block" }}
            >
              {line}
            </span>
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
      const hero = rootRef.current;
      if (!hero) return;

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".hero-blog-wrap", { x: -40 }, { x: 0, duration: 1.1 })
        .fromTo(
          ".blog-hero-title",
          {
            scale: 1.18,
            opacity: 0,
            filter: "blur(14px)",
            transformOrigin: "left center",
          },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.25,
            stagger: 0.08,
          },
          "-=0.15",
        )
        .fromTo(
          ".blog-tagline-marker",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, stagger: 0.3, ease: "power2.inOut" },
          "-=0.85",
        )
        .fromTo(
          ".blog-tagline-line",
          { y: "108%" },
          { y: "0%", duration: 1.35, stagger: 0.15, ease: "power3.out" },
          "<0.12",
        )
        .fromTo(
          ".blog-hero-intro",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.85 },
          "-=0.9",
        );

      gsap.to(".hero-blog-wrap", {
        xPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
        },
      });
    },
    { scope: rootRef },
  );

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

        <div
          className="hero-blog-wrap pointer-events-none absolute inset-0 z-10"
          style={{ transform: `translateX(${BLEED_LEFT})` }}
        >
          <span
            className="blog-hero-title absolute m-0 whitespace-nowrap font-black uppercase text-[var(--orange)]"
            style={{
              ...titleStyle,
              top: pxTop(FIGMA.blog.y),
              left: pxLeft(FIGMA.blog.x),
            }}
          >
            blog
          </span>

          <span
            className="blog-hero-title absolute m-0 whitespace-nowrap font-black uppercase text-[var(--orange)]"
            style={{
              ...titleStyle,
              top: pxTop(FIGMA.amp.y),
              left: pxLeft(FIGMA.amp.x),
            }}
          >
            amp
          </span>
        </div>

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
