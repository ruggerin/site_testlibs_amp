"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { FRAME_PAD_X } from "@/lib/site";
import rawTeamData from "../../public/assets/team/team.json";

export type TeamMember = {
  id: string;
  ordem_exibicao: number;
  nome_completo: string;
  funcao: string;
  historico: string;
  fotos: string[];
};

export const TEAM_MEMBERS: TeamMember[] = (rawTeamData.team as TeamMember[])
  .slice()
  .sort((a, b) => a.ordem_exibicao - b.ordem_exibicao);

function MemberPhotoPanel({
  member,
  visible,
  isFirst,
}: {
  member: TeamMember;
  visible: boolean;
  isFirst: boolean;
}) {
  const [photoIdx, setPhotoIdx] = useState(0);

  // Reseta para a primeira foto apenas quando o painel se torna visível
  useEffect(() => {
    if (!visible) return;
    setPhotoIdx(0);
  }, [visible]);

  // Cicla entre as fotos enquanto o painel estiver visível
  useEffect(() => {
    if (!visible || member.fotos.length <= 1) return;
    const id = setInterval(() => {
      setPhotoIdx((i) => (i + 1) % member.fotos.length);
    }, 2500);
    return () => clearInterval(id);
  }, [visible, member.fotos.length]);

  return (
    <div
      className={`absolute inset-0 transition-[opacity,transform] duration-500 ease-out ${
        visible ? "z-10 scale-100 opacity-100" : "z-0 scale-[1.03] opacity-0"
      }`}
      aria-hidden={!visible}
    >
      {member.fotos.map((src, idx) => (
        <div
          key={src}
          className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out ${
            idx === photoIdx
              ? "z-10 opacity-100 scale-100"
              : "z-0 opacity-0 scale-[1.02]"
          }`}
        >
          <Image
            src={src}
            alt={visible ? member.nome_completo : ""}
            fill
            className="object-cover object-[center_18%]"
            sizes="(max-width: 768px) 92vw, 55vh"
            priority={isFirst && idx === 0}
          />
        </div>
      ))}
    </div>
  );
}

type TeamSectionProps = {
  members?: TeamMember[];
  /** @deprecated Layout full-bleed; mantido só por compatibilidade. */
  frameClassName?: string;
};

export default function TeamSection({ members = TEAM_MEMBERS }: TeamSectionProps) {
  const [activeId, setActiveId] = useState(members[0]?.id ?? "");
  const [showListFade, setShowListFade] = useState(false);
  const activeMember = members.find((m) => m.id === activeId) ?? members[0];
  const listWrapperRef = useRef<HTMLDivElement>(null);

  const updateListFade = useCallback(() => {
    const el = listWrapperRef.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    setShowListFade(maxScroll > 8 && el.scrollTop < maxScroll - 8);
  }, []);

  const onEnter = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  // Smooth scroll com GSAP — intercepta wheel antes do snap de seção
  useEffect(() => {
    const listEl = listWrapperRef.current;
    if (!listEl) return;

    let target = 0;

    const onWheel = (e: WheelEvent) => {
      const maxScroll = listEl.scrollHeight - listEl.clientHeight;
      if (maxScroll <= 0) return; // lista cabe inteira — deixa o snap de seção agir

      const atTop = target <= 0 && e.deltaY < 0;
      const atBottom = target >= maxScroll - 1 && e.deltaY > 0;

      // Na borda: deixa o evento subir para o snap de seção
      if (atTop || atBottom) return;

      // Consome o evento — passive:false permite stopPropagation real no browser
      e.stopPropagation();
      e.preventDefault();

      target = Math.max(0, Math.min(maxScroll, target + e.deltaY));

      gsap.to(listEl, {
        scrollTop: target,
        duration: 0.85,
        ease: "power4.out",
        overwrite: true,
        onUpdate: updateListFade,
        onComplete: updateListFade,
      });
    };

    // passive:false é obrigatório para stopPropagation funcionar em wheel no Chrome
    listEl.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      listEl.removeEventListener("wheel", onWheel);
      gsap.killTweensOf(listEl, "scrollTop");
    };
  }, [updateListFade]);

  // Fade fixo abaixo da lista (fora do scroll) — só quando há mais itens para rolar
  useEffect(() => {
    const el = listWrapperRef.current;
    if (!el) return;

    updateListFade();
    el.addEventListener("scroll", updateListFade, { passive: true });
    const ro = new ResizeObserver(updateListFade);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", updateListFade);
      ro.disconnect();
    };
  }, [members.length, updateListFade]);

  return (
    <section
      data-section
      className="team-section flex min-h-[100svh] w-full max-w-[100vw] flex-col justify-center overflow-x-clip overflow-y-visible pt-[clamp(1.5rem,4svh,5rem)] pb-[clamp(0.5rem,1svh,1.5rem)] md:justify-start md:py-0"
    >
      <div
        className={`grid w-full grid-cols-1 gap-6 md:grid-cols-[minmax(0,42%)_minmax(0,1fr)] md:items-stretch md:gap-x-[clamp(0.75rem,1.5vw,2rem)] md:gap-y-0 ${FRAME_PAD_X} md:pl-0 md:pr-0`}
      >
        {/* ── Coluna: lista + título ── */}
        <div
          className="order-2 flex min-w-0 w-full flex-col md:order-2 md:h-[100svh] md:max-w-none md:justify-center md:pb-[clamp(1.5rem,4svh,5rem)] md:pt-[clamp(5rem,10svh,6.5rem)]"
          style={{
            gap: "clamp(2rem, 6svh, 4.5rem)",
            paddingLeft: "clamp(0.5rem, 1.1vw, 1rem)",
            paddingRight: "clamp(0.35rem, 0.65vw, 0.625rem)",
          }}
        >
          <div className="relative w-fit max-w-full shrink-0">
            <svg
              viewBox="0 0 120 120"
              className="pointer-events-none absolute z-0 -translate-x-1/2 -translate-y-1/2 animate-spin"
              style={{
                left: "92%",
                top: "48%",
                width: "clamp(5rem, 13vw, 8.75rem)",
                height: "clamp(5rem, 13vw, 8.75rem)",
                animationDuration: "14s",
              }}
              aria-hidden
            >
              <defs>
                <path id="team-circle-text" d="M60,10 a50,50 0 1,1 -0.01,0" />
              </defs>
              <text
                fill="var(--orange)"
                fontSize="10.5"
                letterSpacing="2.5"
                fontWeight="600"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <textPath href="#team-circle-text">
                  TRÊS LETRAS, INFINITAS POSSIBILIDADES.
                </textPath>
              </text>
            </svg>
            <h2
              className="reveal-title relative z-10 font-black leading-[0.9] tracking-[-0.06em] text-white"
              style={{
                fontFamily: "var(--font-darker-grotesque)",
                fontSize: "clamp(36px, min(11vw, 16svh), 130px)",
              }}
            >
              TIME
            </h2>
          </div>

          {/* Lista rolável — degradê no pai (absolute), não rola com o conteúdo */}
          <div className="flex min-h-0 w-full max-w-none flex-1 flex-col">
            <div className="relative min-h-0 w-full flex-1">
              <div
                ref={listWrapperRef}
                className="h-full w-full overflow-hidden"
              >
            <ul className="team-list flex w-full flex-col gap-[clamp(6px,0.75svh,10px)] pb-4">
              {members.map((member) => {
                const isActive = member.id === activeId;
                return (
                  <li key={member.id}>
                    <button
                      type="button"
                      className={`team-item group flex w-full cursor-pointer items-center gap-5 border border-[var(--orange)] text-left transition-[background-color] duration-300 sm:gap-8 md:gap-10 ${
                        isActive
                          ? "bg-[var(--orange)]"
                          : "bg-transparent hover:bg-[var(--orange)]/10"
                      }`}
                      style={{
                        paddingLeft: "clamp(0.65rem, 1.25vw, 1.125rem)",
                        paddingRight: "clamp(0.65rem, 1.25vw, 1.125rem)",
                        paddingTop: "clamp(10px, 1.85svh, 22px)",
                        paddingBottom: "clamp(10px, 1.85svh, 22px)",
                      }}
                      onMouseEnter={() => onEnter(member.id)}
                      onFocus={() => onEnter(member.id)}
                    >
                      <span
                        className={`min-w-0 flex-1 font-medium text-[clamp(18px,min(2.5vw,3.85svh),42px)] leading-[1.12] transition-colors duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-white/90 group-hover:text-white"
                        }`}
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {member.nome_completo}
                      </span>
                      <span
                        className={`max-w-[52%] shrink-0 text-right text-[clamp(17px,min(2.15vw,3.35svh),38px)] leading-[1.12] transition-colors duration-300 ${
                          isActive
                            ? "text-white/80"
                            : "text-white/40 group-hover:text-white/55"
                        }`}
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {member.funcao}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
              </div>

              <div
                aria-hidden
                className={`team-list-vignette pointer-events-none absolute inset-x-0 bottom-0 z-20 transition-opacity duration-500 ease-out ${
                  showListFade ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  height: "clamp(0.35rem, 1svh, 0.625rem)",
                  background:
                    "linear-gradient(180deg, rgba(24,24,24,0.3) 0%, rgba(24,24,24,0.5) 100%)",
                }}
              />
            </div>
          </div>

          <button
            type="button"
            className="w-full shrink-0 border border-[var(--orange)] text-left font-bold uppercase tracking-[0.2em] text-[var(--orange)] transition-all duration-300 hover:bg-[var(--orange)]/10"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(13px, 1.45vw, 17px)",
              paddingLeft: "clamp(0.65rem, 1.25vw, 1.125rem)",
              paddingRight: "clamp(0.65rem, 1.25vw, 1.125rem)",
              paddingTop: "clamp(10px, 1.85svh, 22px)",
              paddingBottom: "clamp(10px, 1.85svh, 22px)",
            }}
          >
            + Ver mais
          </button>
        </div>

        {/* ── Coluna: foto com transição e ciclo de imagens ── */}
        <div className="team-photo order-1 z-10 min-h-0 min-w-0 w-full will-change-transform md:order-1 md:h-[100svh] md:justify-self-stretch">
          <div
            className="team-photo-frame relative h-full min-h-[min(75svh,680px)] w-full overflow-hidden bg-[#1a1a1a]
              max-md:mx-auto max-md:max-h-[min(88svh,820px)] max-md:max-w-[min(100%,520px)]
              md:ml-0 md:h-[100svh] md:min-h-[100svh] md:max-w-none"
          >
            {members.map((member, idx) => (
              <MemberPhotoPanel
                key={member.id}
                member={member}
                visible={member.id === activeId}
                isFirst={idx === 0}
              />
            ))}

            {/* Bio sobreposta no rodapé da foto */}
            {activeMember?.historico ? (
              <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-10 pb-12 pt-24 sm:px-12 sm:pb-14">
                <p
                  className="text-xl font-bold leading-snug text-white sm:text-2xl"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {activeMember.historico}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
