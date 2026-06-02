"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { CaseStudy } from "@/data/cases";
import { figmaClamp } from "@/lib/figma-scale";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Figma sec1 — grupo 1867×1341 @ x:28 (padding ~1,46vw). */
const SIDE_PAD = "clamp(20px, 1.46vw, 28px)";

const CAMPAIGN_SIZE = figmaClamp(90, { min: 32, max: 90, vw: 4.7 });
const NARRATIVE_SIZE = figmaClamp(28, { min: 15, max: 28, vw: 1.45 });
const CARD_LABEL_SIZE = figmaClamp(90, { min: 28, max: 90, vw: 4.7 });
const CARD_BODY_SIZE = figmaClamp(28, { min: 14, max: 28, vw: 1.45 });

const PILLARS = [
  { key: "objective" as const, label: "Objetivo" },
  { key: "challenge" as const, label: "impacto" },
  { key: "result" as const, label: "resultado" },
];

/** sec1 — Figma 2:720 (fundo cream, largura total, título + narrativa + 3 caixas). */
export default function CaseDetailContent({ item }: { item: CaseStudy }) {
  const sectionRef = useRef<HTMLElement>(null);
  const paragraphs = item.narrative.split(/\n\n+/).filter(Boolean);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const trigger = {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      };

      // ── Título da campanha: sobe + desfoca ───────────────────────────────
      gsap.fromTo(
        ".cdc-campaign",
        { y: 56, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.0, ease: "power3.out", scrollTrigger: trigger },
      );

      // ── Parágrafos da narrativa: stagger slide up ─────────────────────────
      gsap.fromTo(
        ".cdc-para",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power2.out",
          stagger: 0.12,
          delay: 0.2,
          scrollTrigger: trigger,
        },
      );

      // ── Cards pilares: stagger slide up ──────────────────────────────────
      gsap.fromTo(
        ".cdc-pillar",
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.13,
          scrollTrigger: {
            trigger: ".cdc-pillars-grid",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="w-full bg-[var(--cream)] py-12 md:py-16 lg:py-20">
      <div className="w-full" style={{ paddingLeft: SIDE_PAD, paddingRight: SIDE_PAD }}>
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,27.5%)_minmax(0,1fr)] lg:gap-x-[clamp(24px,8.3vw,159px)] lg:gap-y-14">
          <h1
            className="cdc-campaign font-black uppercase leading-[0.83] tracking-[-0.05em] text-[var(--orange)]"
            style={{
              fontFamily: "var(--font-darker-grotesque)",
              fontSize: CAMPAIGN_SIZE,
            }}
          >
            {item.campaign}
          </h1>

          <div
            className="min-w-0 space-y-6 text-[#232323] lg:max-w-[1192px] lg:justify-self-end lg:pt-0"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: NARRATIVE_SIZE,
              lineHeight: 2.214,
            }}
          >
            {paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="cdc-para">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="cdc-pillars-grid mt-12 grid w-full grid-cols-1 gap-[clamp(16px,1.5vw,29px)] md:grid-cols-3 lg:mt-16">
          {PILLARS.map(({ key, label }) => (
            <div
              key={key}
              className="cdc-pillar min-w-0 border-[3px] border-[var(--orange)] bg-[var(--cream)] p-8 md:min-h-[280px] md:p-10 lg:min-h-[320px]"
            >
              <h2
                className="mb-6 font-bold uppercase leading-[0.73] tracking-[-0.05em] text-[var(--orange)]"
                style={{
                  fontFamily: "var(--font-darker-grotesque)",
                  fontSize: CARD_LABEL_SIZE,
                }}
              >
                {label}
              </h2>
              <p
                className="text-[#232323]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: CARD_BODY_SIZE,
                  lineHeight: 1.786,
                  letterSpacing: "-0.03em",
                }}
              >
                {item[key]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
