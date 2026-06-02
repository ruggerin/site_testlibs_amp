"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/Navbar";
import type { CaseStudy } from "@/data/cases";
import { figmaClamp } from "@/lib/figma-scale";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HERO_H = 1080;
const CLIENT_SIZE = figmaClamp(52, { min: 22, max: 52, vw: 2.71 });
const YEAR_SIZE = figmaClamp(52, { min: 22, max: 52, vw: 2.71 });

type Props = {
  item: CaseStudy;
  prev: CaseStudy | null;
  next: CaseStudy | null;
};

function NavArrow({
  href,
  label,
  direction,
}: {
  href: string;
  label: string;
  direction: "prev" | "next";
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-10 w-[82px] items-center justify-center border-2 border-[#232323]/20 bg-white/90 transition-colors hover:border-[#232323] hover:bg-white md:h-[41px]"
    >
      <span className="sr-only">{label}</span>
      <svg
        width="40"
        height="22"
        viewBox="0 0 40 22"
        fill="none"
        aria-hidden
        className={direction === "next" ? "rotate-180" : undefined}
      >
        <path
          d="M38 11H2M2 11L12 2M2 11L12 20"
          stroke="#232323"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}

/** Hero — Figma /single_trabalhos head (1920×1080, 2:743). */
export default function CaseDetailHero({ item, prev, next }: Props) {
  const heroRef = useRef<HTMLElement>(null);
  const year = item.year ?? "2026";

  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;

      // ── Entrada: imagem scale+fade → meta slide up → nav fade in ─────────
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".cdh-image",
          { scale: 1.12, opacity: 0 },
          { scale: 1.06, opacity: 1, duration: 1.3, ease: "power2.out" },
        )
        .fromTo(
          ".cdh-meta",
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 },
          "-=0.55",
        )
        .fromTo(
          ".cdh-nav",
          { y: -12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.6",
        );

      // ── Parallax: imagem sobe levemente ao rolar ──────────────────────────
      gsap.to(".cdh-image", {
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
        },
      });
    },
    { scope: heroRef },
  );

  return (
    <header ref={heroRef} className="relative bg-[var(--orange)] text-[#232323]">
      <div className="relative z-20">
        <Navbar theme="light" />
      </div>

      <div
        className="relative mx-auto w-full max-w-[1920px]"
        style={{ minHeight: `min(100svh, ${HERO_H}px)` }}
      >
        <Link
          href="/cases"
          className="absolute right-6 top-24 z-30 flex size-10 items-center justify-center rounded-full bg-[#232323]/10 transition-colors hover:bg-[#232323]/20 md:right-10 md:top-28"
          aria-label="Fechar e voltar para projetos"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path
              d="M2 2L16 16M16 2L2 16"
              stroke="#232323"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </Link>

        {(prev || next) && (
          <div className="cdh-nav absolute right-6 top-36 z-30 flex gap-3 md:right-10 md:top-40">
            {prev ? (
              <NavArrow
                href={`/cases/${prev.slug}`}
                label={`Projeto anterior: ${prev.client}`}
                direction="prev"
              />
            ) : (
              <span className="h-10 w-[82px] opacity-0 md:h-[41px]" aria-hidden />
            )}
            {next ? (
              <NavArrow
                href={`/cases/${next.slug}`}
                label={`Próximo projeto: ${next.client}`}
                direction="next"
              />
            ) : null}
          </div>
        )}

        <div
          className="relative mx-auto w-full px-6 pt-4 pb-28 md:px-6"
          style={{
            maxWidth: 1872,
            minHeight: `clamp(420px, 77vh, ${HERO_H - 120}px)`,
          }}
        >
          <div className="hover-zoom-media relative mt-2 aspect-[1872/835] w-full max-h-[835px] md:mt-4">
            <div className="cdh-image absolute inset-0 will-change-transform">
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover object-center"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-6 px-6 pb-8 md:px-8 md:pb-10"
          style={{ fontFamily: "var(--font-darker-grotesque)" }}
        >
          <p
            className="cdh-meta font-black uppercase leading-none"
            style={{ fontSize: CLIENT_SIZE }}
          >
            {item.client}
          </p>
          <p
            className="cdh-meta font-black uppercase leading-none text-right"
            style={{ fontSize: YEAR_SIZE }}
          >
            ano — {year}
          </p>
        </div>
      </div>
    </header>
  );
}
