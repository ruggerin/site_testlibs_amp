"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { figmaClamp } from "@/lib/figma-scale";
import { SITE } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SIDE_PAD = "clamp(24px, 1.75vw, 36px)";

const QUOTE_SIZE = figmaClamp(92, { min: 28, max: 88, vw: 4.6 });
const BODY_SIZE = figmaClamp(38, { min: 15, max: 28, vw: 1.55 });
const CTA_SIZE = figmaClamp(28, { min: 12, max: 22, vw: 1.2 });

/** Cantoneiras laranja — Figma 2:1197 (~83×13px). */
function CreamCornerBrackets() {
  const bar = "absolute bg-[var(--orange)]";
  const inset = "clamp(20px, 2.2vw, 36px)";
  const w = "clamp(48px, 4.3vw, 83px)";
  const h = "clamp(10px, 0.68vw, 13px)";
  const leg = "clamp(48px, 4.3vw, 83px)";

  return (
    <div className="culb-brackets pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      <span className={bar} style={{ top: inset, left: inset, width: w, height: h }} />
      <span className={bar} style={{ top: inset, left: inset, width: h, height: leg }} />
      <span className={bar} style={{ bottom: inset, left: inset, width: w, height: h }} />
      <span className={bar} style={{ bottom: inset, left: inset, width: h, height: leg }} />
    </div>
  );
}

/** Figma 2:1196 — card 1860×636, stroke 3px + painel direito #232323. */
export default function CulturaBanner() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (reduced.matches) {
        gsap.set([".culb-brackets", ".culb-quote", ".culb-right", ".culb-cta"], {
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
        ".culb-brackets",
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          transformOrigin: "left center",
          scrollTrigger: trigger,
        },
      );

      gsap.fromTo(
        ".culb-quote",
        { y: 44, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.95,
          ease: "power3.out",
          delay: 0.08,
          scrollTrigger: trigger,
        },
      );

      gsap.fromTo(
        ".culb-right",
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.18,
          scrollTrigger: trigger,
        },
      );

      gsap.fromTo(
        ".culb-cta",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.65,
          ease: "back.out(1.35)",
          delay: 0.48,
          scrollTrigger: trigger,
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="w-full bg-[var(--cream)] py-10 md:py-14">
      <div className="w-full" style={{ paddingLeft: SIDE_PAD, paddingRight: SIDE_PAD }}>
        <div className="relative w-full overflow-hidden rounded-[35px] border-[3px] border-[#232323] bg-[var(--cream)] md:grid md:min-h-[clamp(300px,24vw,520px)] md:grid-cols-[minmax(0,52.7%)_minmax(280px,47.3%)]">
          <div className="relative flex min-w-0 flex-col justify-center p-6 md:p-8 lg:px-12 lg:py-14">
            <CreamCornerBrackets />
            <p
              className="culb-quote relative z-10 max-w-[850px] font-black uppercase leading-[1.01] tracking-[-0.04em] text-[#232323] will-change-[transform,opacity,filter]"
              style={{
                fontFamily: "var(--font-darker-grotesque)",
                fontSize: QUOTE_SIZE,
              }}
            >
              Na AMP, acreditamos que as melhores ideias nascem da pergunta &ldquo;E se...?&rdquo;
            </p>
          </div>

          <div className="culb-right relative z-10 flex min-w-0 flex-col justify-center gap-6 bg-[#232323] p-6 will-change-[transform,opacity] md:gap-8 md:rounded-r-[32px] md:p-8 lg:px-12 lg:py-14">
            <p
              className="font-semibold leading-[1.68] text-[#F7F7F7]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: BODY_SIZE,
              }}
            >
              Em vez de apenas pensarmos fora da caixa, construímos uma nova: aquela onde sua
              marca brilha enquanto a concorrência tenta entender o que aconteceu.
            </p>
            <a
              href={SITE.captureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="culb-cta inline-flex w-fit max-w-full items-center justify-center border-[3px] border-[var(--orange)] px-8 py-3 font-semibold uppercase tracking-[0.1em] text-[var(--orange)] transition-colors will-change-[transform,opacity] hover:bg-[var(--orange)] hover:text-white md:px-10 md:py-4"
              style={{ fontFamily: "var(--font-inter)", fontSize: CTA_SIZE }}
            >
              Cansei de ser médio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
