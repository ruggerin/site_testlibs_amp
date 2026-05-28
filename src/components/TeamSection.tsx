"use client";

import { useCallback, useState } from "react";
import Image from "next/image";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "sergio-brandao",
    name: "Sérgio Brandão",
    role: "Founder & CEO",
    image: "https://s2-ge.glbimg.com/rAo4zUBmcAAUcvRztwpp9f5Bcik=/0x0:1366x2048/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/w/p/m4AO9zTfOx8vTrTIggsA/52510101648-208d23f180-k.jpg",
    bio: "Comecei em 2009 no atendimento, participando da criação até migrar definitivamente para a redação. Desde 2025, estou como Head da AMP.",
  },
  {
    id: "matheus-abitbol",
    name: "Matheus Abitbol",
    role: "Diretor de arte",
    image: "https://www.tupi.fm/wp-content/uploads/2022/11/retratos-da-seleo-brasileira-neymar_52510031335_o-1-scaled.jpg",
    bio: "Breve histórico da jornada profissional do colaborador.",
  },
  {
    id: "ana-costa",
    name: "Ana Costa",
    role: "Head de estratégia",
    image: "https://www.tupi.fm/wp-content/uploads/2022/11/retratos-da-seleo-brasileira-ederson_52509074187_o-683x1024.jpg",
    bio: "Breve histórico da jornada profissional do colaborador.",
  },
  {
    id: "lucas-mendes",
    name: "Lucas Mendes",
    role: "Diretor de mídia",
    image: "https://www.tupi.fm/wp-content/uploads/2022/11/retratos-da-seleo-brasileira-marquinhos_52509071932_o-683x1024.jpg",
    bio: "Breve histórico da jornada profissional do colaborador.",
  },
  {
    id: "julia-ramos",
    name: "Júlia Ramos",
    role: "Gerente de contas",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0hPbN6mRhzZ51DPFkGg8tWncrx99eIttngQ&s",
    bio: "Breve histórico da jornada profissional do colaborador.",
  },
  {
    id: "pedro-alves",
    name: "Pedro Alves",
    role: "Tech lead",
    image: "https://media.gettyimages.com/id/51956008/pt/foto/stanford-ca-portrait-of-brazilian-forward-romario-taken-24-june-1994-in-stanford-before-the.jpg?s=612x612&w=gi&k=20&c=JHnE3Pb4O8D7FBjzn5q8o-9whV-AGz3Y9QIj2e3qyEA=",
    bio: "Breve histórico da jornada profissional do colaborador.",
  },
  {
    id: "marina-silva",
    name: "Marina Silva",
    role: "Coordenação de projetos",
    image: "https://www.tupi.fm/wp-content/uploads/2022/11/retratos-da-seleo-brasileira-fred_52509825104_o-683x1024.jpg",
    bio: "Breve histórico da jornada profissional do colaborador.",
  },
];

type TeamSectionProps = {
  members?: TeamMember[];
  frameClassName?: string;
};

export default function TeamSection({
  members = TEAM_MEMBERS,
  frameClassName = "max-w-[1440px] mx-auto w-full",
}: TeamSectionProps) {
  const [activeId, setActiveId] = useState(members[0]?.id ?? "");
  const activeMember = members.find((m) => m.id === activeId) ?? members[0];

  const onEnter = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  return (
    <section
      data-section
      className="team-section flex min-h-[100svh] w-full max-w-[100vw] flex-col justify-center overflow-x-clip overflow-y-visible"
      style={{ paddingTop: "clamp(1.5rem, 4svh, 5rem)", paddingBottom: "clamp(1.5rem, 4svh, 5rem)" }}
    >
      <div
        className={`${frameClassName} grid w-full grid-cols-1 gap-1 md:grid-cols-[minmax(0,48%)_minmax(0,1fr)] md:items-center md:gap-2 lg:gap-4`}
      >
        <div className="order-2 px-4 sm:px-6 md:order-2 md:px-0 md:pr-10 lg:pr-16">
          <div className="relative" style={{ marginBottom: "clamp(0.75rem, 2svh, 3rem)" }}>
            <h2
              className="reveal-title font-black  leading-[0.9] tracking-[-0.06em] text-white"
              style={{
                fontFamily: "var(--font-darker-grotesque)",
                fontSize: "clamp(36px, min(11vw, 16svh), 130px)",
              }}
            >
              TIME
            </h2>
            <svg
              viewBox="0 0 120 120"
              className="absolute -top-4 -right-4 h-28 w-28 animate-spin sm:h-32 sm:w-32 lg:h-36 lg:w-36"
              style={{ animationDuration: "14s" }}
              aria-hidden
            >
              <defs>
                <path id="team-circle-text" d="M60,10 a50,50 0 1,1 -0.01,0" />
              </defs>
              <text fill="var(--orange)" fontSize="10.5" letterSpacing="2.5" fontWeight="600" style={{ fontFamily: "var(--font-inter)" }}>
                <textPath href="#team-circle-text">TRÊS LETRAS, INFINITAS POSSIBILIDADES.</textPath>
              </text>
            </svg>
          </div>

          <ul className="team-list flex flex-col gap-[5px]">
            {members.map((member) => {
              const isActive = member.id === activeId;
              return (
                <li key={member.id}>
                  <button
                    type="button"
                    className={`team-item group flex w-full cursor-pointer items-center gap-4 border border-[var(--orange)] px-3 text-left transition-[background-color] duration-300 sm:gap-6 sm:px-4 ${isActive ? "bg-[var(--orange)]" : "bg-transparent hover:bg-[var(--orange)]/10"}`}
                    style={{ paddingTop: "clamp(5px, 1.1svh, 14px)", paddingBottom: "clamp(5px, 1.1svh, 14px)" }}
                    onMouseEnter={() => onEnter(member.id)}
                    onFocus={() => onEnter(member.id)}
                  >
                    <span
                      className={`min-w-0 flex-1 font-medium text-[clamp(13px,min(1.4vw,2.2svh),28px)] transition-colors duration-300 ${isActive ? "text-white" : "text-white/90 group-hover:text-white"}`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {member.name}
                    </span>
                    <span
                      className={`shrink-0 text-right text-[clamp(13px,1.35vw,26px)] transition-colors duration-300 ${isActive ? "text-white/80" : "text-white/40 group-hover:text-white/55"}`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {member.role}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            className="w-full border border-[var(--orange)] px-3 text-left text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--orange)] transition-all duration-300 hover:bg-[var(--orange)]/10 sm:px-4"
            style={{ marginTop: "clamp(0.75rem, 2svh, 2.5rem)", fontFamily: "var(--font-inter)", paddingTop: "clamp(5px, 1.1svh, 14px)", paddingBottom: "clamp(5px, 1.1svh, 14px)" }}
          >
            + Ver mais
          </button>
        </div>

        <div className="team-photo order-1 z-10 w-full p-px will-change-transform md:order-1 md:self-stretch">
          <div
            className="team-photo-frame relative w-full overflow-hidden bg-[#1a1a1a]
              h-[min(58svh,680px)] max-md:mx-auto max-md:max-w-[min(100%,520px)]
              md:h-[min(80svh,900px)] md:max-w-none"
          >
            {members.map((member) => {
              const visible = member.id === activeId;
              return (
                <div
                  key={member.id}
                  className={`absolute inset-0 transition-[opacity,transform] duration-500 ease-out ${visible ? "z-10 scale-100 opacity-100" : "z-0 scale-[1.03] opacity-0"}`}
                  aria-hidden={!visible}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-[center_18%]"
                    sizes="(max-width: 768px) 92vw, 55vh"
                    priority={member.id === members[0]?.id}
                  />
                </div>
              );
            })}
          </div>
          {activeMember?.bio ? (
            <p
              className="reveal-text mt-px px-px text-xs text-white/45 sm:text-sm"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {activeMember.bio}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}