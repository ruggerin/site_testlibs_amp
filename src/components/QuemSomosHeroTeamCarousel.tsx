"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { TEAM_MEMBERS, type TeamMember } from "@/components/TeamSection";

const AUTOPLAY_MS = 4500;

/** Primeira foto de cada membro, na ordem do `team.json` (`ordem_exibicao`). */
const HERO_TEAM: TeamMember[] = TEAM_MEMBERS.filter((m) => m.fotos[0]);

export default function QuemSomosHeroTeamCarousel() {
  const [index, setIndex] = useState(0);
  const creditRef = useRef<HTMLDivElement>(null);
  const active = HERO_TEAM[index] ?? HERO_TEAM[0];
  const activePhoto = active?.fotos[0];

  useEffect(() => {
    if (HERO_TEAM.length <= 1) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_TEAM.length);
    }, AUTOPLAY_MS);

    const onReduced = () => {
      if (reduced.matches) window.clearInterval(id);
    };
    reduced.addEventListener("change", onReduced);

    return () => {
      window.clearInterval(id);
      reduced.removeEventListener("change", onReduced);
    };
  }, []);

  useEffect(() => {
    const el = creditRef.current;
    if (!el || !active) return;

    gsap.fromTo(
      el,
      { opacity: 0, x: 14 },
      { opacity: 1, x: 0, duration: 0.55, ease: "power2.out", overwrite: true },
    );
  }, [index, active]);

  if (!activePhoto) return null;

  return (
    <>
      <span
        className="hover-zoom-media"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          borderRadius: "clamp(3px, 0.25vw, 6px)",
          boxShadow: "0 0 60px rgba(255,77,0,0.6), 0 0 130px rgba(255,77,0,0.25)",
          display: "block",
          marginLeft: "8px",
        }}
      >
        {HERO_TEAM.map((member, i) => {
          const visible = i === index;
          return (
            <span
              key={member.id}
              className="absolute inset-0 block transition-[opacity,transform] duration-700 ease-out"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "scale(1)" : "scale(1.04)",
                zIndex: visible ? 2 : 1,
              }}
              aria-hidden={!visible}
            >
              <Image
                src={member.fotos[0]!}
                alt={visible ? member.nome_completo : ""}
                fill
                className="object-cover"
                style={{ objectPosition: "center 45%" }}
                sizes="(max-width: 768px) 25vw, 25vw"
                priority={i === 0}
              />
            </span>
          );
        })}
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-[#141414]/40 via-transparent to-transparent" />
      </span>

      <div
        ref={creditRef}
        className="pointer-events-auto absolute hidden sm:flex flex-row items-center gap-3"
        style={{
          top: "9%",
          left: "100%",
          paddingLeft: "clamp(8px, 0.8vw, 20px)",
          transform: "translateY(-50%)",
          textTransform: "none",
          letterSpacing: "normal",
          fontWeight: "normal",
        }}
      >
        <div
          aria-hidden
          style={{
            height: "15px",
            width: "clamp(16px, 15vw, 32px)",
            background: "var(--orange)",
            flexShrink: 0,
          }}
        />
        <div className="flex flex-col">
          <p
            className="font-bold leading-tight text-white whitespace-nowrap"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(0.85rem, 1.3vw, 1.5rem)",
            }}
          >
            {active.nome_completo.toUpperCase()}
          </p>
          <p
            className="mt-1 font-semibold whitespace-nowrap"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(8px, 0.7vw, 11px)",
              color: "var(--orange)",
              textTransform: "uppercase",
              letterSpacing: "0.22em",
            }}
          >
            {active.funcao}
          </p>
        </div>
      </div>
    </>
  );
}
