"use client";

import { useCallback, useState } from "react";
import { figmaAspect, figmaClamp } from "@/lib/figma-scale";
import NorteBrasilMap, { type NorteStateId } from "@/components/NorteBrasilMap";

/** Figma 1:108 — coluna esquerda 683 / 1910. */
const LEFT_COL_FR = 683;
const ARTBOARD_W = 1910;

const STATES = ["amazonas", "acre", "amapá", "pará", "rondônia", "roraima"] as const;
const DEFAULT_STATE: NorteStateId = "amazonas";

const TITLE_SIZE = figmaClamp(250, { min: 40, max: 180, vw: 8.5 });

const BODY_STYLE = {
  fontFamily: "var(--font-inter)",
  fontSize: figmaClamp(28, { min: 14, max: 28, vw: 1.46 }),
  lineHeight: 1.79,
} as const;

const STATE_FONT = figmaClamp(28, { min: 12, max: 28, vw: 1.35 });
const STATE_ROW_H = "min-h-[clamp(40px,3.2vw,56px)]";

const EDGE_PAD = "px-5 sm:px-8 md:px-16";

type StatesMenuProps = {
  highlighted: NorteStateId;
  onHighlight: (state: NorteStateId | null) => void;
  className?: string;
};

function StatesMenu({ highlighted, onHighlight, className = "" }: StatesMenuProps) {
  return (
    <ul
      className={`states-list grid w-full max-w-[633px] grid-cols-2 gap-x-[clamp(8px,0.8vw,14px)] gap-y-[clamp(6px,0.6vw,10px)] ${className}`}
    >
      {STATES.map((state) => {
        const isActive = state === highlighted;
        return (
          <li key={state} className="min-w-0">
            <button
              type="button"
              className={`state-item flex ${STATE_ROW_H} w-full items-center gap-2 border-2 border-[var(--orange)] px-[clamp(12px,1.2vw,22px)] transition-all duration-200 ${
                isActive
                  ? "bg-[var(--orange)] scale-[1.02]"
                  : "bg-transparent scale-100 hover:bg-[var(--orange)]/15"
              }`}
              onMouseEnter={() => onHighlight(state)}
              onFocus={() => onHighlight(state)}
            >
              <span
                className="size-2 shrink-0 rounded-full bg-[var(--cream)] transition-all duration-200"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "scale(1)" : "scale(0)",
                }}
                aria-hidden
              />
              <span
                className={`font-medium lowercase transition-colors duration-200 ${isActive ? "text-[#232323]" : "text-[var(--cream)]"}`}
                style={{ fontFamily: "var(--font-inter)", fontSize: STATE_FONT }}
              >
                {state}
              </span>
            </button>
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
      Presença local com alcance nacional.
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
  const [hoveredState, setHoveredState] = useState<NorteStateId | null>(null);
  const highlighted = hoveredState ?? DEFAULT_STATE;

  const handleHighlight = useCallback((state: NorteStateId | null) => {
    setHoveredState(state);
  }, []);

  const mapStyle = {
    aspectRatio: figmaAspect(1227, 829),
    maxHeight: "min(82svh, 829px)",
  } as const;

  return (
    <section
      data-section
      className="estamos-aqui relative w-full max-w-[100vw] min-h-[100svh] overflow-x-clip bg-[#232323] lg:h-[100svh] lg:max-h-[100svh] lg:overflow-hidden"
      onMouseLeave={() => setHoveredState(null)}
    >
      {/* Mobile / tablet */}
      <div className={`flex min-w-0 flex-col gap-10 py-12 md:py-16 lg:hidden ${EDGE_PAD}`}>
        <TitleBlock />
        <CopyBlock />
        <StatesMenu highlighted={highlighted} onHighlight={handleHighlight} />
        <div className="mt-6 min-w-0 overflow-hidden md:mt-8">
          <NorteBrasilMap
            highlighted={highlighted}
            onHighlight={handleHighlight}
            className="h-auto w-full max-w-full"
            style={{ aspectRatio: figmaAspect(1227, 829) }}
          />
        </div>
      </div>

      {/* Desktop — 100svh; mapa até a borda direita */}
      <div
        className="hidden h-full min-h-[100svh] w-full lg:grid lg:items-center"
        style={{
          gridTemplateColumns: `minmax(0, ${(LEFT_COL_FR / ARTBOARD_W) * 100}%) minmax(0, 1fr)`,
        }}
      >
        <div
          className={`flex min-h-0 min-w-0 flex-col justify-center gap-[clamp(1rem,2vw,2rem)] ${EDGE_PAD} py-10 lg:pr-6 xl:pr-10`}
        >
          <TitleBlock />
          <CopyBlock />
          <StatesMenu highlighted={highlighted} onHighlight={handleHighlight} />
        </div>

        <div className="relative flex h-full min-h-0 min-w-0 items-start justify-end overflow-hidden pt-[4svh]">
          <NorteBrasilMap
            highlighted={highlighted}
            onHighlight={handleHighlight}
            className="h-auto w-full max-w-none object-contain object-right"
            style={mapStyle}
          />
        </div>
      </div>
    </section>
  );
}
