"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import ClientsMarquee from "@/components/ClientsMarquee";
import ZoomImage from "@/components/ZoomImage";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TEAM = [
  { name: "Jaím Re'Banis",   role: "Diretor de Criação" },
  { name: "Nome Sobrenome",  role: "Função" },
  { name: "Nome Sobrenome",  role: "Função" },
  { name: "Nome Sobrenome",  role: "Função" },
  { name: "Nome Sobrenome",  role: "Função" },
  { name: "Nome Sobrenome",  role: "Função" },
  { name: "Nome Sobrenome",  role: "Função" },
];

const STATES = ["Acre", "Amapá", "Amazonas", "Pará", "Rondônia", "Roraima"];

const PHOTOS = [
  { seed: "office01", label: "Escritório" },
  { seed: "meeting2", label: "Reunião de time" },
  { seed: "creative", label: "Ambiente criativo" },
];

export default function QuemSomos() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ─────────────────────────────────────────────────────────────────────────
    // HERO — anima no load (sem ScrollTrigger)
    // ─────────────────────────────────────────────────────────────────────────
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .fromTo(".hero-tag",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(".hero-quem-wrap",
        { x: -36 },
        { x: 0, duration: 1.1 }, "-=0.15")
      .fromTo(".hero-quem",
        { scale: 1.24, opacity: 0, filter: "blur(16px)", transformOrigin: "left center" },
        { scale: 1,    opacity: 1, filter: "blur(0px)",  duration: 1.4 }, "-=0.2")
      .fromTo(".hero-photo",
        { opacity: 0, scale: 1.1, y: 30 },
        { opacity: 1, scale: 1,   y: 0,  duration: 1.4 }, "-=1.1")
      .fromTo(".hero-somos-wrap",
        { x: 36 },
        { x: 0, duration: 1.1 }, "-=1.15")
      .fromTo(".hero-somos",
        { scale: 1.24, opacity: 0, filter: "blur(16px)", transformOrigin: "left center" },
        { scale: 1,    opacity: 1, filter: "blur(0px)",  duration: 1.4 }, "-=1.2")
      .fromTo(".hero-tagline",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, "-=0.8");

    // ─────────────────────────────────────────────────────────────────────────
    // PARALAXE no hero — foto desce levemente ao scrollar
    // ─────────────────────────────────────────────────────────────────────────
    gsap.to(".hero-photo", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // hero title no scroll — comeca alinhado e descola ao rolar
    gsap.to(".hero-quem-wrap", {
      xPercent: -22,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 0.9,
      },
    });

    gsap.to(".hero-somos-wrap", {
      xPercent: 22,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 0.9,
      },
    });

    // ─────────────────────────────────────────────────────────────────────────
    // TÍTULOS GRANDES — scale-down com scrub (bidirecional automatico)
    // ─────────────────────────────────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>(".reveal-title").forEach((el) => {
      gsap.fromTo(el,
        { scale: 1.2, opacity: 0, filter: "blur(14px)", transformOrigin: "left center" },
        {
          scale: 1, opacity: 1, filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            end: "top 45%",
            scrub: 1.2,
          },
        }
      );
    });

    // ─────────────────────────────────────────────────────────────────────────
    // TEXTO CORRIDO — fade + y com scrub
    // ─────────────────────────────────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>(".reveal-text").forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 55 },
        {
          opacity: 1, y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 94%",
            end: "top 60%",
            scrub: 0.8,
          },
        }
      );
    });

    // ─────────────────────────────────────────────────────────────────────────
    // QUOTES LARANJA — desliza da esquerda com scrub
    // ─────────────────────────────────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>(".reveal-quote").forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, x: -80 },
        {
          opacity: 1, x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );
    });

    // ─────────────────────────────────────────────────────────────────────────
    // PULL QUOTE GRANDE — aumenta de escala conforme scroll
    // ─────────────────────────────────────────────────────────────────────────
    gsap.fromTo(".pull-quote",
      { scale: 0.88, opacity: 0 },
      {
        scale: 1, opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".pull-quote",
          start: "top 90%",
          end: "top 30%",
          scrub: 1.5,
        },
      }
    );

    // ─────────────────────────────────────────────────────────────────────────
    // PHOTO GRID — cada foto entra em y diferente (paralaxe stagger)
    // ─────────────────────────────────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>(".photo-grid-item").forEach((el, i) => {
      // reveal com clip-path
      gsap.fromTo(el,
        { clipPath: "inset(100% 0% 0% 0%)", y: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)", y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".photo-grid",
            start: "top 90%",
            end: "top 40%",
            scrub: 0.6 + i * 0.2,  // velocidades diferentes por coluna
          },
        }
      );
    });

    // ─────────────────────────────────────────────────────────────────────────
    // TEXTO HORIZONTAL DESLIZANTE — "CRIATIVO · ESTRATÉGICO · ANALÍTICO ·"
    // ─────────────────────────────────────────────────────────────────────────
    gsap.to(".marquee-scroll-text", {
      xPercent: -40,
      ease: "none",
      scrollTrigger: {
        trigger: ".marquee-scroll-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // ─────────────────────────────────────────────────────────────────────────
    // TEAM LIST — stagger com scrub
    // ─────────────────────────────────────────────────────────────────────────
    gsap.fromTo(".team-item",
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0,
        ease: "none",
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".team-list",
          start: "top 88%",
          end: "top 40%",
          scrub: 0.8,
        },
      }
    );

    // foto do colaborador — paralaxe vertical suave
    gsap.fromTo(".team-photo",
      { y: -30 },
      {
        y: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".team-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // ─────────────────────────────────────────────────────────────────────────
    // ESTAMOS AQUI — mapa entra com scale + rotate leve
    // ─────────────────────────────────────────────────────────────────────────
    gsap.fromTo(".map-svg",
      { scale: 0.8, opacity: 0, rotation: -4, transformOrigin: "center center" },
      {
        scale: 1, opacity: 1, rotation: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".map-svg",
          start: "top 90%",
          end: "top 40%",
          scrub: 1.2,
        },
      }
    );

    // estados — stagger scrub
    gsap.fromTo(".state-item",
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0,
        ease: "none",
        stagger: 0.04,
        scrollTrigger: {
          trigger: ".states-list",
          start: "top 88%",
          end: "top 50%",
          scrub: 0.6,
        },
      }
    );

    // ─────────────────────────────────────────────────────────────────────────
    // EM EXCELENTE COMPANHIA — título desliza horizontalmente conforme scroll
    // ─────────────────────────────────────────────────────────────────────────
    gsap.fromTo(".clients-title",
      { x: 80, opacity: 0 },
      {
        x: 0, opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".clients-section",
          start: "top 90%",
          end: "top 40%",
          scrub: 1,
        },
      }
    );

    gsap.fromTo(".clients-sub",
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".clients-sub",
          start: "top 90%",
          end: "top 60%",
          scrub: 0.8,
        },
      }
    );

  }, { scope: pageRef });

  return (
    <SmoothScroll>
      <div ref={pageRef} className="bg-[#181818] text-white">
        <Navbar />

        {/* ══════════════════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════════════════ */}
        <section className="hero-section relative min-h-screen pt-28 pb-16 px-5 sm:px-8 md:px-16 overflow-hidden">

          <p className="hero-tag text-white/50 text-[10px] sm:text-xs uppercase tracking-[0.25em] mb-3"
             style={{ fontFamily: "var(--font-inter)" }}>
            Ser 360 não é oferecer tudo.
          </p>

          {/* QUEM */}
          <div className="hero-quem-wrap will-change-transform">
            <h1 className="hero-quem text-[#FF4D00] font-black uppercase leading-[0.9]"
                style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(64px, 15vw, 210px)" }}>
              QUEM
            </h1>
          </div>

          {/* SOMOS + foto sobrepostos */}
          <div className="relative flex items-end">
            <div className="hero-somos-wrap will-change-transform flex-1">
              <h1 className="hero-somos text-[#FF4D00] font-black uppercase leading-[0.9]"
                  style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(64px, 15vw, 210px)" }}>
                SOMOS
              </h1>
            </div>

            {/* Foto do diretor — oculta em telas < sm */}
            <div className="hero-photo hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 z-10"
                 style={{ width: "clamp(160px, 28vw, 400px)", marginTop: "clamp(-20px, -3vw, -50px)" }}>
              <ZoomImage
                src="https://picsum.photos/seed/director1/600/800"
                alt="Jaím Re'Banis — Diretor de Criação"
                className="w-full aspect-[3/4]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
                <div className="relative z-10">
                  <p className="text-white font-bold text-xs sm:text-sm"
                     style={{ fontFamily: "var(--font-darker-grotesque)" }}>
                    Jaím Re&apos;Banis
                  </p>
                  <p className="text-white/50 text-[10px] sm:text-xs"
                     style={{ fontFamily: "var(--font-inter)" }}>
                    Diretor de Criação
                  </p>
                </div>
              </ZoomImage>
            </div>
          </div>

          {/* Foto versão mobile — em flow, abaixo dos títulos */}
          <div className="sm:hidden mt-6 w-2/3 max-w-[260px]">
            <ZoomImage
              src="https://picsum.photos/seed/director1/600/800"
              alt="Jaím Re'Banis — Diretor de Criação"
              className="w-full aspect-[3/4]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
              <div className="relative z-10">
                <p className="text-white font-bold text-xs"
                   style={{ fontFamily: "var(--font-darker-grotesque)" }}>
                  Jaím Re&apos;Banis
                </p>
                <p className="text-white/50 text-[10px]" style={{ fontFamily: "var(--font-inter)" }}>
                  Diretor de Criação
                </p>
              </div>
            </ZoomImage>
          </div>

          {/* Taglines */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="hero-tagline text-white/70 text-sm sm:text-base font-medium max-w-xs"
               style={{ fontFamily: "var(--font-inter)" }}>
              É fazer tudo funcionar junto.
            </p>
            <div className="hero-tagline w-12 h-[2px] bg-[#FF4D00]" />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            MARQUEE SCROLL (texto horizontal deslizante)
        ══════════════════════════════════════════════════════════════════ */}
        <div className="marquee-scroll-section overflow-hidden py-6 sm:py-10 border-y border-white/8">
          <p className="marquee-scroll-text whitespace-nowrap text-white/10 font-black uppercase leading-none select-none"
             style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(60px, 10vw, 130px)" }}>
            CRIATIVO&nbsp;·&nbsp;ESTRATÉGICO&nbsp;·&nbsp;ANALÍTICO&nbsp;·&nbsp;
            CRIATIVO&nbsp;·&nbsp;ESTRATÉGICO&nbsp;·&nbsp;ANALÍTICO&nbsp;·&nbsp;
            CRIATIVO&nbsp;·&nbsp;ESTRATÉGICO&nbsp;·&nbsp;ANALÍTICO&nbsp;·&nbsp;
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            MANIFESTO
        ══════════════════════════════════════════════════════════════════ */}
        <section className="px-5 sm:px-8 md:px-16 py-16 sm:py-24 grid md:grid-cols-2 gap-10 md:gap-24">
          <div>
            <p className="reveal-quote text-[#FF4D00] font-black text-lg sm:text-xl md:text-2xl leading-snug uppercase"
               style={{ fontFamily: "var(--font-darker-grotesque)" }}>
              AO LONGO DE MAIS DE UMA DÉCADA, A AMP ENTENDEU QUE RESULTADOS
              CONSISTENTES NÃO NASCEM DE ESFORÇOS ISOLADOS.
            </p>
          </div>

          <div className="space-y-5">
            {[
              "Ser uma agência de marketing 360 vai além de oferecer serviços sob o mesmo teto. Trata-se de operar como um verdadeiro hub, sendo um sistema onde cada frente conversa, se alimenta e evolui em conjunto.",
              "Sabemos bem como funciona: branding sem performance é só um quadro bonito na parede, e a performance sem branding é recurso sem rosto. A harmonia da AMP conecta cada ponto — do criativo ao dado.",
              "No fim das contas, entregamos o que falta em quase toda agência por aí: coerência.",
            ].map((txt, i) => (
              <p key={i} className="reveal-text text-white/65 text-sm sm:text-base leading-relaxed"
                 style={{ fontFamily: "var(--font-inter)" }}>
                {txt}
              </p>
            ))}
          </div>
        </section>

        {/* Pull quote */}
        <div className="px-5 sm:px-8 md:px-16 pb-16 sm:pb-24">
          <p className="pull-quote text-[#FF4D00] font-black uppercase leading-tight border-l-4 border-[#FF4D00] pl-5 sm:pl-8"
             style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(20px, 4vw, 56px)" }}>
            AQUI, O CRIATIVO NÃO CAMINHA SEM O DADO, E OS DADOS NÃO EXISTEM SEM
            DIREÇÃO ESTRATÉGICA.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            PHOTO GRID
        ══════════════════════════════════════════════════════════════════ */}
        <section className="photo-grid px-5 sm:px-8 md:px-16 pb-8
                            grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {PHOTOS.map(({ seed, label }) => (
            <div key={seed} className="photo-grid-item overflow-hidden">
              <ZoomImage
                src={`https://picsum.photos/seed/${seed}/800/450`}
                alt={label}
                className="w-full aspect-video sm:aspect-[4/5]"
                overlayClassName="bg-black/20"
              />
            </div>
          ))}
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            TIME
        ══════════════════════════════════════════════════════════════════ */}
        <section className="team-section px-5 sm:px-8 md:px-16 py-16 sm:py-24
                            grid md:grid-cols-2 gap-10 md:gap-16">
          {/* Foto */}
          <div className="team-photo">
            <ZoomImage
              src="https://picsum.photos/seed/member01/600/800"
              alt="Colaborador"
              className="w-full sm:max-w-sm aspect-[3/4]"
            />
            <p className="reveal-text mt-4 text-white/45 text-xs sm:text-sm"
               style={{ fontFamily: "var(--font-inter)" }}>
              Aqui vai um breve histórico da jornada profissional do colaborador.
            </p>
          </div>

          {/* Lista */}
          <div>
            <div className="relative mb-8 sm:mb-12">
              <h2 className="reveal-title text-white font-black uppercase leading-none"
                  style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(52px, 9vw, 130px)" }}>
                TIME
              </h2>
              <svg viewBox="0 0 120 120"
                   className="absolute top-0 right-0 w-14 sm:w-20 h-14 sm:h-20 opacity-25 animate-spin"
                   style={{ animationDuration: "14s" }}>
                <defs>
                  <path id="ct" d="M60,10 a50,50 0 1,1 -0.01,0" />
                </defs>
                <text fill="white" fontSize="11" letterSpacing="3"
                      style={{ fontFamily: "var(--font-inter)" }}>
                  <textPath href="#ct">NOSSAS TRÊS LETRAS · </textPath>
                </text>
              </svg>
            </div>

            <ul className="team-list divide-y divide-white/10">
              {TEAM.map((m, i) => (
                <li key={i}
                    className="team-item flex items-center justify-between py-3 sm:py-4 group cursor-pointer hover:pl-2 sm:hover:pl-3 transition-all duration-300">
                  <span className="font-bold text-white group-hover:text-[#FF4D00] transition-colors text-sm sm:text-base"
                        style={{ fontFamily: "var(--font-darker-grotesque)" }}>
                    {m.name}
                  </span>
                  <span className="text-white/35 text-xs group-hover:text-white/65 transition-colors"
                        style={{ fontFamily: "var(--font-inter)" }}>
                    {m.role}
                  </span>
                </li>
              ))}
            </ul>

            <button className="mt-6 sm:mt-8 text-[#FF4D00] text-xs font-bold uppercase tracking-widest
                               flex items-center gap-2 hover:gap-4 transition-all duration-300"
                    style={{ fontFamily: "var(--font-inter)" }}>
              + Ver mais
            </button>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            ESTAMOS AQUI
        ══════════════════════════════════════════════════════════════════ */}
        <section className="px-5 sm:px-8 md:px-16 py-16 sm:py-24 bg-[#111111]">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <h2 className="reveal-title text-white font-black uppercase leading-[0.9]"
                  style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(44px, 7vw, 100px)" }}>
                ESTAMOS
              </h2>
              <h2 className="reveal-title text-white font-black uppercase leading-[0.9] mb-6"
                  style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(44px, 7vw, 100px)" }}>
                AQUI
              </h2>

              <p className="reveal-text text-[#FF4D00] font-bold text-xs uppercase tracking-widest mb-2"
                 style={{ fontFamily: "var(--font-inter)" }}>
                Presença estratégica com alcance nacional
              </p>
              <p className="reveal-text text-white/55 text-xs sm:text-sm mb-8"
                 style={{ fontFamily: "var(--font-inter)" }}>
                Para quem pensa grande, o Brasil é logo ali. Com a AMP, o destino é sempre o topo.
              </p>

              <ul className="states-list space-y-0">
                {STATES.map((s) => (
                  <li key={s}
                      className="state-item flex items-center gap-3 py-2 border-b border-white/8">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s === "Amazonas" ? "bg-[#FF4D00]" : "bg-white/20"}`} />
                    <span className={`text-xs sm:text-sm font-medium ${s === "Amazonas" ? "text-[#FF4D00]" : "text-white/50"}`}
                          style={{ fontFamily: "var(--font-inter)" }}>
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mapa */}
            <div className="flex items-center justify-center mt-8 md:mt-0">
              <svg viewBox="0 0 400 450" className="map-svg w-full max-w-[320px] md:max-w-md">
                <path d="M200 30 L320 80 L370 160 L360 240 L310 310 L260 370 L200 410 L140 370 L90 310 L40 240 L30 160 L80 80 Z"
                      fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.15" />
                <path d="M120 100 L200 90 L230 140 L220 200 L160 210 L110 170 Z"
                      fill="#FF4D00" fillOpacity="0.85" />
                <text x="165" y="158" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold"
                      style={{ fontFamily: "var(--font-darker-grotesque)" }}>AM</text>
                {[
                  "M200 90 L270 80 L300 120 L280 160 L230 140 Z",
                  "M110 170 L160 210 L150 270 L100 280 L70 230 L80 180 Z",
                  "M220 200 L280 190 L300 250 L260 290 L210 270 L200 230 Z",
                  "M110 100 L120 100 L110 170 L80 180 L60 140 L80 100 Z",
                  "M150 60 L200 30 L200 90 L120 100 L110 100 L120 60 Z",
                ].map((d, i) => (
                  <path key={i} d={d} fill="white" fillOpacity="0.04"
                        stroke="white" strokeWidth="0.5" strokeOpacity="0.12" />
                ))}
              </svg>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            EM EXCELENTE COMPANHIA
        ══════════════════════════════════════════════════════════════════ */}
        <section className="clients-section px-5 sm:px-8 md:px-16 pt-16 sm:pt-24 pb-8">
          <div className="clients-title">
            <h2 className="text-white font-black uppercase leading-[0.9]"
                style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(36px, 7.5vw, 110px)" }}>
              EM EXCELENTE
            </h2>
            <h2 className="text-white font-black uppercase leading-[0.9] mb-8 sm:mb-12"
                style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(36px, 7.5vw, 110px)" }}>
              COMPANHIA
            </h2>
          </div>

          <p className="clients-sub text-white/45 text-xs sm:text-sm mb-12 sm:mb-16 max-w-lg"
             style={{ fontFamily: "var(--font-inter)" }}>
            Grandes nomes não acabaram amadorismo. Se eles confirmam a estratégia
            de crescimento com a AMP, talvez você devesse se perguntar por que a
            sua marca ainda não está aqui.
          </p>

          <div className="-mx-5 sm:-mx-8 md:-mx-16">
            <ClientsMarquee />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════════════════════════ */}
        <footer className="px-5 sm:px-8 md:px-16 py-12 sm:py-16 border-t border-white/8
                           flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <span className="font-black text-2xl sm:text-3xl text-[#FF4D00]"
                style={{ fontFamily: "var(--font-darker-grotesque)" }}>
            AMP
          </span>

          <div className="flex flex-wrap gap-4 sm:gap-8 md:gap-12 text-white/35 text-[10px] sm:text-xs uppercase tracking-widest"
               style={{ fontFamily: "var(--font-inter)" }}>
            {["Instagram", "LinkedIn", "Termos de uso", "Privacidade"].map((l) => (
              <a key={l} href="#" className="hover:text-white transition-colors duration-300">{l}</a>
            ))}
          </div>

          <p className="text-white/18 text-[10px]" style={{ fontFamily: "var(--font-inter)" }}>
            © {new Date().getFullYear()} AMP
          </p>
        </footer>
      </div>
    </SmoothScroll>
  );
}
