"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// ─── Dados dos clientes ────────────────────────────────────────────────────────
// seed: string única → gera imagem consistente no picsum.photos
const ROW_1 = [
  { name: "COEMA",               seed: "coema01" },
  { name: "Ramsons",             seed: "ramsons2" },
  { name: "AmazonGás",           seed: "amazg003" },
  { name: "Mispiato",            seed: "misp0044" },
  { name: "Bebidas Monte",       seed: "montero5" },
  { name: "Coca-Cola",           seed: "cocacol6" },
  { name: "Heineken",            seed: "heinek07" },
];

const ROW_2 = [
  { name: "Monster",             seed: "monst008" },
  { name: "Leão",                seed: "leaotea9" },
  { name: "Del Valle",           seed: "delvall0" },
  { name: "JEN",                 seed: "jentxxx1" },
  { name: "JOMIX",               seed: "jomixv12" },
  { name: "Barotobé",            seed: "baro0013" },
  { name: "Brahma",              seed: "brahma14" },
];

const ROW_3 = [
  { name: "Amazon",              seed: "amazon15" },
  { name: "MAGPEL",              seed: "magpel16" },
  { name: "Shopping",            seed: "shopp017" },
  { name: "Salomão",             seed: "salom018" },
  { name: "Powertech",           seed: "powt0019" },
  { name: "Caixa",               seed: "caixa020" },
  { name: "Eletronorte",         seed: "elet0021" },
];

// ─── Config das fileiras ───────────────────────────────────────────────────────
const ROWS = [
  { data: ROW_1, duration: 28, direction: -1 }, // esq → dir
  { data: ROW_2, duration: 40, direction:  1 }, // dir → esq (invertido)
  { data: ROW_3, duration: 22, direction: -1 }, // esq → dir (mais rápido)
];

// ─── Subcomponente: card individual ───────────────────────────────────────────
function LogoCard({ name, seed }: { name: string; seed: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.06,
      borderColor: "rgba(255,77,0,0.5)",
      duration: 0.3,
      ease: "power2.out",
    });
    // A imagem dentro vai para colorido via classe CSS,
    // mas também animamos brightness via GSAP
    gsap.to(cardRef.current!.querySelector("img"), {
      filter: "grayscale(0%) brightness(1.15)",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      borderColor: "rgba(255,255,255,0.07)",
      duration: 0.4,
      ease: "power2.inOut",
    });
    gsap.to(cardRef.current!.querySelector("img"), {
      filter: "grayscale(100%) brightness(0.55)",
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative flex-shrink-0 w-[180px] h-[80px] overflow-hidden border border-white/[0.07] cursor-pointer"
      style={{ willChange: "transform" }}
    >
      {/* Imagem placeholder (picsum com seed) */}
      <Image
        src={`https://picsum.photos/seed/${seed}/360/160`}
        alt={name}
        fill
        sizes="180px"
        className="object-cover"
        style={{ filter: "grayscale(100%) brightness(0.55)" }}
        unoptimized
      />

      {/* Overlay escuro + nome da marca */}
      <div className="absolute inset-0 bg-[#181818]/70 flex items-center justify-center">
        <span
          className="text-white/80 text-xs font-black uppercase tracking-widest text-center px-2 leading-tight"
          style={{ fontFamily: "var(--font-darker-grotesque)" }}
        >
          {name}
        </span>
      </div>

      {/* Borda laranja no bottom — aparece no hover via GSAP */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF4D00]"
        style={{ transform: "scaleX(0)", transformOrigin: "left" }}
        data-underline
      />
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function ClientsMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tracks = gsap.utils.toArray<HTMLElement>(".marquee-track");

      // Array para guardar os tweens de cada fileira
      const tweens: gsap.core.Tween[] = [];

      tracks.forEach((track, i) => {
        const { duration, direction } = ROWS[i];

        // xPercent -50 ou +50 (direção alternada)
        // O track tem as logos DUPLICADAS no DOM, então -50% = exatamente 1 set
        const tween = gsap.to(track, {
          xPercent: -50 * direction,
          duration,
          ease: "none",
          repeat: -1,
        });

        tweens.push(tween);
      });

      // ── Hover na SEÇÃO inteira: desacelera TODOS ao mesmo tempo ───────────
      const section = sectionRef.current!;

      section.addEventListener("mouseenter", () => {
        tweens.forEach((tw) =>
          gsap.to(tw, { timeScale: 0.15, duration: 0.6, ease: "power2.out" })
        );
      });

      section.addEventListener("mouseleave", () => {
        tweens.forEach((tw) =>
          gsap.to(tw, { timeScale: 1, duration: 1.0, ease: "power2.inOut" })
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="overflow-hidden space-y-3 py-2">
      {ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="overflow-hidden">
          {/*
            O track tem 2 cópias de cada fileira.
            GSAP anima xPercent: -50 → seamless loop.
            Rows ímpares começam deslocadas pra eliminar gap visual.
          */}
          <div
            className="marquee-track flex gap-3"
            style={{
              width: "max-content",
              // fileiras de direção invertida: começa em -50% pra não pular no início
              transform: row.direction === 1 ? "translateX(-50%)" : "translateX(0%)",
            }}
          >
            {/* Set 1 */}
            {row.data.map((client) => (
              <LogoCard key={client.seed} name={client.name} seed={client.seed} />
            ))}
            {/* Set 2 — cópia exata para loop seamless */}
            {row.data.map((client) => (
              <LogoCard key={`dup-${client.seed}`} name={client.name} seed={client.seed} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
