"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FRAME } from "@/lib/site";
import { figmaClamp } from "@/lib/figma-scale";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ARTBOARD_W = 1920;
const TITLE_PX = 465;

const TITLE_SIZE = figmaClamp(TITLE_PX, { min: 180, max: TITLE_PX, vw: (TITLE_PX / ARTBOARD_W) * 100 });

/** Slot da "U" — Rectangle 17: 425×732 @ fonte 465px. */
const U_WIDTH_EM = 425 / TITLE_PX;

/** Sangria proporcional — espelho de /quem-somos (SOMOS −2vw, QUEM +2vw). */
const BLEED_LEFT = "-2vw";
const BLEED_RIGHT = "2vw";

/** Referência onde CULTURA @ 65% está ok; acima disso sobe até ~59% @ 1920+. */
const REF_VIEWPORT_W = 1366;
const CULTURA_TOP_LIFT = `max(0px, (100vw - ${REF_VIEWPORT_W}px) * ${46 / (1920 - REF_VIEWPORT_W)})`;
const CULTURA_TOP = `calc(55% - ${CULTURA_TOP_LIFT})`;
/** Tagline inferior — acompanha o bloco CULTURA. */
const TAG2_OFFSET = `calc(65svh - ${CULTURA_TOP_LIFT} + 10.5vw)`;

/**
 * Tagline 2 — proporcional ao artboard 1920 (~37px @ 1366, 52px @ 1920).
 * Igual à tagline superior; 2 linhas fixas evitam quebra extra em telas grandes.
 */
const TAG2_FONT_SIZE = figmaClamp(52, {
  min: 18,
  max: 52,
  vw: (52 / ARTBOARD_W) * 100,
});

const titleStyle = {
  fontFamily: "var(--font-darker-grotesque)",
  fontSize: TITLE_SIZE,
  lineHeight: 0.78,
  letterSpacing: "-0.04em",
} as const;

type TaglineProps = {
  text: string;
  align: "left" | "right";
  className?: string;
  style?: CSSProperties;
};

function CulturaTagline({ text, align, className = "", style }: TaglineProps) {
  const lines = text.split("\n");
  return (
    <div
      className={`cultura-tagline flex max-w-[min(100%,28rem)] flex-col gap-3 ${className}`}
      style={style}
    >
      <span
        className={`cultura-tagline-marker h-[14px] w-10 shrink-0 bg-[#232323] ${align === "right" ? "ml-auto" : ""}`}
        aria-hidden
        style={{ transformOrigin: "left center" }}
      />
      <div
        className={`font-semibold uppercase leading-[1.15] text-[var(--cream)] ${align === "right" ? "text-right" : "text-left"}`}
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: figmaClamp(52, { min: 18, max: 52, vw: 2.7 }),
        }}
      >
        {lines.map((line, i) => (
          <span key={i} style={{ display: "block", overflow: "hidden" }}>
            <span className="cultura-tagline-line" style={{ display: "inline-block" }}>{line}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Tagline inferior — 2 linhas fixas (ref. 1366): não quebra antes do "acontece". */
function CulturaTaglineMarketing({ className = "" }: { className?: string }) {
  const lineClass =
    "block font-semibold uppercase leading-[1.15] text-[var(--cream)] text-left";

  return (
    <div
      className={`cultura-tagline cultura-tagline--marketing flex w-full flex-col gap-3 md:ml-[48%] md:w-max ${className}`}
      aria-label="Marketing integrado não acontece por acaso."
    >
      <span
        className="cultura-tagline-marker h-[14px] w-10 shrink-0 bg-[#232323]"
        aria-hidden
        style={{ transformOrigin: "left center" }}
      />
      <div
        className="flex flex-col"
        style={{ fontFamily: "var(--font-inter)", fontSize: TAG2_FONT_SIZE }}
      >
        <span style={{ display: "block", overflow: "hidden" }}>
          <span className={`cultura-tagline-line md:whitespace-nowrap ${lineClass}`} style={{ display: "inline-block" }}>
            Marketing integrado não
          </span>
        </span>
        <span style={{ display: "block", overflow: "hidden" }}>
          <span className={`cultura-tagline-line ${lineClass}`} style={{ display: "inline-block" }}>
            acontece por acaso.
          </span>
        </span>
      </div>
    </div>
  );
}

/** Hero /nossa-cultura — NOSSA à direita (espelho QUEM); CULTURA à esquerda (espelho SOMOS). */
export default function CulturaHero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // ── Entrada ────────────────────────────────────────────────────────────
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .fromTo(".hero-nossa-wrap",
        { x: 48 },
        { x: 0, duration: 1.1 })
      .fromTo(".hero-nossa",
        { scale: 1.24, opacity: 0, filter: "blur(18px)", transformOrigin: "right center" },
        { scale: 1,    opacity: 1, filter: "blur(0px)",  duration: 1.5 }, "-=0.2")
      .fromTo(".hero-cultura-wrap",
        { x: -48 },
        { x: 0, duration: 1.1 }, "-=1.15")
      .fromTo(".hero-cultura",
        { scale: 1.28, opacity: 0, filter: "blur(18px)", transformOrigin: "left center" },
        { scale: 1,    opacity: 1, filter: "blur(0px)",  duration: 1.5 }, "-=1.2")
      // taglines — mesmo efeito das taglines do hero Quem Somos
      .fromTo(".cultura-tagline-marker",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, stagger: 0.35, ease: "power2.inOut" }, "-=0.5")
      .fromTo(".cultura-tagline-line",
        { y: "108%" },
        { y: "0%", duration: 1.5, stagger: 0.2, ease: "power3.out" }, "<0.18");

    // ── Parallax no scroll ─────────────────────────────────────────────────
    const trigger = { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 0.9 };

    // títulos: movimento horizontal oposto
    gsap.to(".hero-nossa-wrap",    { xPercent:  22, ease: "none", scrollTrigger: trigger });
    gsap.to(".hero-cultura-wrap",  { xPercent: -22, ease: "none", scrollTrigger: trigger });

    // taglines: drift leve na direção oposta aos títulos para criar profundidade
    gsap.to(".cultura-tagline--visao",     { xPercent:  8, ease: "none", scrollTrigger: trigger });
    gsap.to(".cultura-tagline--marketing", { xPercent: -8, ease: "none", scrollTrigger: trigger });

  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="relative overflow-visible bg-[var(--orange)]">
      <div className="pointer-events-none absolute inset-0 min-h-full" aria-hidden>
        <Image
          src="/nossa-cultura/hero-bg.svg"
          alt=""
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      <div className="relative z-10 w-full overflow-visible">
        {/* Viewport principal — títulos + tagline superior */}
        <div className="relative min-h-[145svh] overflow-visible">

          {/* NOSSA — direita, sangra pela borda direita (espelho QUEM) */}
          <div
            className="hero-nossa-wrap pointer-events-none absolute right-0 z-20 flex justify-end will-change-transform"
            style={{ top: "calc(10% - 5vw)" }}
          >
            <p
              className="hero-nossa font-black uppercase text-[#232323] whitespace-nowrap"
              style={{ ...titleStyle, transform: `translateX(${BLEED_RIGHT})` }}
            >
              nossa
            </p>
          </div>

          {/* CULTURA — centro vertical, sangra pela borda esquerda (espelho SOMOS) */}
          <div
            className="hero-cultura-wrap pointer-events-none absolute inset-x-0 z-10 flex -translate-y-1/2 items-center overflow-visible will-change-transform"
            style={{ top: CULTURA_TOP }}
          >
            <h1
              aria-label="nossa cultura"
              className="hero-cultura flex items-start font-black uppercase whitespace-nowrap text-[#232323]"
              style={{
                ...titleStyle,
                display: "inline-flex",
                transform: `translateX(${BLEED_LEFT})`,
              }}
            >
              <span aria-hidden>c</span>
              {/* "U" substituído por imagem — width=U_WIDTH_EM, height proporcional 425:732 do Figma */}
              <span
                aria-hidden
                style={{
                  display: "inline-block",
                  width: `${U_WIDTH_EM}em`,
                  height: `calc(${U_WIDTH_EM}em * ${732 / 425})`,
                  position: "relative",
                  flexShrink: 0,
                  overflow: "visible",
                  marginTop: 0,
                  transform: `translateX(${(280 - 283) / TITLE_PX}em)`,
                }}
              >
                <span
                  className="cultura-u-img"
                  style={{
                    position: "absolute",
                    inset: 0,
                    top: "0.210em",
                    overflow: "hidden",
                    display: "block",
                    backgroundColor: "var(--cream)",
                    boxShadow: "0 0 40px rgba(35,35,35,0.15)",
                  }}
                >
                  <Image
                    src="/assets/nossa_cultura/DSC04583.TOPO%20PAGINA.jpeg"
                    alt=""
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center 20%" }}
                    sizes="(max-width: 768px) 22vw, 22vw"
                    priority
                  />
                </span>
              </span>
              <span
                aria-hidden
                style={{ transform: `translateX(${(689 - 705) / TITLE_PX}em)` }}
              >
                ltura
              </span>
            </h1>
          </div>

          {/* Tagline superior — "Visão holística é método." */}
          <div className={`${FRAME} pointer-events-none absolute inset-x-0 inset-y-0 px-5 sm:px-8 md:px-16`}>
            <CulturaTagline
              text="Visão holística é método."
              align="right"
              className="cultura-tagline--visao absolute left-0 right-0 top-[11%] mx-auto max-w-[min(100%,28rem)] px-5 sm:px-8 md:left-[3%] md:right-auto md:mx-0 md:max-w-[25.1%] md:px-0"
            />
          </div>

          {/* Tagline inferior — "Marketing integrado não acontece por acaso." */}
          <div
            className={`${FRAME} relative px-5 sm:px-8 md:px-16`}
            style={{ paddingTop: TAG2_OFFSET, paddingBottom: "220px" }}
          >
            <CulturaTaglineMarketing className="cultura-tagline--marketing" />
          </div>
        </div>
      </div>
    </section>
  );
}
