"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PARTNER_LOGO_SRCS } from "@/data/partners";

export type PartnerLogo = {
  name: string;
  src: string;
};

const PARTNER_NAMES: string[] = [
  "Supermercados COEMA",
  "Ramsons",
  "AmazonGás",
  "Missiato",
  "Bebidas Monte Roraima",
  "Coca-Cola",
  "Heineken",
  "Monster Energy",
  "Leão",
  "del Valle",
  "JLN",
  "JB MIX",
  "Baratão da Construção",
  "Real Equipamentos",
  "MAQPEL",
  "Fecha com Tecidos",
  "Powertech",
  "Frios & Cia",
  "Friotrans Atacado",
  "Amazon Distribuidora",
  "Shopping São José",
  "Salmo 91 Express",
];

const ALL_PARTNERS: PartnerLogo[] = PARTNER_LOGO_SRCS.map((src, i) => ({
  name: PARTNER_NAMES[i] ?? "Parceiro",
  src,
}));

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
      className={`relative aspect-square shrink-0 overflow-hidden bg-transparent transition-transform duration-300 hover:z-10 hover:scale-[1.04] ${className}`}
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
    <div ref={rowRef} className="partners-marquee-row min-h-0 overflow-hidden">
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
  variant,
}: {
  theme?: "dark" | "light";
  compact?: boolean;
  /** @deprecated use variant="prototype" */
  fill?: boolean;
  variant?: "default" | "compact" | "prototype";
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  const mode = variant ?? (fill ? "prototype" : compact ? "compact" : "default");

  const squareClass =
    mode === "prototype"
      ? "size-[clamp(9rem,20.83vw,25rem)]"
      : mode === "compact"
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
        mode === "prototype"
          ? "flex w-full cursor-grab flex-col gap-[clamp(0.25rem,0.26vw,0.5rem)] overflow-hidden active:cursor-grabbing"
          : mode === "compact"
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
