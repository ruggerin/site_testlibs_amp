"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// ─── Paths originais de cada letra ────────────────────────────────────────────
const PATH_A =
  "M275.648 255L202.793 73.3723C196.062 56.521 181.28 46.62 163.066 46.62C144.852 46.62 130.07 56.5865 123.339 73.3723L50.4838 255H0L79.7182 56.1275C93.5765 21.5724 125.583 0 163 0C200.417 0 232.423 21.5724 246.282 56.1275L326 255H275.582H275.648Z";

const PATH_M =
  "M261.055 23.9375C270.859 9.83734 286.69 1.04932 303.913 0.0655862C304.973 0.0655862 306.033 0 307.026 0C311.2 0 315.373 0.45908 319.48 1.37723C343.79 6.88614 361.476 27.6757 362.801 52.269V52.4658C362.934 54.1709 363 55.9417 363 57.6468V253.869H315.969V57.7124C315.969 57.1221 315.969 56.5975 315.836 56.0728V55.6793V55.2858C315.836 51.2197 312.988 47.6783 308.947 46.7601C308.285 46.629 307.623 46.5634 306.96 46.5634C304.311 46.5634 301.86 47.7439 300.137 49.7113L299.607 50.3672L226.809 208.683C220.98 221.406 212.964 241.146 200.975 248.95C195.079 252.754 188.389 254 181.5 254C174.545 254 167.921 252.754 162.025 248.95C150.036 241.146 142.02 221.406 136.191 208.683L63.3925 50.3672L62.8626 49.7113C61.2066 47.7439 58.6894 46.5634 56.0398 46.5634C53.3902 46.5634 54.715 46.629 54.0526 46.7601C50.0119 47.6783 47.1635 51.2197 47.1635 55.2858V55.6793V56.0728C47.0973 56.5975 47.031 57.1877 47.031 57.7124V253.934H0V57.7124C0 56.0072 0.0662328 54.2365 0.198715 52.5314V52.3346C1.58977 27.6757 19.2761 6.88613 43.5203 1.44281C47.6272 0.524656 51.8004 0.0655862 55.9735 0.0655862C57.0334 0.0655862 58.0933 0.0655802 59.0869 0.131162C76.3095 1.1149 92.1411 9.90292 101.945 24.0031L104.462 27.6101L181.434 194.976L258.406 27.6101L260.923 24.0031L261.055 23.9375Z";

const PATH_P =
  "M210.55 4.32647C202.459 1.44215 193.908 0 185.357 0H46.7011V31.5308C46.7011 39.856 53.4761 46.5424 61.7639 46.5424H185.226C201.012 46.5424 214.167 59.4563 214.233 75.1889C214.233 75.1889 214.233 75.3201 214.233 75.3856C214.233 75.4512 214.233 75.5823 214.233 75.6478C214.102 91.3805 201.144 104.229 185.292 104.229H75.5769C67.026 104.229 58.475 105.671 50.3846 108.555C49.1348 109.014 47.8851 109.473 46.7011 109.997V76.9589C46.7011 68.6337 39.9261 61.9473 31.6383 61.9473H0V193.118V255H46.7011V193.118V179.614V179.352C46.8327 163.62 59.7906 150.837 75.6426 150.837H185.357C195.618 150.837 205.814 148.739 215.286 144.675L216.009 144.347C230.809 137.726 243.109 126.582 251.134 112.554C257.58 101.279 261 88.4961 261 75.5167C261 43.6581 240.609 15.1427 210.55 4.45758";

// ─── Layout das letras no SVG combinado ────────────────────────────────────────
//   A: x=0,   largura=326
//   M: x=366, largura=363  (326 + gap 40)
//   P: x=769, largura=261  (366 + 363 + gap 40)
//   Total: 1030 × 255
const SVG_W = 1030;
const SVG_H = 255;

const LETTERS = [
  { path: PATH_A, tx: 0 },
  { path: PATH_M, tx: 366 },
  { path: PATH_P, tx: 769 },
];

// ─── Função utilitária: converte progresso (0-100) para largura do fill ───────
function progressToWidth(pct: number): number {
  return (pct / 100) * SVG_W;
}

interface LoaderProps {
  /** Callback disparado quando a animação de saída termina */
  onComplete?: () => void;
  /** Duração total em segundos (padrão: 5) */
  duration?: number;
}

export default function Loader({ onComplete, duration = 5 }: LoaderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<SVGRectElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Trava o scroll durante o loader
    document.body.classList.add("loading");

    const fillDuration = duration * 0.8;   // 80% do tempo preenchendo
    const holdDuration = duration * 0.06;  // pausa breve no 100%
    const exitDuration = duration * 0.14;  // saída

    const ctx = gsap.context(() => {
      const counter = { val: 0 };

      const tl = gsap.timeline({
        onComplete() {
          document.body.classList.remove("loading");
          onComplete?.();
        },
      });

      // 1. Preenche as letras da esquerda pra direita
      tl.to(fillRef.current, {
        attr: { width: SVG_W },
        duration: fillDuration,
        ease: "power2.inOut",
      });

      // 2. Contador de % em sincronia com o fill
      tl.to(
        counter,
        {
          val: 100,
          duration: fillDuration,
          ease: "power2.inOut",
          onUpdate() {
            if (percentRef.current) {
              percentRef.current.textContent = `${Math.round(counter.val)}%`;
            }
          },
        },
        "<" // começa junto com o fill
      );

      // 3. Hold no 100%
      tl.to({}, { duration: holdDuration });

      // 4. Saída: slide para cima revelando a página
      tl.to(wrapperRef.current, {
        yPercent: -100,
        duration: exitDuration,
        ease: "power3.inOut",
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [duration, onComplete]);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-50 bg-[#181818] flex flex-col items-center justify-center gap-10"
    >
      {/* ── Logo AMP com fill progressivo ──────────────────────────────────── */}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-[55vw] max-w-[640px] min-w-[280px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="AMP"
      >
        <defs>
          {/*
            ClipPath com os 3 paths das letras.
            O rect laranja abaixo é recortado por esse clip,
            então só aparece dentro das letras.
          */}
          <clipPath id="amp-clip">
            {LETTERS.map(({ path, tx }, i) => (
              <path key={i} d={path} transform={`translate(${tx}, 0)`} />
            ))}
          </clipPath>
        </defs>

        {/* Letras "fantasma" — branco bem sutil, mostram onde o fill vai chegar */}
        {LETTERS.map(({ path, tx }, i) => (
          <path
            key={i}
            d={path}
            transform={`translate(${tx}, 0)`}
            fill="white"
            fillOpacity={0.1}
          />
        ))}

        {/*
          Retângulo laranja que cresce da esquerda pra direita.
          Começa com width=0 e vai até SVG_W (1030).
          O clipPath faz ele aparecer APENAS dentro das letras.
        */}
        <rect
          ref={fillRef}
          x={0}
          y={0}
          width={0}
          height={SVG_H}
          fill="#FF4D00"
          clipPath="url(#amp-clip)"
        />
      </svg>

      {/* ── Contador de percentual ─────────────────────────────────────────── */}
      <span
        ref={percentRef}
        className="text-white/40 text-sm tracking-[0.25em] tabular-nums"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        0%
      </span>
    </div>
  );
}
