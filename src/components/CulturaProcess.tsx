"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FRAME } from "@/lib/site";
import { figmaAspect, figmaClamp } from "@/lib/figma-scale";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Infográfico Figma 2:1055 — artboard 1510×2502. */
const INFO_W = 1510;
const INFO_H = 2502;
const ELLIPSE = 185;
const ICON = 114;

const pctX = (x: number) => `${(x / INFO_W) * 100}%`;
const pctY = (y: number) => `${(y / INFO_H) * 100}%`;
const pctW = (w: number) => `${(w / INFO_W) * 100}%`;

/** Tamanho da elipse no infográfico — % do artboard + mínimo para não colapsar (Figma 185px). */
const ellipseSize = (px: number) =>
  `clamp(${Math.round(px * 0.72)}px, ${pctW(px)}, ${px}px)`;

const ELLIPSE_SIZE = ellipseSize(ELLIPSE);
const ICON_SIZE = `clamp(${Math.round(ICON * 0.72)}px, ${pctW(ICON)}, ${ICON}px)`;
const LINE_WIDTH = `clamp(6px, ${pctW(8)}, 8px)`;

export type CulturaStep = {
  number: number;
  title: string;
  description: string;
  icon: string;
  placement: {
    top: string;
    left?: string;
    right?: string;
    width: string;
    titleAlign: "left" | "right" | "center";
  };
};

const DEFAULT_STEPS: CulturaStep[] = [
  {
    number: 1,
    title: "Imersão",
    icon: "/assets/nossa_cultura/icones/item_1.png",
    description:
      "Antes de qualquer plano, a gente entende: negócio, mercado, momento e histórico. Uma estratégia consistente não pode ser construída no raso. É aqui que as peças começam a fazer sentido.",
    placement: {
      top: pctY(116),
      left: pctX(798),
      width: pctW(712),
      titleAlign: "left",
    },
  },
  {
    number: 2,
    title: "Estratégia Unificada",
    icon: "/assets/nossa_cultura/icones/item_2.png",
    description:
      "Com o cenário claro, organizamos os caminhos. Canais, mensagens, prioridades, tudo pensado de forma integrada, com cada frente cumprindo um papel dentro do mesmo objetivo. Planejar separado é o começo do problema.",
    placement: {
      top: pctY(669),
      left: pctX(0),
      width: pctW(690),
      titleAlign: "right",
    },
  },
  {
    number: 3,
    title: "Execução Criativa",
    icon: "/assets/nossa_cultura/icones/item_3.png",
    description:
      "A estratégia ganha forma. Campanhas, peças, conteúdos e experiências começam a rodar com consistência e alinhamento. A criatividade se torna a direção.",
    placement: {
      top: pctY(1305),
      left: pctX(798),
      width: pctW(620),
      titleAlign: "left",
    },
  },
  {
    number: 4,
    title: "Análise e Evolução",
    icon: "/assets/nossa_cultura/icones/item_4.png",
    description:
      "Acompanhamos, interpretamos e ajustamos. O que funciona escala. O que não funciona ensina e muda. Dado, sem leitura, não leva ninguém a lugar nenhum.",
    placement: {
      top: pctY(1882),
      left: pctX(31),
      width: pctW(660),
      titleAlign: "right",
    },
  },
];

/** Elipses + ícones — Figma Ellipse 2–5 @ 185px; ícone 114px centrado (+36px). */
const PROCESS_NODES = [
  { left: 505, top: 159 },
  { left: 798, top: 778 },
  { left: 505, top: 1415 },
  { left: 798, top: 1990 },
] as const;

/** Linha vertical Rectangle 20 — x:751, 8×2502. */
const PROCESS_LINE_LEFT = pctX(751);

/** Chamada sec1 — Figma 2:1167: uma faixa laranja por linha (larguras 2:1162–1166). */
const SEC1_QUOTE_MAX_W = 579;
const SEC1_QUOTE_FONT = figmaClamp(52, { min: 22, max: 52, vw: 2.7 });
const SEC1_QUOTE_LINES = [
  { text: "Ele precisa de direção,", barW: 383 },
  { text: "processo e, principalmente,", barW: 546 },
  { text: "de uma leitura", barW: 512 },
  { text: "completa do", barW: 579 },
  { text: "negócio.", barW: 323 },
] as const;

function sec1BarWidth(px: number) {
  return figmaClamp(px, {
    min: Math.round(px * 0.55),
    max: px,
    vw: (px / 1920) * 100,
  });
}

function StepNumber({ n }: { n: number }) {
  const fontSize = figmaClamp(190, { min: 64, max: 190, vw: 9.9 });

  return (
    <span
      className="relative inline-flex items-end"
      style={{
        fontFamily: "var(--font-darker-grotesque)",
        fontSize,
        lineHeight: 0.85,
      }}
      aria-label={`0${n}`}
    >
      <span className="relative inline-block">
        {/* O laranja — atrás, levemente acima (Figma 2:1077) */}
        <span
          className="absolute left-0 font-bold text-[var(--orange)]"
          style={{ top: "-0.14em", lineHeight: 0.85 }}
          aria-hidden
        >
          O
        </span>
        <span
          className="relative z-10 pl-[0.34em] font-bold text-black"
          style={{ lineHeight: 0.85 }}
          aria-hidden
        >
          {n}
        </span>
      </span>
      {/* “.” = quadrado laranja */}
      <span
        className="mb-[0.2em] ml-[0.06em] shrink-0 bg-[var(--orange)]"
        style={{ width: "0.074em", height: "0.074em", minWidth: 8, minHeight: 8 }}
        aria-hidden
      />
    </span>
  );
}

function StepBlock({ step }: { step: CulturaStep }) {
  const { placement } = step;
  return (
    <article
      className={`process-step-${step.number} absolute flex flex-col gap-3`}
      style={{
        top: placement.top,
        left: placement.left,
        right: placement.right,
        width: placement.width,
        textAlign: placement.titleAlign,
      }}
    >
      <div className={placement.titleAlign === "right" ? "ml-auto" : placement.titleAlign === "left" ? "mr-auto" : "mx-auto"}>
        <StepNumber n={step.number} />
      </div>
      <h3
        className="font-bold uppercase leading-[0.73] tracking-[-0.05em] text-black"
        style={{
          fontFamily: "var(--font-darker-grotesque)",
          fontSize: figmaClamp(90, { min: 32, max: 90, vw: 4.7 }),
        }}
      >
        {step.title}
      </h3>
      <p
        className="text-[#232323]"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: figmaClamp(28, { min: 14, max: 28, vw: 1.45 }),
          lineHeight: 1.79,
          letterSpacing: "-0.03em",
        }}
      >
        {step.description}
      </p>
    </article>
  );
}

export default function CulturaProcess({ steps = DEFAULT_STEPS }: { steps?: CulturaStep[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // ── Linha laranja: cresce de cima para baixo com scrub ─────────────────
    gsap.fromTo(".process-line",
      { scaleY: 0, transformOrigin: "top center" },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".process-infographic",
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1.2,
        },
      }
    );

    // ── Ícones: pop-in com bounce quando entram na viewport ────────────────
    PROCESS_NODES.forEach((_, i) => {
      gsap.fromTo(`.process-node-${i}`,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 0.7,
          ease: "back.out(1.8)",
          scrollTrigger: {
            trigger: `.process-node-${i}`,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // ── Steps: deslizam da lateral correspondente ─────────────────────────
    steps.forEach((step) => {
      const fromX = step.placement.titleAlign === "right" ? -60 : 60;
      gsap.fromTo(`.process-step-${step.number}`,
        { opacity: 0, x: fromX },
        {
          opacity: 1, x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.process-step-${step.number}`,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // ── Mobile: stagger fade-up ────────────────────────────────────────────
    gsap.fromTo(".process-mobile-item",
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".process-mobile-list",
          start: "top 82%",
          toggleActions: "play none none none",
        },
      }
    );

    // ── Texto de fechamento ────────────────────────────────────────────────
    gsap.fromTo(".process-closing-text",
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".process-closing-text",
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative overflow-x-clip overflow-y-visible bg-[var(--cream)] py-12 md:py-20">
      <div className={`${FRAME} px-5 sm:px-8 md:px-16`}>

        {/* Desktop — infográfico posicionado em %  */}
        <div
          className="process-infographic relative mx-auto hidden w-full max-w-[1510px] lg:block"
          style={{ aspectRatio: figmaAspect(INFO_W, INFO_H) }}
        >
          {/* Linha central — Rectangle 20: 8×2502 @ x:751 */}
          <div
            className="process-line absolute top-0 rounded-[4px] bg-[var(--orange)]"
            style={{ left: PROCESS_LINE_LEFT, width: LINE_WIDTH, height: "100%", transform: "scaleY(0)", transformOrigin: "top center" }}
            aria-hidden
          />

          {/* Bolinhas + ícones — Ellipse 2–5: 185×185; ícone 114px centrado (+36px) */}
          {PROCESS_NODES.map((node, i) => (
            <div
              key={steps[i]?.number ?? i}
              className={`process-node-${i} absolute flex items-center justify-center rounded-full bg-[var(--orange)]`}
              style={{
                left: pctX(node.left),
                top: pctY(node.top),
                width: ELLIPSE_SIZE,
                aspectRatio: "1",
              }}
            >
              <Image
                src={steps[i]?.icon ?? DEFAULT_STEPS[i].icon}
                alt=""
                width={ICON}
                height={ICON}
                className="object-contain"
                style={{ width: ICON_SIZE, height: ICON_SIZE }}
              />
            </div>
          ))}

          {steps.map((step) => (
            <StepBlock key={step.number} step={step} />
          ))}
        </div>

        {/* Mobile / tablet */}
        <div className="process-mobile-list flex flex-col gap-12 lg:hidden">
          {steps.map((step) => (
            <div key={step.number} className="process-mobile-item flex gap-5">
              <div
                className="flex shrink-0 items-center justify-center rounded-full bg-[var(--orange)]"
                style={{ width: ellipseSize(120), aspectRatio: "1" }}
              >
                <Image
                  src={step.icon}
                  alt=""
                  width={ICON}
                  height={ICON}
                  className="object-contain"
                  style={{ width: ellipseSize(68), height: ellipseSize(68) }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <StepNumber n={step.number} />
                <h3
                  className="mt-2 font-bold uppercase leading-[0.88] tracking-[-0.04em] text-black"
                  style={{
                    fontFamily: "var(--font-darker-grotesque)",
                    fontSize: figmaClamp(90, { min: 36, max: 64, vw: 8 }),
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-3 text-[#232323]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: figmaClamp(28, { min: 15, max: 22, vw: 4 }),
                    lineHeight: 1.79,
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p
          className="process-closing-text mx-auto mt-16 max-w-[722px] uppercase leading-normal text-[#232323] md:mt-24 lg:mt-28"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: figmaClamp(32, { min: 15, max: 32, vw: 1.65 }),
            fontWeight: 500,
          }}
        >
          É um ciclo contínuo, onde cada fase alimenta a próxima e refina a anterior.
        </p>
      </div>
    </section>
  );
}

export function CulturaSec1Quote() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const trigger = { trigger: ref.current, start: "top 82%", toggleActions: "play none none none" };

    // Barras: crescem da esquerda em cascata
    gsap.fromTo(".quote-bar",
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.65, ease: "power3.out", stagger: 0.09, scrollTrigger: trigger }
    );

    // Texto dentro das barras: sobe do overflow hidden, levemente atrasado
    gsap.fromTo(".quote-bar-text",
      { y: "110%" },
      { y: "0%", duration: 0.7, ease: "power3.out", stagger: 0.09, scrollTrigger: trigger,
        delay: 0.1 }
    );
  }, { scope: ref });

  return (
    <div
      ref={ref}
      className="w-full max-w-[579px] pl-[clamp(6px,0.57vw,11px)]"
      role="group"
      aria-label="Ele precisa de direção, processo e, principalmente, de uma leitura completa do negócio."
    >
      <div className="flex flex-col items-start">
        {SEC1_QUOTE_LINES.map((line, i) => (
          <span
            key={line.text}
            className={`quote-bar box-border inline-block overflow-hidden bg-[var(--orange)] px-[0.2em] py-[0.14em] font-black uppercase text-[#232323] ${
              i > 0 ? "-mt-[0.14em]" : ""
            }`}
            style={{
              fontFamily: "var(--font-darker-grotesque)",
              fontSize: SEC1_QUOTE_FONT,
              lineHeight: 0.8846153846153846,
              letterSpacing: "-0.04em",
            }}
          >
            <span className="quote-bar-text" style={{ display: "block" }}>{line.text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
