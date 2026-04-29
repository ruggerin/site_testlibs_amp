"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import ClientsMarquee from "@/components/ClientsMarquee";
import ZoomImage from "@/components/ZoomImage";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Largura de arte / protótipo alinhada à navbar (px-8 md:px-16). */
const FRAME = "max-w-[1440px] mx-auto w-full";

// cada slide ocupa pelo menos uma viewport
const SECTION_SCREEN =
  "min-h-[100svh] w-full max-w-[100vw] overflow-x-hidden";

/** Imagem do edifício / fachada AMP (public). */
const MANIFESTO_BUILDING_SRC =
  "/freepik_aplique-efeitos-fotografi_2853326270%201.png";

const TEAM = [
  { name: "Jalim Ra'Banis",   role: "diretor de criação" },
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

const CLIENTS_COPY =
  "Grandes nomes não aceitam amadorismo. Se elas confiam a estratégia de crescimento delas à AMP, talvez você devesse se perguntar por que a sua marca ainda não está aqui.";

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
        if (sections[i].offsetTop <= threshold) idx = i;
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
    // MANIFESTO — parallax na foto do edifício (slide 1)
    // ─────────────────────────────────────────────────────────────────────────
    gsap.to(".manifesto-building-inner", {
      yPercent: 10,
      scale: 1.08,
      ease: "none",
      scrollTrigger: {
        trigger: ".manifesto-slide-1",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // MANIFESTO — coluna direita do slide 2 desliza leve (parallax inverso)
    gsap.fromTo(
      ".manifesto-slide-2-parallax",
      { yPercent: 6 },
      {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: ".manifesto-slide-2",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.85,
        },
      }
    );

    // Sensação de "troca de página": slide inteiro ganha leve perspectiva ao entrar
    gsap.utils.toArray<HTMLElement>(".manifesto-slide-1, .manifesto-slide-2").forEach((slide) => {
      gsap.fromTo(
        slide,
        { opacity: 0.88 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: slide,
            start: "top 95%",
            end: "top 55%",
            scrub: 1.2,
          },
        }
      );
    });

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

          {/* SOMOS — esquerda, centro-baixo */}
          <div
            className="hero-somos-wrap pointer-events-none absolute left-0 z-[3] flex justify-start will-change-transform"
            style={{ top: "44%" }}
          >
            <h1
              className="hero-somos text-[var(--orange)] font-black uppercase leading-[0.78] tracking-[-0.04em] whitespace-nowrap"
              style={{
                fontFamily: "var(--font-darker-grotesque)",
                fontSize: "clamp(4.5rem, 32vw, 52rem)",
              }}
            >
              SOMOS
            </h1>
          </div>

          {/* QUEM — direita, colado ao topo */}
          <div
            className="hero-quem-wrap pointer-events-none absolute right-0 top-0 z-[6] flex justify-end will-change-transform"
          >
            <h1
              className="hero-quem text-[var(--orange)] font-black uppercase leading-[0.78] tracking-[-0.04em] whitespace-nowrap
                         translate-x-[1.5vw]"
              style={{
                fontFamily: "var(--font-darker-grotesque)",
                fontSize: "clamp(4rem, 28vw, 46rem)",
              }}
            >
              QUEM
            </h1>
          </div>

          {/* Retrato — centro da tela, sobrepõe QUEM (cima) e SOMOS (baixo) */}
          <div
            className="hero-photo absolute z-[11] will-change-transform -translate-x-1/2 -translate-y-1/2
                       left-[46%] top-[48%] w-[min(60vw,200px)]
                       sm:left-[47%] sm:top-[48%] sm:w-[min(26vw,280px)]
                       md:w-[min(22vw,300px)]
                       lg:w-[min(20vw,320px)]"
          >
            <div className="relative overflow-hidden rounded-sm
                            shadow-[0_0_60px_rgba(255,77,0,0.6),0_0_130px_rgba(255,77,0,0.25),0_0_260px_rgba(255,77,0,0.1)]
                            ring-1 ring-white/20">
              <ZoomImage
                src="/diretor_img.png"
                alt="Jalim Ra'Banis — diretor de criação"
                className="w-full aspect-[3/4]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/50 via-transparent to-transparent" />
              </ZoomImage>
              {/* Sparkle decorativo */}
              <span
                aria-hidden
                className="absolute bottom-3 right-3 text-white/70 select-none"
                style={{ fontSize: "clamp(10px, 1.2vw, 18px)" }}
              >✦</span>
            </div>
          </div>

          {/* Crédito — alinhado ao centro da foto */}
          <div
            className="hero-director-credit pointer-events-none absolute z-[12]
                       hidden sm:flex flex-row items-center gap-3
                       right-4 top-[44%] -translate-y-1/2
                       sm:right-6 md:right-10 lg:right-14"
          >
            <div className="h-px w-8 shrink-0 bg-[var(--orange)] opacity-90 md:w-12" aria-hidden />
            <div className="flex flex-col">
              <p
                className="font-bold leading-tight text-white"
                style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.85rem, 1.3vw, 1.5rem)" }}
              >
                Jalim Ra&apos;Banis
              </p>
              <p
                className="mt-1 font-semibold uppercase tracking-[0.22em] text-[var(--orange)]"
                style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(8px, 0.7vw, 11px)" }}
              >
                Diretor de criação
              </p>
            </div>
          </div>

          {/* SER 360 — esquerda, entre QUEM e SOMOS */}
          <div
            className="hero-tag-block absolute left-4 z-20
                       top-[30%]
                       sm:left-8 sm:top-[32%]
                       md:left-12 lg:left-16"
          >
            <div className="mb-2.5 h-[3px] w-10 bg-[var(--orange)] sm:w-14" aria-hidden />
            <p
              className="hero-tag font-bold uppercase leading-[1.15] tracking-[0.1em] text-white"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(0.75rem, 1.8vw, 1.75rem)",
                maxWidth: "min(48vw, 22rem)",
              }}
            >
              Ser 360 não é<br />oferecer tudo.
            </p>
          </div>

          {/* É FAZER — abaixo do SOMOS, direita */}
          <div
            className="absolute z-20 flex flex-col items-end gap-2
                       right-4 bottom-[6%]
                       sm:right-8 sm:bottom-[7%]
                       md:right-12 lg:right-16"
          >
            <div className="h-[2px] w-10 bg-[var(--orange)] sm:w-16" aria-hidden />
            <p
              className="hero-tagline text-right font-bold uppercase text-white"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(1rem, 2.6vw, 3.2rem)",
                letterSpacing: "0.06em",
                lineHeight: 1.1,
              }}
            >
              É fazer tudo<br />funcionar junto.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            MANIFESTO — slide 1 (imagem + citação / ponte / intro)
        ══════════════════════════════════════════════════════════════════ */}
        <section
          data-section
          className={`manifesto-slide-1 ${SECTION_SCREEN} flex flex-col justify-center bg-[#141414] py-14 sm:py-20`}
        >
          <div
            className="grid w-full max-w-none grid-cols-1 items-center gap-0 lg:grid-cols-2 lg:items-stretch lg:gap-0"
          >
            <div className="relative min-h-[240px] w-full overflow-hidden rounded-sm ring-1 ring-white/[0.08] sm:min-h-[320px] lg:min-h-[min(58vh,520px)]">
              <div className="manifesto-building-inner absolute inset-0 will-change-transform">
                <Image
                  src={MANIFESTO_BUILDING_SRC}
                  alt="Fachada AMP ao entardecer"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col gap-8 lg:gap-10">
              <div className="manifesto-marker-wrap w-full">
                <p
                  className="reveal-quote m-0 max-w-none font-black uppercase tracking-[-0.06em] text-[var(--ink)]"
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
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            MANIFESTO — slide 2 (citação + texto longo)
        ══════════════════════════════════════════════════════════════════ */}
        <section
          data-section
          className={`manifesto-slide-2 ${SECTION_SCREEN} flex flex-col justify-center bg-[#141414] py-14 sm:py-20`}
        >
          <div
            className="grid w-full max-w-none grid-cols-1 items-stretch gap-0 lg:grid-cols-2 lg:gap-0"
          >
            <div className="manifesto-marker-wrap flex w-full items-center py-8 sm:py-10 lg:min-h-0 lg:py-12">
              <p
                className="reveal-quote m-0 max-w-none font-black uppercase tracking-[-0.06em] text-[var(--ink)]"
                style={{
                  fontFamily: "var(--font-darker-grotesque)",
                  fontSize: "clamp(1.05rem, 2.7vw, 3.25rem)",
                }}
              >
                <span className="marker-quote-bg">{QUOTE_CRIATIVO}</span>
              </p>
            </div>

            <div className="manifesto-slide-2-parallax will-change-transform px-5 pb-8 pt-6 sm:px-8 lg:px-10 lg:pb-10 lg:pt-8">
              <p
                className="reveal-text whitespace-pre-line text-[var(--cream)]/90 font-medium leading-[2.2]
                           text-[clamp(15px,1.45vw,28px)]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {MANIFESTO_LONG}
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            PHOTO GRID
        ══════════════════════════════════════════════════════════════════ */}
        <section data-section className={`${SECTION_SCREEN} flex flex-col justify-center py-12 sm:py-16`}>
          <div
            className={`photo-grid ${FRAME} grid grid-cols-1 gap-2 px-5 sm:grid-cols-3 sm:gap-3 sm:px-8 md:gap-3 md:px-16`}
          >
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
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            TIME
        ══════════════════════════════════════════════════════════════════ */}
        <section data-section className={`${SECTION_SCREEN} team-section flex flex-col justify-center py-16 sm:py-20`}>
          <div className={`${FRAME} grid gap-12 px-5 sm:px-8 md:grid-cols-2 md:gap-20 md:px-16`}>
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
              <h2 className="reveal-title text-white font-black lowercase leading-[0.9] tracking-[-0.06em]"
                  style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(48px, 13vw, 156px)" }}>
                time
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

            <ul className="team-list divide-y divide-white/[0.08]">
              {TEAM.map((m, i) => (
                <li key={i}
                    className="team-item flex items-center py-3.5 sm:py-4 group cursor-pointer hover:pl-2 sm:hover:pl-3 transition-all duration-300">
                  <span className="font-medium text-white group-hover:text-[var(--orange)] transition-colors text-[clamp(15px,1.65vw,32px)]"
                        style={{ fontFamily: "var(--font-inter)" }}>
                    {m.name}
                    <span className="text-white/35 group-hover:text-white/55"> — </span>
                    <span className="text-white/40 group-hover:text-white/70">{m.role}</span>
                  </span>
                </li>
              ))}
            </ul>

            <button className="mt-8 sm:mt-10 text-[var(--orange)] text-[11px] font-bold uppercase tracking-[0.2em]
                               flex items-center gap-2 hover:gap-4 transition-all duration-300"
                    style={{ fontFamily: "var(--font-inter)" }}>
              + Ver mais
            </button>
          </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            ESTAMOS AQUI
        ══════════════════════════════════════════════════════════════════ */}
        <section data-section className={`${SECTION_SCREEN} flex flex-col justify-center bg-[#232323] py-16 sm:py-20`}>
          <div className={`${FRAME} grid items-center gap-12 px-5 sm:px-8 md:grid-cols-2 md:gap-20 md:px-16`}>
            <div>
              <h2 className="reveal-title text-[var(--cream)] font-black lowercase leading-[0.65] tracking-[-0.06em]"
                  style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(40px, 13vw, 156px)" }}>
                estamos
              </h2>
              <h2 className="reveal-title text-[var(--cream)] font-black lowercase leading-[0.65] tracking-[-0.06em] mb-8"
                  style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(40px, 13vw, 156px)" }}>
                aqui
              </h2>

              <p className="reveal-text text-[var(--cream)]/85 font-medium leading-[2.2] text-[clamp(14px,1.45vw,28px)] mb-10 max-w-xl"
                 style={{ fontFamily: "var(--font-inter)" }}>
                Presença estratégica com alcance nacional.
                <br />
                <br />
                Para quem pensa grande, o Brasil é logo ali e, com a AMP, o destino é sempre o topo.
              </p>

              <ul className="states-list space-y-0 lowercase">
                {STATES.map((s) => (
                  <li key={s}
                      className="state-item flex items-center gap-3 py-2.5 border-b border-white/[0.06]">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s === "Amazonas" ? "bg-[var(--orange)]" : "bg-white/18"}`} />
                    <span className={`text-[clamp(14px,1.65vw,32px)] font-medium ${s === "Amazonas" ? "text-[var(--orange)]" : "text-[var(--cream)]/55"}`}
                          style={{ fontFamily: "var(--font-inter)" }}>
                      {s.toLowerCase()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mapa */}
            <div className="flex items-center justify-center mt-8 md:mt-0">
              <svg viewBox="0 0 400 450" className="map-svg w-full max-w-[320px] md:max-w-md text-[var(--orange)]">
                <path d="M200 30 L320 80 L370 160 L360 240 L310 310 L260 370 L200 410 L140 370 L90 310 L40 240 L30 160 L80 80 Z"
                      fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.15" />
                <path d="M120 100 L200 90 L230 140 L220 200 L160 210 L110 170 Z"
                      fill="currentColor" fillOpacity="0.9" />
                <text x="165" y="158" textAnchor="middle" fill="#232332" fontSize="52" fontWeight="900"
                      style={{ fontFamily: "var(--font-darker-grotesque)" }}>am</text>
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
        <section
          data-section
          className={`${SECTION_SCREEN} clients-section flex flex-col justify-center bg-[var(--cream)] py-16 text-[var(--ink)] sm:py-20`}
        >
          <div className={`${FRAME} px-5 sm:px-8 md:px-16`}>
            <div className="clients-title">
              <h2 className="text-right font-black uppercase leading-[0.65] tracking-[-0.06em]"
                  style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(36px, 13vw, 156px)" }}>
                Em excelente
              </h2>
              <h2 className="font-black uppercase leading-[0.65] tracking-[-0.06em] mb-10 sm:mb-12"
                  style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(36px, 13vw, 156px)" }}>
                companhia
              </h2>
            </div>

            <p className="clients-sub text-[var(--ink)]/85 font-medium mb-14 sm:mb-16 max-w-[53ch] leading-[2.2]
                        text-[clamp(14px,1.45vw,28px)]"
               style={{ fontFamily: "var(--font-inter)" }}>
              {CLIENTS_COPY}
            </p>

            <div className="-mx-5 sm:-mx-8 md:-mx-16">
              <ClientsMarquee theme="light" />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════════════════════════ */}
        <footer className="bg-[#161616] text-[var(--orange)]">
          <div className={`${FRAME} px-5 sm:px-8 md:px-16 py-10 sm:py-12
                          flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8`}>
            <p className="text-[clamp(13px,1.1vw,20px)] leading-snug font-normal"
               style={{ fontFamily: "var(--font-inter)" }}>
              Agência AMP ® {new Date().getFullYear()}
              <br />
              Todos os direitos reservados.
            </p>

            <div className="flex flex-wrap gap-6 sm:gap-10 text-[clamp(13px,1.1vw,20px)] font-normal"
                 style={{ fontFamily: "var(--font-inter)" }}>
              <div className="text-right">
                <span className="block">Fale conosco</span>
                <a href="tel:+5592992345678" className="hover:opacity-80 transition-opacity">
                  +55 92 99234-5678
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-[10px] sm:text-xs uppercase tracking-widest text-[var(--orange)]/70"
                 style={{ fontFamily: "var(--font-inter)" }}>
              {["Instagram", "LinkedIn", "Termos", "Privacidade"].map((l) => (
                <a key={l} href="#" className="hover:text-[var(--cream)] transition-colors duration-300">{l}</a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
