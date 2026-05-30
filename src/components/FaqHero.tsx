"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { figmaClamp } from "@/lib/figma-scale";

const ARTBOARD_W = 1920;

const TITLE_SIZE = figmaClamp(386, {
  min: 72,
  max: 386,
  vw: (386 / ARTBOARD_W) * 100,
});

const TAG_SIZE = figmaClamp(52, {
  min: 16,
  max: 52,
  vw: (52 / ARTBOARD_W) * 100,
});

const BLEED_LEFT = "-2.5vw";

export default function FaqHero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".faq-hero-title",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, immediateRender: false }
        )
        .fromTo(
          ".faq-hero-tag",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75, immediateRender: false },
          "-=0.55"
        );
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="faq-hero-copy relative z-10 min-w-0 overflow-visible">
      <h1
        className="faq-hero-title m-0 block font-black uppercase text-[var(--cream)] opacity-100"
        style={{
          fontFamily: "var(--font-darker-grotesque)",
          fontSize: TITLE_SIZE,
          lineHeight: 0.241,
          letterSpacing: "-0.09em",
          transform: `translateX(${BLEED_LEFT})`,
          paddingBottom: "clamp(1.25rem, 9vw, 6rem)",
        }}
      >
        faq
      </h1>

      <div
        className="faq-hero-tag max-w-[293px] opacity-100"
        style={{ marginTop: "clamp(2rem, 10vw, 7.5rem)" }}
      >
        <div className="flex flex-col items-start gap-3">
          <span
            className="shrink-0 bg-[var(--ink)]"
            aria-hidden
            style={{
              width: "clamp(64px, 5.4vw, 103px)",
              height: "clamp(10px, 0.68vw, 13px)",
            }}
          />
          <p
            className="m-0 font-black uppercase leading-[0.79] text-[var(--cream)]"
            style={{
              fontFamily: "var(--font-darker-grotesque)",
              fontSize: TAG_SIZE,
            }}
          >
            perguntas frequentes
          </p>
        </div>
      </div>
    </div>
  );
}
