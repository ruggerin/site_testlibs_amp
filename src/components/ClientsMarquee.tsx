"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export type PartnerLogo = {
  name: string;
  src: string;
};

/** Ordem Figma — 4 fileiras de referência. */
const PARTNER_ROWS: PartnerLogo[][] = [
  [
    { name: "Supermercados COEMA", src: "/assets/parceiros/LogoSupermercadosCoema.png" },
    { name: "Ramsons", src: "/assets/parceiros/LOGORAMSON%20NOVA.png" },
    { name: "AmazonGás", src: "/assets/parceiros/AmazonGasLOGO.png" },
    { name: "Missiato", src: "/assets/parceiros/MISSIATOMARCAS.png" },
    {
      name: "Bebidas Monte Roraima",
      src: "/assets/parceiros/LogoBebidasMonteRoraimaAzul.png",
    },
  ],
  [
    { name: "Coca-Cola", src: "/assets/parceiros/cocacola.png" },
    { name: "Heineken", src: "/assets/parceiros/heineken.png" },
    { name: "Monster Energy", src: "/assets/parceiros/moster.png" },
    { name: "Leão", src: "/assets/parceiros/leao.png" },
    { name: "del Valle", src: "/assets/parceiros/delvalle.png" },
  ],
  [
    { name: "JLN", src: "/assets/parceiros/LOGO_NOVA_JLN.png" },
    { name: "JB MIX", src: "/assets/parceiros/LogotipoJBMIX01.png" },
    { name: "Baratão da Construção", src: "/assets/parceiros/BarataoDaConstrucao.png" },
    {
      name: "Real Equipamentos",
      src: "/assets/parceiros/Logotipo_Real%20Equipamento.png",
    },
    { name: "MAQPEL", src: "/assets/parceiros/MAQPEL_COLORIDA.png" },
    { name: "Fecha com Tecidos", src: "/assets/parceiros/FCTLOGO.png" },
  ],
  [
    { name: "Powertech", src: "/assets/parceiros/PowertechLogo.png" },
    {
      name: "Frios & Cia",
      src: "/assets/parceiros/LogotipoFriosCiaTransparente01.png",
    },
    { name: "Friotrans Atacado", src: "/assets/parceiros/FriotransLogo.png" },
    {
      name: "Amazon Distribuidora",
      src: "/assets/parceiros/AmazonDistribuidoraLogoTransparente.png",
    },
    { name: "Shopping São José", src: "/assets/parceiros/logossj.png" },
    { name: "Salmo 91 Express", src: "/assets/parceiros/Salmo91Logo.png" },
  ],
];

const ALL_PARTNERS = PARTNER_ROWS.flat();

function buildRowTrack(rowIndex: number, loops = 10): PartnerLogo[] {
  const step = Math.max(1, Math.floor(ALL_PARTNERS.length / 2));
  const offset = rowIndex * step;
  const out: PartnerLogo[] = [];
  const total = ALL_PARTNERS.length * loops;
  for (let i = 0; i < total; i++) {
    out.push(ALL_PARTNERS[(i + offset) % ALL_PARTNERS.length]);
  }
  return out;
}

const MARQUEE_COPIES = 2;

const MARQUEE_ROWS = [
  { track: buildRowTrack(0), duration: 880, reverse: false },
  { track: buildRowTrack(1), duration: 1040, reverse: true },
];

const GAP = "clamp(0.25rem,0.5vw,0.5rem)";

function PartnerLogoSquare({
  partner,
  className = "",
}: {
  partner: PartnerLogo;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-square shrink-0 overflow-hidden bg-white transition-transform duration-300 hover:z-10 hover:scale-[1.04] ${className}`}
    >
      <Image
        src={partner.src}
        alt={partner.name}
        width={400}
        height={400}
        className="h-full w-full object-contain p-[clamp(8px,12%,18px)]"
      />
    </div>
  );
}

function MarqueeRow({
  track,
  squareClass,
  duration,
  reverse,
}: {
  track: PartnerLogo[];
  squareClass: string;
  duration: number;
  reverse: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const el = trackRef.current;
      if (!el) return;

      let debounceId = 0;

      const run = () => {
        const half = el.scrollWidth / MARQUEE_COPIES;
        if (half < 1) return;

        tweenRef.current?.kill();
        gsap.set(el, { x: reverse ? -half : 0 });

        tweenRef.current = gsap.to(el, {
          x: reverse ? 0 : -half,
          duration,
          ease: "none",
          repeat: -1,
        });
      };

      const scheduleRun = () => {
        window.clearTimeout(debounceId);
        debounceId = window.setTimeout(run, 80);
      };

      scheduleRun();
      const ro = new ResizeObserver(scheduleRun);
      ro.observe(el);

      return () => {
        ro.disconnect();
        window.clearTimeout(debounceId);
        tweenRef.current?.kill();
      };
    },
    { scope: rowRef, dependencies: [duration, reverse] }
  );

  return (
    <div ref={rowRef} className="partners-marquee-row min-h-0 flex-1 overflow-hidden">
      <div
        ref={trackRef}
        data-partners-track
        className="flex w-max will-change-transform"
        style={{ gap: GAP }}
      >
        {Array.from({ length: MARQUEE_COPIES }, (_, copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-stretch"
            style={{ gap: GAP }}
            aria-hidden={copy > 0 ? true : undefined}
          >
            {track.map((partner, i) => (
              <PartnerLogoSquare
                key={`${copy}-${partner.src}-${i}`}
                partner={partner}
                className={squareClass}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClientsMarquee({
  fill = false,
  compact = false,
}: {
  theme?: "dark" | "light";
  compact?: boolean;
  fill?: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  const squareClass = fill
    ? "size-[clamp(10rem,25svh,21rem)]"
    : compact
      ? "size-[clamp(9rem,32vw,13rem)]"
      : "size-[clamp(10rem,28vw,14rem)]";

  const rows = useMemo(() => MARQUEE_ROWS, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const collectTweens = () => {
        tweensRef.current = gsap.utils
          .toArray<HTMLElement>("[data-partners-track]", section)
          .map((el) => gsap.getTweensOf(el)[0])
          .filter((t): t is gsap.core.Tween => Boolean(t));
      };

      collectTweens();
      const timer = window.setTimeout(collectTweens, 400);

      const pause = () => {
        collectTweens();
        tweensRef.current.forEach((tw) => tw.pause());
      };

      const resume = () => {
        collectTweens();
        tweensRef.current.forEach((tw) => tw.resume());
      };

      const onPointerDown = (e: PointerEvent) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        pause();
      };

      const onPointerUp = () => {
        resume();
      };

      section.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);

      return () => {
        window.clearTimeout(timer);
        section.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);
      };
    },
    { scope: sectionRef }
  );

  return (
    <div
      ref={sectionRef}
      className={
        fill
          ? "flex h-full min-h-0 w-full cursor-grab flex-col justify-end gap-[clamp(0.2rem,0.4svh,0.4rem)] overflow-hidden active:cursor-grabbing"
          : compact
            ? "cursor-grab space-y-1.5 overflow-hidden py-1 active:cursor-grabbing"
            : "cursor-grab space-y-2 overflow-hidden py-2 active:cursor-grabbing"
      }
    >
      {rows.map((row, rowIndex) => (
        <MarqueeRow
          key={rowIndex}
          track={row.track}
          squareClass={squareClass}
          duration={row.duration}
          reverse={row.reverse}
        />
      ))}
    </div>
  );
}

export { PARTNER_ROWS };
