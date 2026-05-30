"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import ClientsMarquee from "@/components/ClientsMarquee";
import TeamSection, { TEAM_MEMBERS } from "@/components/TeamSection";
import PhotoDriftStrip from "@/components/PhotoDriftStrip";
import EstamosAquiSection from "@/components/EstamosAquiSection";
import PageFooter from "@/components/PageFooter";
gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Manifesto — bloco 1: foto 60%; bloco 2: 50/50 (desproporção vs. coluna de cima). */
const MANIFESTO_GRID_PHOTO = "md:grid-cols-[minmax(0,60%)_minmax(0,1fr)]";
const MANIFESTO_GRID_TEXT = "md:grid-cols-2";

/** Hero `head` — Figma node 1:21 (grupo 2053×1417). */
const HERO_HEAD_FIGMA = { w: 2053, h: 1417 } as const;
const HERO_SER360_FIGMA = {
  box: { x: 247.08, y: 444.48, w: 457, h: 127.66 },
  marker: { x: 620.72, y: 371.37, w: 83.37, h: 15.09 },
} as const;
/** Mesma escala das duas chamadas do hero (Ser 360 + É fazer). */
const HERO_TAGLINE_FONT = "clamp(0.72rem, 1.76vw, 2.24rem)";
const HERO_SER360_RIGHT_VW =
  ((HERO_SER360_FIGMA.box.x + HERO_SER360_FIGMA.box.w) / HERO_HEAD_FIGMA.w) * 100;
const HERO_SER360_WIDTH_VW = (HERO_SER360_FIGMA.box.w / HERO_HEAD_FIGMA.w) * 100;
const HERO_SER360_TOP_PCT = (HERO_SER360_FIGMA.box.y / HERO_HEAD_FIGMA.h) * 100;
const HERO_SER360_MARKER_LEFT_PCT =
  ((HERO_SER360_FIGMA.marker.x - HERO_SER360_FIGMA.box.x) / HERO_SER360_FIGMA.box.w) * 100;

/** Largura de arte / protótipo alinhada à navbar (px-8 md:px-16). */
const FRAME = "max-w-[1440px] mx-auto w-full";

// cada slide ocupa pelo menos uma viewport
const SECTION_SCREEN =
  "min-h-[100svh] w-full max-w-[100vw] overflow-x-hidden";

/** Imagem do edifício / fachada AMP (public). */
const MANIFESTO_BUILDING_SRC =
  "/freepik_aplique-efeitos-fotografi_2853326270%201.png";

const PHOTOS = [
  { src: "/assets/ambiente/01.jpeg", label: "Ambiente AMP" },
  { src: "/assets/ambiente/02.jpeg", label: "Ambiente AMP" },
  { src: "/assets/ambiente/03.jpeg", label: "Ambiente AMP" },
  { src: "/assets/ambiente/04.jpeg", label: "Ambiente AMP" },
  { src: "/assets/ambiente/05.jpeg", label: "Ambiente AMP" },
  { src: "/assets/ambiente/06.jpeg", label: "Ambiente AMP" },
  { src: "/assets/ambiente/07.jpeg", label: "Ambiente AMP" },
  { src: "/assets/ambiente/08.jpeg", label: "Ambiente AMP" },
  { src: "/assets/ambiente/09.jpg", label: "Ambiente AMP" },
  { src: "/assets/ambiente/10.jpg", label: "Ambiente AMP" },
];

const MANIFESTO_INTRO =
  "Ser uma agência de marketing 360 vai além de reunir serviços sob o mesmo teto. Trata-se de operar como um verdadeiro hub de marketing, sendo um sistema onde cada frente conversa, se alimenta e evolui em conjunto.";

const MANIFESTO_LONG = `Sabemos bem como funciona: branding sem performance é só um quadro bonito na parede, e performance sem branding é queimar recurso com quem não vai lembrar o seu nome amanhã.

Na AMP, acreditamos que tudo precisa estar interligando e falando a mesma língua. Então um conteúdo só pode ser eficaz se trouxer público qualificado, e a tecnologia só faz sentido se a experiência do seu cliente for tão fluida e intuitiva que ele nem perceba o que está sendo vendido.

É assim que pegamos aquele monte de ações soltas que você fazia antes e transforma em uma operação de verdade. Com clareza para você decidir, eficiência para o seu time respirar e crescimento para o seu caixa sentir o impacto.

No fim das contas, entregamos o que falta em quase toda agência por aí: coerência.`;

const QUOTE_DECADA =
  "Ao longo de mais de uma década, a AMP entendeu que resultados consistentes não nascem de esforços isolados.";

const QUOTE_CRIATIVO =
  "Aqui, o criativo não caminha sem o dado. E os dados não existem sem direção estratégica.";

const BRIDGE_HARMONIA =
  "Eles nascem da harmonia entre estratégia, criatividade e análise.";

/**
 * Navbar fixa ocupa ~80px no topo — seções não-hero precisam desse respiro.
 * Respiro abaixo do título e entre copy e logos (entram no cálculo do título).
 */
const NAV_OFFSET = "clamp(5rem, 9svh, 6rem)";
const CLIENTS_SECTION_PAD_TOP = NAV_OFFSET;
const CLIENTS_TITLE_GAP = "clamp(2rem, 4.5svh, 3.5rem)";
const CLIENTS_COPY_GAP = "clamp(2rem, 4svh, 3rem)";
const CLIENTS_COPY_FONT = "clamp(1.9rem, min(2.9vw, 3.1svh), 3.5rem)";
/** Largura total da viewport — título pode usar mais área horizontal. */
const CLIENTS_TITLE_FONT =
  `min(13rem, 13.2vw, 32svh, calc((100svh - ${NAV_OFFSET} - 1svh - clamp(2rem, 4.5svh, 3.5rem) - clamp(5rem, 18svh, 10rem) - clamp(2rem, 4svh, 3rem) - clamp(10rem, 22svh, 13rem)) / 1.28))`;
const CLIENTS_TITLE_STYLE = {
  fontFamily: "var(--font-darker-grotesque)",
  fontSize: CLIENTS_TITLE_FONT,
  lineHeight: 0.72,
  letterSpacing: "-0.05em",
} as const;

const CLIENTS_COPY =
  "Grandes nomes não aceitam amadorismo. Se elas confiam a estratégia de crescimento delas à AMP, talvez você devesse se perguntar por que a sua marca ainda não está aqui.";

const gibson = TEAM_MEMBERS.find((m) => m.id === "gibson");

export default function QuemSomos() {
  const pageRef = useRef<HTMLDivElement>(null);

  // ─── Section-snap via Lenis (sem CSS scroll-snap, que conflita com Lenis) ───
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]")
    );
    if (!sections.length) return;

    let isAnimating = false;

    /** Retorna o índice da seção mais próxima do topo visível. */
    const getActiveIdx = (): number => {
      const threshold = window.scrollY + window.innerHeight * 0.35;
      let idx = 0;
      for (let i = 0; i < sections.length; i++) {
        // getBCR + scrollY gives the correct document position for sticky/absolute elements
        const docTop = sections[i].getBoundingClientRect().top + window.scrollY;
        if (docTop <= threshold) idx = i;
      }
      return idx;
    };

    const goTo = (idx: number) => {
      if (isAnimating || idx < 0 || idx >= sections.length) return;
      isAnimating = true;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).__lenis;
      lenis?.scrollTo(sections[idx], {
        duration: 1.35,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        lock: true,          // bloqueia scroll extra enquanto anima
        onComplete: () => { isAnimating = false; },
      });

      // fallback: libera flag após 1.8 s caso onComplete não dispare
      setTimeout(() => { isAnimating = false; }, 1800);
    };

    const onWheel = (e: WheelEvent) => {
      if (isAnimating || Math.abs(e.deltaY) < 20) return;
      const idx = getActiveIdx();
      const section = sections[idx];

      // Seções com data-free-scroll: scroll livre interno, snap apenas nas bordas
      if (section?.dataset.freeScroll !== undefined) {
        const rect = section.getBoundingClientRect();
        const atBottom = e.deltaY > 0 && rect.bottom <= window.innerHeight + 60;
        const atTop    = e.deltaY < 0 && rect.top    >= -60;
        if (!atBottom && !atTop) return;
        if (atBottom) goTo(idx + 1);
        else          goTo(idx - 1);
        return;
      }

      if (e.deltaY > 0) goTo(idx + 1);
      else goTo(idx - 1);
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (isAnimating) return;
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 40) return;
      const idx = getActiveIdx();
      const section = sections[idx];

      if (section?.dataset.freeScroll !== undefined) {
        const rect = section.getBoundingClientRect();
        const atBottom = dy > 0 && rect.bottom <= window.innerHeight + 60;
        const atTop    = dy < 0 && rect.top    >= -60;
        if (!atBottom && !atTop) return;
        if (atBottom) goTo(idx + 1);
        else          goTo(idx - 1);
        return;
      }

      if (dy > 0) goTo(idx + 1);
      else goTo(idx - 1);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  useGSAP(() => {
    // ─────────────────────────────────────────────────────────────────────────
    // HERO — anima no load (sem ScrollTrigger)
    // ─────────────────────────────────────────────────────────────────────────
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .fromTo(".hero-tag-marker",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power2.inOut" })
      .fromTo(".hero-tag-line",
        { y: "108%" },
        { y: "0%", duration: 1.5, stagger: 0.28 }, "<0.18")
      .fromTo(".hero-quem-wrap",
        { x: -36 },
        { x: 0, duration: 1.1 }, "-=1.4")
      .fromTo(".hero-quem",
        { scale: 1.24, opacity: 0, filter: "blur(16px)", transformOrigin: "left center" },
        { scale: 1,    opacity: 1, filter: "blur(0px)",  duration: 1.4 }, "-=0.2")
      .fromTo(".hero-center-cluster",
        { opacity: 0, scale: 1.06, y: 28 },
        { opacity: 1, scale: 1,    y: 0,  duration: 1.4 }, "-=1.1")
      .fromTo(".hero-somos-wrap",
        { x: 36 },
        { x: 0, duration: 1.1 }, "-=1.15")
      .fromTo(".hero-somos",
        { scale: 1.24, opacity: 0, filter: "blur(16px)", transformOrigin: "left center" },
        { scale: 1,    opacity: 1, filter: "blur(0px)",  duration: 1.4 }, "-=1.2")
      .fromTo(".hero-tagline-marker",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, "-=0.8")
      .fromTo(".hero-tagline-line",
        { y: "108%" },
        { y: "0%", duration: 1.5, stagger: 0.28 }, "<0.18");

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
    // QUOTES LARANJA — desliza da esquerda (play once ao entrar no viewport)
    // Não usa scrub pois com section-snap o progresso completaria sem ser visto
    // ─────────────────────────────────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>(".reveal-quote").forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, x: -80 },
        {
          opacity: 1, x: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Citação criativo — trigger no bloco inteiro: entra cedo, fica visível no meio, só sai ao deixar o bloco
    gsap.utils.toArray<HTMLElement>(".reveal-quote-criativo").forEach((el) => {
      const block = el.closest(".manifesto-block-2");
      if (!block) return;

      gsap.set(el, { autoAlpha: 0, xPercent: -105 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: block,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          el,
          { autoAlpha: 0, xPercent: -105 },
          { autoAlpha: 1, xPercent: 0, duration: 0.12, ease: "none" }
        )
        .to(el, { autoAlpha: 1, xPercent: 0, duration: 0.76, ease: "none" })
        .to(el, { autoAlpha: 0, xPercent: -105, duration: 0.12, ease: "none" });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // MANIFESTO — parallax na foto do edifício
    // ─────────────────────────────────────────────────────────────────────────
    gsap.to(".manifesto-building-inner", {
      yPercent: 10,
      scale: 1.08,
      ease: "none",
      scrollTrigger: {
        trigger: ".manifesto-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // MANIFESTO — coluna direita (texto longo) parallax suave
    gsap.fromTo(
      ".manifesto-slide-2-parallax",
      { yPercent: 6 },
      {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: ".manifesto-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.85,
        },
      }
    );

    // MANIFESTO — fade de entrada na borda superior (sem deslocar a seção)
    gsap.fromTo(".manifesto-section",
      { opacity: 0.4 },
      {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".manifesto-section",
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
      }
    );

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
    // ESTAMOS AQUI — play once ao entrar (scrub conflita com section-snap)
    // ─────────────────────────────────────────────────────────────────────────
    gsap.timeline({
      scrollTrigger: {
        trigger: ".estamos-aqui",
        start: "top bottom",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power3.out" },
    })
      .fromTo(".estamos-title",
        { opacity: 0, y: 60, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0 }
      )
      .fromTo(".estamos-text",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9 },
        "<0.25"
      )
      .fromTo(".state-item",
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.7, stagger: 0.07 },
        "<0.2"
      )
      .fromTo(".map-svg",
        { scale: 0.88, opacity: 0, rotation: -3, transformOrigin: "center center" },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.1, ease: "power2.out" },
        "<0.15"
      );

    // ─────────────────────────────────────────────────────────────────────────
    // EM EXCELENTE COMPANHIA — slide horizontal + blur
    // once:true garante disparo mesmo com section-snap (seção pula direto pro topo)
    // ─────────────────────────────────────────────────────────────────────────
    gsap.timeline({
      scrollTrigger: {
        trigger: ".clients-section",
        start: "top 40%",
        once: true,
      },
      defaults: { ease: "power3.out" },
    })
      .fromTo(".clients-title-1",
        { x: 140, opacity: 0, filter: "blur(12px)" },
        { x: 0, opacity: 1, filter: "blur(0px)", duration: 1.2 }
      )
      .fromTo(".clients-title-2",
        { x: -140, opacity: 0, filter: "blur(12px)" },
        { x: 0, opacity: 1, filter: "blur(0px)", duration: 1.2 },
        "<0.22"
      )
      .fromTo(".clients-sub",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.0 },
        "<0.35"
      );

  }, { scope: pageRef });

  return (
    <SmoothScroll>
      <div ref={pageRef} className="bg-[#181818] text-white">
        <Navbar />

        {/* ══════════════════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════════════════ */}
        <section
          data-section
          className={`hero-section relative ${SECTION_SCREEN} overflow-hidden bg-[#141414] h-[100svh] min-h-[100svh]`}
        >
          {/* ── Glow ambiente atrás da foto ─────────────────────────────── */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[48%] z-[2] h-[60vh] w-[50vw]
                       -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,77,0,0.22) 0%, rgba(255,77,0,0.08) 40%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* SOMOS — esquerda, sangra pela borda esquerda (espelho do QUEM que sangra pela direita) */}
          <div
            className="hero-somos-wrap pointer-events-none absolute left-0 z-[3] flex justify-start will-change-transform"
            style={{ top: "31%" }}
          >
            {/* width=0.65em ≈ largura do glifo "O/M" em Darker Grotesque Black; height=1.15em = retrato esticado acima/abaixo das letras */}
            <h1
              aria-label="SOMOS"
              className="hero-somos text-[var(--orange)] font-black uppercase leading-[0.78] tracking-[-0.04em] whitespace-nowrap"
              style={{
                fontFamily: "var(--font-darker-grotesque)",
                fontSize: "clamp(3rem, 25vw, 40rem)",
                transform: "translateX(-2vw)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span aria-hidden>SOM</span>
              <span
                aria-hidden
                style={{
                  display: "inline-block",
                  width: "0.65em",
                  height: "calc(1em * 0.92)",
                  position: "relative",
                  flexShrink: 0,
                  overflow: "visible",
                  marginTop: "0.195em",
                }}
              >
                {/* container de clip separado para não cortar o crédito */}
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    overflow: "hidden",
                    borderRadius: "clamp(3px, 0.25vw, 6px)",
                    boxShadow: "0 0 60px rgba(255,77,0,0.6), 0 0 130px rgba(255,77,0,0.25)",
                    display: "block",
                    marginLeft: "8px"
                  }}
                >
                  <Image
                    src={gibson?.fotos[0] ?? ""}
                    alt=""
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center 45%" }}
                    sizes="(max-width: 768px) 25vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/40 via-transparent to-transparent" />
                </span>

                {/* Crédito ancorado à direita da imagem inline */}
                {/* textTransform/letterSpacing/fontWeight resetam a herança do h1 */}
                <div
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
                      style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.85rem, 1.3vw, 1.5rem)" }}
                    >
                      {gibson?.nome_completo.toUpperCase()}
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
                      {gibson?.funcao}
                    </p>
                  </div>
                </div>
              </span>
              <span aria-hidden>S</span>
            </h1>
          </div>

          {/* QUEM — direita, sangra para fora da tela */}
          <div
            className="hero-quem-wrap pointer-events-none absolute right-0 z-[6] flex justify-end will-change-transform"
            style={{ top: "calc(-6vw)" }}
          >
            <h1
              className="hero-quem text-[var(--orange)] font-black uppercase leading-[0.78] tracking-[-0.04em] whitespace-nowrap"
              style={{
                fontFamily: "var(--font-darker-grotesque)",
                fontSize: "clamp(3rem, 27vw, 44rem)",
                transform: "translateX(2vw)",
              }}
            >
              QUEM
            </h1>
          </div>


          {/* SER 360 — Figma 1:24: caixa x247 w457, texto à direita; borda direita ~34.3vw */}
          <div
            className="hero-tag-block absolute z-20"
            style={{
              left: `max(1rem, calc(${HERO_SER360_RIGHT_VW}vw - min(${HERO_SER360_WIDTH_VW}vw, 28.5rem)))`,
              top: `${HERO_SER360_TOP_PCT}%`,
              width: `min(${HERO_SER360_WIDTH_VW}vw, 28.5rem)`,
            }}
          >
            <div className="relative">
              <div
                className="hero-tag-marker absolute bg-[var(--orange)]"
                aria-hidden
                style={{
                  left: `${HERO_SER360_MARKER_LEFT_PCT}%`,
                  bottom: "calc(100% + clamp(0.45rem, 1.1em, 1.25rem))",
                  width: `${(HERO_SER360_FIGMA.marker.w / HERO_SER360_FIGMA.box.w) * 100}%`,
                  height: "clamp(10px, 0.78vw, 15px)",
                  transformOrigin: "left center",
                }}
              />
              <p
                className="hero-tag text-right font-bold uppercase leading-[1.1] tracking-[0.06em] text-white"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: HERO_TAGLINE_FONT,
                }}
              >
                <span style={{ display: "block", overflow: "hidden" }}>
                  <span className="hero-tag-line" style={{ display: "inline-block" }}>Ser 360 não é</span>
                </span>
                <span style={{ display: "block", overflow: "hidden" }}>
                  <span className="hero-tag-line" style={{ display: "inline-block" }}>oferecer tudo.</span>
                </span>
              </p>
            </div>
          </div>

          {/* É FAZER — abaixo do SOMOS, direita */}
          <div
            className="absolute z-20 flex flex-col items-end gap-3"
            style={{ right: "clamp(80px, 25vw, 140px)", bottom: "4%" }}
          >
            <div
              className="hero-tagline-marker self-start h-[14px] w-10 bg-[var(--orange)]"
              aria-hidden
              style={{ transformOrigin: "left center" }}
            />
            <p
              className="hero-tagline font-bold uppercase text-white"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: HERO_TAGLINE_FONT,
                letterSpacing: "0.06em",
                lineHeight: 1.1,
              }}
            >
              <span style={{ display: "block", overflow: "hidden" }}>
                <span className="hero-tagline-line" style={{ display: "inline-block" }}>É fazer tudo</span>
              </span>
              <span style={{ display: "block", overflow: "hidden" }}>
                <span className="hero-tagline-line" style={{ display: "inline-block" }}>funcionar junto.</span>
              </span>
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            MANIFESTO — seção única com scroll livre (flip ao entrar)
        ══════════════════════════════════════════════════════════════════ */}
        <section
          data-section
          data-free-scroll
          className="manifesto-section w-full bg-[#141414]"
          style={{
            position: "relative",
            boxShadow: "0 -32px 80px rgba(0,0,0,0.7)",
            paddingTop: NAV_OFFSET,
            paddingBottom: "clamp(1.5rem, 4svh, 5rem)",
          }}
        >
          {/* ── Bloco 1: foto + quote da década + intro ── */}
          <div
            className={`grid w-full max-w-none grid-cols-1 items-center gap-0 md:items-stretch md:gap-0 ${MANIFESTO_GRID_PHOTO}`}
            style={{ marginBottom: "clamp(2rem, 6svh, 5rem)" }}
          >
            <div className="relative min-h-[240px] w-full overflow-hidden rounded-sm ring-1 ring-white/[0.08] sm:min-h-[320px] md:min-h-[min(50svh,460px)]">
              <div className="manifesto-building-inner absolute inset-0 will-change-transform">
                <Image
                  src={MANIFESTO_BUILDING_SRC}
                  alt="Fachada AMP ao entardecer"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col" style={{ gap: "clamp(1rem, 2.5svh, 2.5rem)" }}>
              <div className="manifesto-marker-wrap w-full">
                <p
                  className="reveal-quote m-0 ml-10 mr-15 max-w-none font-black uppercase tracking-[-0.06em] text-[var(--ink)]"
                  style={{
                    fontFamily: "var(--font-darker-grotesque)",
                    fontSize: "clamp(1.05rem, 2.7vw, 3.25rem)",
                  }}
                >
                  <span className="marker-quote-bg">{QUOTE_DECADA}</span>
                </p>
              </div>

              <div className="flex flex-col gap-6 px-5 pb-8 sm:px-8 lg:px-10 lg:pb-0">
                <p
                  className="reveal-text text-[var(--cream)] font-bold uppercase leading-snug tracking-[0.04em]
                             text-[clamp(14px,1.65vw,32px)]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {BRIDGE_HARMONIA}
                </p>
                <p
                  className="reveal-text text-[var(--cream)]/90 font-medium leading-[2.2] text-[clamp(15px,1.45vw,28px)]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {MANIFESTO_INTRO}
                </p>
              </div>
            </div>
          </div>

          {/* ── Bloco 2: quote criativo + texto longo (citação no topo do bloco) ── */}
          <div
            className={`manifesto-block-2 grid w-full max-w-none grid-cols-1 items-start gap-0 md:items-start md:gap-0 ${MANIFESTO_GRID_TEXT}`}
          >
            <div className="manifesto-marker-wrap manifesto-quote-criativo-wrap mt-[25px] flex w-full items-start justify-start overflow-hidden pb-8 sm:pb-10 lg:pb-12">
              <p
                className="reveal-quote-criativo m-0 ml-10 max-w-none font-black uppercase tracking-[-0.06em] text-[var(--ink)] will-change-transform"
                style={{
                  fontFamily: "var(--font-darker-grotesque)",
                  fontSize: "clamp(1.05rem, 2.7vw, 3.25rem)",
                }}
              >
                <span className="marker-quote-bg">{QUOTE_CRIATIVO}</span>
              </p>
            </div>

            <div className="manifesto-slide-2-parallax will-change-transform px-5 sm:px-8 lg:px-10"
                 style={{ paddingTop: 0, paddingBottom: "clamp(0.75rem, 2svh, 2.5rem)" }}>
              <p
                className="reveal-text whitespace-pre-line text-[var(--cream)]/90 font-medium leading-[1.8] lg:leading-[2.2]
                           text-[clamp(15px,1.45vw,28px)]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {MANIFESTO_LONG}
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            PHOTO DRIFT — loop infinito, sangra na tela, pausa ao clicar
        ══════════════════════════════════════════════════════════════════ */}
        <section
          data-section
          className={`photo-drift-section ${SECTION_SCREEN} flex flex-col justify-center overflow-x-clip overflow-y-visible pb-8 pt-20 sm:pb-10 sm:pt-24`}
        >
          <div className="-my-12 w-[100vw] max-w-none overflow-x-clip sm:-my-16 md:-my-20">
            <PhotoDriftStrip photos={PHOTOS} />
          </div>
        </section>
        <TeamSection />

        <EstamosAquiSection />

        {/* ══════════════════════════════════════════════════════════════════
            EM EXCELENTE COMPANHIA
        ══════════════════════════════════════════════════════════════════ */}
        <section
          data-section
          className="clients-section grid h-[100svh] min-h-[100svh] max-h-[100svh] w-[100vw] max-w-[100vw] grid-rows-[auto_auto_1fr] overflow-hidden bg-white text-[var(--ink)]"
          style={{
            paddingTop: CLIENTS_SECTION_PAD_TOP,
            paddingBottom: "1svh",
          }}
        >
          {/* Título edge-to-edge (0px das bordas laterais) */}
          <div
            className="clients-title relative z-10 w-full shrink-0 overflow-x-clip px-0"
            style={{ paddingBottom: CLIENTS_TITLE_GAP }}
          >
            <div style={{ overflow: "hidden" }}>
              <h2
                className="clients-title-1 block w-full text-right font-black uppercase whitespace-nowrap"
                style={CLIENTS_TITLE_STYLE}
              >
                Em excelente
              </h2>
            </div>
            <div style={{ overflow: "hidden" }}>
              <h2
                className="clients-title-2 block w-full text-left font-black uppercase whitespace-nowrap"
                style={{ ...CLIENTS_TITLE_STYLE, marginTop: "-0.04em" }}
              >
                companhia
              </h2>
            </div>
          </div>

          <div
            className="relative z-20 w-full min-h-0 shrink-0 px-0"
            style={{ marginBottom: CLIENTS_COPY_GAP }}
          >
            <p
              className="clients-sub relative z-20 w-full bg-white text-[var(--ink)]/85 font-medium leading-[1.85]
                         md:ml-[45.6%] md:max-w-none md:pr-0"
              style={{ fontFamily: "var(--font-inter)", fontSize: CLIENTS_COPY_FONT }}
            >
              {CLIENTS_COPY}
            </p>
          </div>

          {/* Logos — largura total da viewport */}
          <div className="relative z-0 flex min-h-0 w-full max-w-[100vw] flex-col justify-end self-stretch px-0 pb-[0.25svh]">
            <ClientsMarquee theme="light" fill />
          </div>
        </section>

        <PageFooter />
      </div>
    </SmoothScroll>
  );
}
