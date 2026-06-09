"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { figmaClamp } from "@/lib/figma-scale";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SIDE_PAD = "clamp(24px, 1.75vw, 36px)";

const HEADLINE_SIZE = figmaClamp(120, { min: 28, max: 96, vw: 5.4 });
const BODY_SIZE = figmaClamp(38, { min: 15, max: 30, vw: 1.65 });

/** Banner “Quando tudo isso se conecta” — Figma 2:1003 (~1866×587 @ margem 30px). */
export default function ServicosConnectBanner() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const trigger = {
        trigger: section,
        start: "top 82%",
        toggleActions: "play none none none",
      };

      gsap.fromTo(
        ".scb-headline-line",
        { yPercent: 100, opacity: 0, filter: "blur(6px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: trigger,
        },
      );

      gsap.fromTo(
        ".scb-body",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power2.out",
          delay: 0.35,
          scrollTrigger: trigger,
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="w-full overflow-visible bg-white py-10 md:py-14">
      <div className="w-full" style={{ paddingLeft: SIDE_PAD, paddingRight: SIDE_PAD }}>
        <div className="w-full rounded-[35px] border-[3px] border-[#232323]/15 md:grid md:min-h-[clamp(280px,22vw,520px)] md:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
          <div className="relative flex min-h-[240px] flex-col justify-center overflow-visible rounded-t-[32px] bg-[var(--cream)] p-6 md:min-h-0 md:rounded-l-[32px] md:rounded-tr-none md:p-8 lg:px-10 lg:py-12">
            <p
              className="font-black uppercase tracking-[-0.04em] text-[var(--orange)]"
              style={{
                fontFamily: "var(--font-darker-grotesque)",
                fontSize: HEADLINE_SIZE,
              }}
            >
              {(["Quando", "tudo", "isso se", "conecta"] as const).map((line, i) => (
                <span key={line} className="block overflow-hidden leading-[1.08]">
                  <span
                    className={`scb-headline-line block leading-[0.88] ${i === 2 ? "md:pl-[clamp(1.5rem,8vw,7rem)]" : ""}`}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </p>
          </div>

          <div className="box-border flex min-w-0 flex-col justify-center rounded-b-[32px] border-[3px] border-[var(--orange)] bg-[var(--cream)] p-6 md:rounded-bl-none md:rounded-r-[32px] md:border-l-0 md:p-8 lg:px-10 lg:py-12">
            <p
              className="scb-body font-semibold leading-[1.45] text-[#232323]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: BODY_SIZE,
              }}
            >
              o marketing deixa de ser uma soma de entregas e passa a operar como um sistema.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
