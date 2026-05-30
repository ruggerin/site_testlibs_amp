"use client";

import Image from "next/image";
import { figmaAspect, figmaClamp } from "@/lib/figma-scale";

const MAP_SRC = "/assets/quem_somos/mapa_norte1.svg";

/** Figma 1:108 — coluna esquerda 683 / 1910. */
const LEFT_COL_FR = 683;
const ARTBOARD_W = 1910;

const STATES = ["acre", "amapá", "amazonas", "pará", "rondônia", "roraima"] as const;
const ACTIVE_STATE = "amazonas";

const TITLE_SIZE = figmaClamp(250, { min: 40, max: 180, vw: 8.5 });

const BODY_STYLE = {
  fontFamily: "var(--font-inter)",
  fontSize: figmaClamp(28, { min: 14, max: 28, vw: 1.46 }),
  lineHeight: 1.79,
} as const;

const STATE_FONT = figmaClamp(28, { min: 12, max: 28, vw: 1.35 });
const STATE_ROW_H = "min-h-[clamp(40px,3.2vw,56px)]";

const EDGE_PAD = "px-5 sm:px-8 md:px-16";

function StatesMenu({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`states-list grid w-full max-w-[633px] grid-cols-2 gap-x-[clamp(8px,0.8vw,14px)] gap-y-[clamp(6px,0.6vw,10px)] ${className}`}
    >
      {STATES.map((state) => {
        const isActive = state === ACTIVE_STATE;
        return (
          <li key={state} className="min-w-0">
            <div
              className={`state-item flex ${STATE_ROW_H} w-full items-center gap-2 border-2 border-[var(--orange)] px-[clamp(12px,1.2vw,22px)] ${
                isActive ? "bg-[var(--orange)]" : "bg-transparent"
              }`}
            >
              {isActive ? (
                <span className="size-2 shrink-0 rounded-full bg-[var(--cream)]" aria-hidden />
              ) : (
                <span className="size-2 shrink-0" aria-hidden />
              )}
              <span
                className={`font-medium lowercase ${isActive ? "text-[#232332]" : "text-[var(--cream)]"}`}
                style={{ fontFamily: "var(--font-inter)", fontSize: STATE_FONT }}
              >
                {state}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function CopyBlock({ className = "" }: { className?: string }) {
  return (
    <p
      className={`estamos-text max-w-[min(100%,595px)] font-medium text-[var(--cream)] ${className}`}
      style={BODY_STYLE}
    >
      Presença estratégica com alcance nacional.
      <br />
      <br />
      Para quem pensa grande, o Brasil é logo ali e, com a AMP, o destino é sempre o topo.
    </p>
  );
}

function TitleBlock() {
  return (
    <h2
      className="estamos-title max-w-full font-black uppercase leading-[0.65] tracking-[-0.06em] text-[var(--cream)]"
      style={{
        fontFamily: "var(--font-darker-grotesque)",
        fontSize: TITLE_SIZE,
      }}
    >
      <span className="block">ESTAMOS</span>
      <span className="block">AQUI</span>
    </h2>
  );
}

export default function EstamosAquiSection() {
  return (
    <section
      data-section
      className="estamos-aqui relative w-full max-w-[100vw] overflow-x-clip bg-[#232323] py-12 md:py-16 lg:py-0 lg:pb-16"
    >
      {/* Mobile / tablet */}
      <div className={`flex min-w-0 flex-col gap-10 lg:hidden ${EDGE_PAD} py-12 md:py-16`}>
        <TitleBlock />
        <CopyBlock />
        <StatesMenu />
        <div className="mt-6 min-w-0 overflow-hidden md:mt-8">
          <Image
            src={MAP_SRC}
            alt="Mapa da região Norte do Brasil"
            width={1227}
            height={829}
            className="map-svg h-auto w-full max-w-full"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Desktop — largura total; mapa até a borda direita */}
      <div
        className="hidden min-w-0 w-full lg:grid lg:items-start"
        style={{
          gridTemplateColumns: `minmax(0, ${(LEFT_COL_FR / ARTBOARD_W) * 100}%) minmax(0, 1fr)`,
        }}
      >
        <div
          className={`flex min-w-0 flex-col gap-[clamp(1rem,2vw,2rem)] ${EDGE_PAD} pb-12 pt-14 lg:pt-20 lg:pr-6 xl:pr-10`}
        >
          <TitleBlock />
          <CopyBlock />
          <StatesMenu />
        </div>

        <div className="relative flex min-h-0 min-w-0 items-start justify-end overflow-hidden pt-12 lg:mt-4 xl:mt-8">
          <Image
            src={MAP_SRC}
            alt="Mapa da região Norte do Brasil"
            width={1227}
            height={829}
            className="map-svg h-auto w-full max-w-none object-contain object-right"
            style={{
              aspectRatio: figmaAspect(1227, 829),
              maxHeight: "min(78vh, 829px)",
            }}
            sizes="65vw"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
