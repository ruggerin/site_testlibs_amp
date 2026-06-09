"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { figmaClamp } from "@/lib/figma-scale";
import { SITE } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ChampionBannerProps = {
  sectionClassName?: string;
  cardClassName?: string;
  padStyle?: CSSProperties;
  /** Escala tipográfica — /cases usa ~0.79 (grid 90%). */
  typeScale?: number;
};

/** Banner CTA “campeão” — Figma 2:857 / 2:580. */
export default function ChampionBanner({
  sectionClassName = "w-full bg-white pb-12 pt-4 md:pb-16 md:pt-6",
  cardClassName = "w-full overflow-hidden rounded-[28px] bg-[#232323] md:grid md:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] md:min-h-[clamp(300px,24vw,520px)]",
  padStyle,
  typeScale = 1,
}: ChampionBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const S = typeScale;
  const TITLE_SIZE = figmaClamp(138 * S, { min: 28, max: 96, vw: 5.2 * S });
  const BODY_SIZE = figmaClamp(38 * S, { min: 14, max: 28, vw: 1.55 * S });
  const CTA_SIZE = figmaClamp(28 * S, { min: 12, max: 22, vw: 1.2 * S });

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (reduced.matches) {
        gsap.set([".ccb-title", ".ccb-right", ".ccb-cta"], {
          clearProps: "all",
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        });
        return;
      }

      const trigger = {
        trigger: section,
        start: "top 82%",
        toggleActions: "play none none none",
      };

      gsap.fromTo(
        ".ccb-title",
        { y: 48, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: trigger,
        },
      );

      gsap.fromTo(
        ".ccb-right",
        { x: 36, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.12,
          scrollTrigger: trigger,
        },
      );

      gsap.fromTo(
        ".ccb-cta",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.65,
          ease: "back.out(1.35)",
          delay: 0.45,
          scrollTrigger: trigger,
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={sectionClassName}>
      <div className="w-full" style={padStyle}>
        <div className={cardClassName}>
          <div className="flex min-w-0 flex-col justify-center p-6 md:p-8 lg:px-10 lg:py-12">
            <p
              className="ccb-title max-w-[977px] font-black uppercase leading-[0.87] tracking-[-0.04em] text-[#F7F7F7] will-change-[transform,opacity,filter]"
              style={{
                fontFamily: "var(--font-darker-grotesque)",
                fontSize: TITLE_SIZE,
              }}
            >
              Chega de ser &ldquo;legalzinho&rdquo;. Seja o campeão do seu jogo.
            </p>
          </div>
          <div className="ccb-right flex min-w-0 flex-col justify-center gap-6 p-6 will-change-[transform,opacity] md:gap-8 md:p-8 lg:px-10 lg:py-12">
            <p
              className="max-w-[587px] font-semibold leading-[1.68] text-[#F7F7F7] md:max-w-none"
              style={{ fontFamily: "var(--font-inter)", fontSize: BODY_SIZE }}
            >
              Na AMP, somos obcecados por performance, resultados e em transformar sua
              marca em uma referência de sucesso.
            </p>
            <a
              href={SITE.captureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ccb-cta inline-flex w-fit max-w-full items-center justify-center border-[3px] border-[#F7F7F7] px-8 py-3 font-semibold uppercase tracking-[0.1em] text-white transition-colors will-change-[transform,opacity] hover:bg-[#F7F7F7] hover:text-[#232323] md:px-9 md:py-3.5"
              style={{ fontFamily: "var(--font-inter)", fontSize: CTA_SIZE }}
            >
              quero ser o campeão
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
