"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, DrawSVGPlugin, CustomEase, useGSAP);

const EASINGS = [
  "none",
  "power1.out", "power2.out", "power3.out", "power4.out",
  "power1.in",  "power2.in",  "power3.in",  "power4.in",
  "power1.inOut","power2.inOut","power3.inOut","power4.inOut",
  "back.out(1.7)","back.in(1.7)","back.inOut(1.7)",
  "elastic.out(1,0.3)","elastic.in(1,0.3)",
  "bounce.out","bounce.in",
  "expo.out","expo.in","expo.inOut",
  "circ.out","circ.in","circ.inOut",
  "sine.out","sine.in","sine.inOut",
];

// ─────────────────────────────────────────────────────────────────────────────
export default function DemoAnimacoes() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [fmVisible, setFmVisible] = useState(false);
  const [activeEasing, setActiveEasing] = useState<string | null>(null);
  const easingDotRef = useRef<HTMLDivElement>(null);

  // FM parallax
  const parallaxSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: parallaxProgress } = useScroll({
    target: parallaxSectionRef,
    offset: ["start end", "end start"],
  });
  const fmParallaxY = useTransform(parallaxProgress, [0, 1], ["-18%", "18%"]);

  useGSAP(() => {
    // ── Hero entrada ────────────────────────────────────────────────────────
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .fromTo(".dh-tag",   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(".dh-word",  { opacity: 0, y: 60, skewY: 5 }, { opacity: 1, y: 0, skewY: 0, duration: 0.9, stagger: 0.12 }, "-=0.3")
      .fromTo(".dh-sub",   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
      .fromTo(".dh-links a", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, "-=0.4");

    // ── ST: reveal-title — scale + blur ────────────────────────────────────
    gsap.utils.toArray<HTMLElement>(".st-title").forEach((el) => {
      gsap.fromTo(el,
        { scale: 1.2, opacity: 0, filter: "blur(14px)", transformOrigin: "left center" },
        { scale: 1, opacity: 1, filter: "blur(0px)", ease: "none",
          scrollTrigger: { trigger: el, start: "top 90%", end: "top 45%", scrub: 1.2 } }
      );
    });

    // ── ST: reveal-text — fade + y ─────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>(".st-text").forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 55 },
        { opacity: 1, y: 0, ease: "none",
          scrollTrigger: { trigger: el, start: "top 92%", end: "top 60%", scrub: 0.8 } }
      );
    });

    // ── ST: reveal-quote — slide x ─────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>(".st-quote").forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, x: -80 },
        { opacity: 1, x: 0, ease: "none",
          scrollTrigger: { trigger: el, start: "top 92%", end: "top 50%", scrub: 1 } }
      );
    });

    // ── ST: clip-path inset ────────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>(".st-clip").forEach((el, i) => {
      gsap.fromTo(el,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none",
          scrollTrigger: { trigger: ".st-clip-grid", start: "top 88%", end: "top 35%", scrub: 0.5 + i * 0.2 } }
      );
    });

    // ── ST: parallax foto (GSAP) ────────────────────────────────────────────
    gsap.to(".st-parallax-inner", {
      yPercent: 22, ease: "none",
      scrollTrigger: { trigger: ".st-parallax-wrap", start: "top bottom", end: "bottom top", scrub: true },
    });

    // ── ST: stagger list ───────────────────────────────────────────────────
    gsap.fromTo(".st-list-item",
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, ease: "none", stagger: 0.06,
        scrollTrigger: { trigger: ".st-list", start: "top 88%", end: "top 40%", scrub: 0.8 } }
    );

    // ── ST: horizontal drift (xPercent) ────────────────────────────────────
    gsap.to(".st-drift-l", {
      xPercent: -20, ease: "none",
      scrollTrigger: { trigger: ".st-drift-section", start: "top bottom", end: "bottom top", scrub: 0.8 },
    });
    gsap.to(".st-drift-r", {
      xPercent: 20, ease: "none",
      scrollTrigger: { trigger: ".st-drift-section", start: "top bottom", end: "bottom top", scrub: 0.8 },
    });

    // ── ST: scale + rotate ─────────────────────────────────────────────────
    gsap.fromTo(".st-scale-rotate",
      { scale: 0.72, opacity: 0, rotation: -8, transformOrigin: "center center" },
      { scale: 1, opacity: 1, rotation: 0, ease: "none",
        scrollTrigger: { trigger: ".st-scale-rotate", start: "top 88%", end: "top 40%", scrub: 1.2 } }
    );

    // ── Marquee ────────────────────────────────────────────────────────────
    const tracks = gsap.utils.toArray<HTMLElement>(".demo-marquee-track");
    const tweens: gsap.core.Tween[] = [];
    tracks.forEach((track, i) => {
      const dir = i % 2 === 0 ? -1 : 1;
      const tw = gsap.to(track, {
        xPercent: -50 * dir, duration: 18 + i * 9, ease: "none", repeat: -1,
      });
      tweens.push(tw);
    });
    const mSection = document.querySelector(".demo-marquee-section");
    if (mSection) {
      mSection.addEventListener("mouseenter", () =>
        tweens.forEach((tw) => gsap.to(tw, { timeScale: 0.1, duration: 0.5, ease: "power2.out" }))
      );
      mSection.addEventListener("mouseleave", () =>
        tweens.forEach((tw) => gsap.to(tw, { timeScale: 1, duration: 0.8, ease: "power2.inOut" }))
      );
    }

    // ── Hover: zoom image (ZoomImage pattern) ──────────────────────────────
    document.querySelectorAll<HTMLElement>(".demo-zoom-wrap").forEach((wrap) => {
      const inner = wrap.querySelector<HTMLElement>(".demo-zoom-inner");
      if (!inner) return;
      wrap.addEventListener("mouseenter", () =>
        gsap.to(inner, { scale: 1.12, duration: 0.7, ease: "power2.out" })
      );
      wrap.addEventListener("mouseleave", () =>
        gsap.to(inner, { scale: 1, duration: 0.9, ease: "power2.inOut" })
      );
    });

    // ── Hover: card scale + border (LogoCard pattern) ──────────────────────
    document.querySelectorAll<HTMLElement>(".demo-card-hover").forEach((card) => {
      card.addEventListener("mouseenter", () =>
        gsap.to(card, { scale: 1.05, borderColor: "rgba(255,91,0,0.5)", duration: 0.3, ease: "power2.out" })
      );
      card.addEventListener("mouseleave", () =>
        gsap.to(card, { scale: 1, borderColor: "rgba(255,255,255,0.1)", duration: 0.4, ease: "power2.inOut" })
      );
    });

  }, { scope: pageRef });

  // ── Easing playground ────────────────────────────────────────────────────
  const playEasing = (easing: string) => {
    if (!easingDotRef.current || activeEasing) return;
    setActiveEasing(easing);
    gsap.fromTo(easingDotRef.current,
      { x: 0 },
      {
        x: 260, duration: 1.2, ease: easing,
        onComplete: () => {
          gsap.set(easingDotRef.current, { x: 0 });
          setActiveEasing(null);
        },
      }
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <SmoothScroll>
      <div ref={pageRef} className="bg-[#181818] text-white">

        {/* ══ HERO ════════════════════════════════════════════════════════════ */}
        <section className="min-h-[100svh] flex flex-col justify-center px-8 md:px-16 py-28 border-b border-white/[0.06]">
          <p className="dh-tag text-[var(--orange)] text-[11px] font-bold uppercase tracking-[0.3em] mb-8"
             style={{ fontFamily: "var(--font-inter)" }}>
            Catálogo de Animações · AMP Stack
          </p>

          <div className="overflow-hidden flex flex-wrap">
            {["Ani", "ma", "ções"].map((w, i) => (
              <span key={i}
                    className="dh-word font-black uppercase leading-[0.82] tracking-[-0.05em] inline-block"
                    style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(4rem, 16vw, 18rem)" }}>
                {w}
              </span>
            ))}
          </div>

          <p className="dh-sub mt-8 text-white/45 max-w-lg leading-[2] text-sm"
             style={{ fontFamily: "var(--font-inter)" }}>
            Referência de todos os efeitos disponíveis com{" "}
            <span className="text-[var(--orange)]">GSAP + ScrollTrigger</span>,{" "}
            <span className="text-[var(--orange)]">Framer Motion</span> e{" "}
            <span className="text-[var(--orange)]">Lenis</span>.
            Role para explorar cada técnica.
          </p>

          <nav className="dh-links mt-12 flex flex-wrap gap-2">
            {[
              ["Timeline", "#timeline"],
              ["ScrollTrigger", "#scrolltrigger"],
              ["Parallax", "#parallax"],
              ["Stagger", "#stagger"],
              ["Drift", "#drift"],
              ["Marquee", "#marquee"],
              ["Hover", "#hover"],
              ["Framer Motion", "#framer"],
              ["Easings", "#easings"],
              ["CSS", "#css"],
              ["SplitText", "#splittext"],
              ["Scramble", "#scramble"],
              ["Magnético", "#magnetic"],
              ["DrawSVG", "#drawsvg"],
            ].map(([label, href]) => (
              <a key={href} href={href}
                 className="px-4 py-2 border border-white/15 text-[11px] font-medium uppercase tracking-widest
                            hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors duration-300"
                 style={{ fontFamily: "var(--font-inter)" }}>
                {label}
              </a>
            ))}
          </nav>
        </section>

        {/* ══ 1. GSAP TIMELINE ════════════════════════════════════════════════ */}
        <section id="timeline" className="py-24 px-8 md:px-16 border-b border-white/[0.06]">
          <SectionLabel index="01" title="GSAP Timeline — entrada no load" />
          <Mono>gsap.timeline() · fromTo · stagger · skewY · blur · scale</Mono>

          <TimelineDemo />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { prop: "opacity + y",          desc: "fade + slide vertical, o mais comum" },
              { prop: "skewY + y",            desc: "skew de entrada — efeito editorial" },
              { prop: "scale + filter:blur",  desc: "zoom saindo do fundo, como no hero" },
            ].map(({ prop, desc }) => (
              <div key={prop} className="p-5 border border-white/[0.07] bg-white/[0.02]">
                <code className="text-[var(--orange)] text-xs block mb-1.5 font-mono">{prop}</code>
                <p className="text-white/50 text-xs leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ 2. SCROLLTRIGGER REVEALS ════════════════════════════════════════ */}
        <section id="scrolltrigger" className="py-24 px-8 md:px-16 border-b border-white/[0.06]">
          <SectionLabel index="02" title="GSAP ScrollTrigger — reveals" />
          <Mono>scrub sincroniza a animação com a posição do scroll</Mono>

          {/* 2a. reveal-title */}
          <DemoBlock label="Reveal Title" code=".reveal-title → scale(1.2→1) + blur(14px→0) + opacity · scrub 1.2" className="mt-12">
            <h2 className="st-title font-black uppercase leading-[0.85] tracking-[-0.05em]"
                style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(2.5rem, 9vw, 9rem)" }}>
              Grande Título
            </h2>
          </DemoBlock>

          {/* 2b. reveal-text */}
          <DemoBlock label="Reveal Text" code=".reveal-text → opacity(0→1) + y(55→0) · scrub 0.8" className="mt-8">
            <p className="st-text text-white/75 max-w-2xl leading-[2.3]"
               style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(15px, 1.5vw, 26px)" }}>
              Texto de parágrafo que sobe suavemente conforme o scroll avança.
              O scrub de 0.8 cria uma sensação fluida e responsiva ao movimento do usuário.
            </p>
          </DemoBlock>

          {/* 2c. reveal-quote slide-x */}
          <DemoBlock label="Reveal Quote — slide da esquerda" code=".reveal-quote → x(-80→0) + opacity · scrub 1" className="mt-8">
            <p className="st-quote font-black uppercase tracking-[-0.05em] text-[var(--ink)]"
               style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(1rem, 2.8vw, 3.2rem)" }}>
              <span className="marker-quote-bg">
                Citação com fundo highlighter laranja que desliza da esquerda.
              </span>
            </p>
          </DemoBlock>

          {/* 2d. clip-path */}
          <DemoBlock label="Clip-path Reveal — bottom up" code="clipPath: inset(100% 0% 0% 0%) → inset(0%) · scrub diferente por coluna" className="mt-8">
            <div className="st-clip-grid grid grid-cols-3 gap-3">
              {[
                "from-[var(--orange)] to-orange-900",
                "from-white/20 to-white/5",
                "from-[var(--orange)]/50 to-transparent",
              ].map((grad, i) => (
                <div key={i}
                     className={`st-clip aspect-video bg-gradient-to-br ${grad} flex items-center justify-center`}>
                  <span className="font-black text-3xl md:text-4xl"
                        style={{ fontFamily: "var(--font-darker-grotesque)" }}>
                    0{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </DemoBlock>
        </section>

        {/* ══ 3. PARALLAX ═════════════════════════════════════════════════════ */}
        <section id="parallax" className="py-24 px-8 md:px-16 border-b border-white/[0.06]">
          <SectionLabel index="03" title="Parallax" />

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <DemoBlock label="GSAP yPercent + scrub" code='.hero-photo → yPercent(0→20), scrub: true · "foto desce ao rolar"'>
              <div className="st-parallax-wrap relative overflow-hidden aspect-[4/3]">
                <div className="st-parallax-inner absolute inset-[-25%] will-change-transform
                                bg-gradient-to-br from-orange-900 via-[#232323] to-[#181818]
                                flex items-center justify-center">
                  <span className="text-5xl font-black opacity-20"
                        style={{ fontFamily: "var(--font-darker-grotesque)" }}>PARALLAX</span>
                </div>
              </div>
            </DemoBlock>

            <DemoBlock label="Framer Motion useScroll + useTransform" code='useScroll({ target, offset }) → useTransform(y, [0,1], ["-18%","18%"])'>
              <div ref={parallaxSectionRef} className="relative overflow-hidden aspect-[4/3]">
                <motion.div
                  style={{ y: fmParallaxY }}
                  className="absolute inset-[-25%] will-change-transform
                             bg-gradient-to-br from-blue-900 via-[#232323] to-[#181818]
                             flex items-center justify-center"
                >
                  <span className="text-5xl font-black opacity-20"
                        style={{ fontFamily: "var(--font-darker-grotesque)" }}>PARALLAX</span>
                </motion.div>
              </div>
            </DemoBlock>
          </div>

          {/* Parallax inverso (manifesto slide 2) */}
          <DemoBlock label="Parallax inverso — coluna sobe enquanto scroll desce" code='.manifesto-slide-2-parallax → yPercent(6→-6) · usado para dar profundidade entre colunas' className="mt-8">
            <Mono>fromTo yPercent: 6 → -6, scrub 0.85</Mono>
          </DemoBlock>
        </section>

        {/* ══ 4. STAGGER ══════════════════════════════════════════════════════ */}
        <section id="stagger" className="py-24 px-8 md:px-16 border-b border-white/[0.06]">
          <SectionLabel index="04" title="Stagger com ScrollTrigger" />
          <Mono>.team-item → x(-40→0) + opacity · stagger: 0.06 · scrub 0.8</Mono>

          <div className="mt-12 max-w-2xl">
            <ul className="st-list divide-y divide-white/[0.06]">
              {["Estratégia", "Branding", "Performance", "Conteúdo", "Tecnologia", "Dados", "Análise"].map((item) => (
                <li key={item}
                    className="st-list-item flex items-center justify-between py-4 group cursor-pointer
                               hover:pl-3 transition-all duration-300">
                  <span className="font-bold uppercase tracking-wider group-hover:text-[var(--orange)] transition-colors"
                        style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(14px, 1.6vw, 28px)" }}>
                    {item}
                  </span>
                  <span className="text-white/20 group-hover:text-[var(--orange)] transition-colors text-xl">→</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 p-5 border border-white/[0.07] bg-white/[0.02] max-w-md">
            <p className="text-white/40 text-xs leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              Também funciona com <code className="text-[var(--orange)]">gsap.fromTo(".state-item", ...)</code> para
              listas de estados, itens de menu e qualquer sequência de elementos repetidos.
            </p>
          </div>
        </section>

        {/* ══ 5. HORIZONTAL DRIFT ═════════════════════════════════════════════ */}
        <section id="drift" className="st-drift-section py-24 overflow-hidden border-b border-white/[0.06]">
          <div className="px-8 md:px-16">
            <SectionLabel index="05" title="Horizontal Drift no scroll" />
            <Mono>xPercent: ±20 · scrub 0.8 · efeito de perspectiva lateral</Mono>
          </div>

          <div className="mt-12 relative">
            <div className="st-drift-l whitespace-nowrap font-black uppercase leading-[0.82] opacity-10 will-change-transform"
                 style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(4rem, 17vw, 20rem)" }}>
              STRATEGY · BRAND ·
            </div>
            <div className="st-drift-r whitespace-nowrap font-black uppercase leading-[0.82] opacity-10 will-change-transform text-right"
                 style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(4rem, 17vw, 20rem)" }}>
              · DATA · GROWTH
            </div>
          </div>

          <div className="px-8 md:px-16 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 border border-white/[0.07] bg-white/[0.02]">
                <code className="text-[var(--orange)] text-xs block mb-1.5 font-mono">hero-quem-wrap → xPercent: -22</code>
                <p className="text-white/45 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                  "QUEM" desloca para a esquerda ao rolar, afastando do centro
                </p>
              </div>
              <div className="p-5 border border-white/[0.07] bg-white/[0.02]">
                <code className="text-[var(--orange)] text-xs block mb-1.5 font-mono">hero-somos-wrap → xPercent: +22</code>
                <p className="text-white/45 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                  "SOMOS" desloca para a direita — efeito de abertura
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 6. SCALE + ROTATE ═══════════════════════════════════════════════ */}
        <section className="py-24 px-8 md:px-16 border-b border-white/[0.06]">
          <SectionLabel index="06" title="Scale + Rotation no scroll" />
          <Mono>scale(0.72→1) + rotation(-8→0) + opacity · scrub 1.2 · usado no mapa SVG</Mono>

          <div className="mt-12 flex justify-center">
            <div className="st-scale-rotate w-48 h-48 md:w-72 md:h-72 border border-white/15
                            flex items-center justify-center will-change-transform">
              <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 text-[var(--orange)]">
                <polygon points="50,8 92,88 8,88"
                         fill="currentColor" fillOpacity="0.12"
                         stroke="currentColor" strokeWidth="1" />
                <circle cx="50" cy="58" r="14" fill="currentColor" fillOpacity="0.9" />
                <text x="50" y="63" textAnchor="middle" fill="#181818"
                      fontSize="14" fontWeight="900"
                      style={{ fontFamily: "var(--font-darker-grotesque)" }}>am</text>
              </svg>
            </div>
          </div>
        </section>

        {/* ══ 7. MARQUEE ══════════════════════════════════════════════════════ */}
        <section id="marquee" className="demo-marquee-section py-24 overflow-hidden border-b border-white/[0.06]">
          <div className="px-8 md:px-16">
            <SectionLabel index="07" title="Marquee — loop infinito" />
            <Mono>xPercent: -50*dir · repeat: -1 · hover → timeScale(0.1, 0.5s ease)</Mono>
          </div>

          <div className="mt-12 space-y-4">
            {[
              { words: ["ESTRATÉGIA", "BRANDING", "PERFORMANCE", "CONTEÚDO", "DADOS", "GROWTH"], dir: -1 },
              { words: ["AMP", "360°", "MARKETING", "CRIATIVIDADE", "RESULTADO", "TECH"], dir: 1 },
              { words: ["NORTE", "SUL", "LESTE", "OESTE", "BRASIL", "AMAZÔNIA"], dir: -1 },
            ].map((row, ri) => (
              <div key={ri} className="overflow-hidden">
                <div
                  className="demo-marquee-track flex gap-8 items-center will-change-transform"
                  style={{
                    width: "max-content",
                    transform: row.dir === 1 ? "translateX(-50%)" : "translateX(0%)",
                  }}
                >
                  {[...row.words, ...row.words].map((word, i) => (
                    <span key={i}
                          className="flex-shrink-0 font-black uppercase tracking-[-0.04em] text-white/15 flex items-center gap-8"
                          style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(2.2rem, 5.5vw, 7rem)" }}>
                      {word}
                      <span className="text-[var(--orange)] text-[0.4em]">✦</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="px-8 md:px-16 mt-8">
            <p className="text-white/30 text-xs font-mono">→ Passe o mouse para desacelerar (timeScale 0.1)</p>
          </div>
        </section>

        {/* ══ 8. HOVER EFFECTS ════════════════════════════════════════════════ */}
        <section id="hover" className="py-24 px-8 md:px-16 border-b border-white/[0.06]">
          <SectionLabel index="08" title="Hover Effects" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* ZoomImage pattern */}
            <DemoBlock label="ZoomImage" code="gsap.to(img, { scale: 1.12, duration: 0.7, ease: 'power2.out' })">
              <div className="demo-zoom-wrap relative overflow-hidden aspect-video cursor-pointer">
                <div className="demo-zoom-inner absolute inset-0 will-change-transform
                                bg-gradient-to-br from-orange-900 via-[#2a1a10] to-[#181818]
                                flex items-center justify-center"
                     style={{ transformOrigin: "center center" }}>
                  <span className="text-4xl font-black opacity-30"
                        style={{ fontFamily: "var(--font-darker-grotesque)" }}>ZOOM</span>
                </div>
              </div>
            </DemoBlock>

            {/* LogoCard pattern */}
            <DemoBlock label="Card Scale + Border" code="gsap.to(card, { scale: 1.05, borderColor: 'rgba(255,91,0,0.5)' })">
              <div className="demo-card-hover border border-white/10 aspect-video cursor-pointer
                              flex items-center justify-center will-change-transform">
                <span className="text-3xl font-black text-white/25"
                      style={{ fontFamily: "var(--font-darker-grotesque)" }}>CARD</span>
              </div>
            </DemoBlock>

            {/* FM whileHover scale */}
            <DemoBlock label="FM whileHover" code='whileHover={{ scale: 1.04 }} · transition: { ease: "easeOut" }'>
              <motion.div
                whileHover={{ scale: 1.04, borderColor: "rgba(255,91,0,0.5)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="border border-white/10 aspect-video flex items-center justify-center cursor-pointer"
              >
                <span className="text-3xl font-black text-white/25"
                      style={{ fontFamily: "var(--font-darker-grotesque)" }}>FM</span>
              </motion.div>
            </DemoBlock>
          </div>

          {/* More hover effects grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "rotate: 6",       props: { rotate: 6 } },
              { label: "y: -10",          props: { y: -10 } },
              { label: "skewX: 8",        props: { skewX: 8 } },
              { label: "opacity: 0.5",    props: { opacity: 0.5 } },
            ].map(({ label, props }) => (
              <motion.div key={label}
                whileHover={props}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="border border-white/10 p-4 aspect-video flex items-center justify-center cursor-pointer
                           hover:border-white/30 transition-colors"
              >
                <code className="text-[var(--orange)] text-[10px] font-mono text-center">{label}</code>
              </motion.div>
            ))}
          </div>

          {/* CSS underline + gap hover */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* underline grow CSS */}
            <div className="p-5 border border-white/[0.07] bg-white/[0.02]">
              <code className="text-[var(--orange)] text-[10px] font-mono block mb-4">
                CSS: scale-x-0 → group-hover:scale-x-100
              </code>
              <div className="group cursor-pointer inline-block relative">
                <span className="font-black text-xl uppercase" style={{ fontFamily: "var(--font-darker-grotesque)" }}>
                  Hover aqui
                </span>
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--orange)]
                                 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400 block" />
              </div>
            </div>

            {/* gap hover (navbar list) */}
            <div className="p-5 border border-white/[0.07] bg-white/[0.02]">
              <code className="text-[var(--orange)] text-[10px] font-mono block mb-4">
                hover:gap-4 · hover:pl-3 · transition-all duration-300
              </code>
              <ul className="space-y-1">
                {["Item A", "Item B", "Item C"].map((item) => (
                  <li key={item}
                      className="flex items-center gap-2 cursor-pointer hover:gap-4 hover:pl-2
                                 py-1 border-b border-white/[0.06] transition-all duration-300 group">
                    <span className="w-1 h-1 rounded-full bg-white/15 group-hover:bg-[var(--orange)] transition-colors flex-shrink-0" />
                    <span className="text-sm text-white/50 group-hover:text-white/90 transition-colors"
                          style={{ fontFamily: "var(--font-inter)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* filter grayscale */}
            <div className="p-5 border border-white/[0.07] bg-white/[0.02]">
              <code className="text-[var(--orange)] text-[10px] font-mono block mb-4">
                gsap: filter grayscale(100%→0%) + brightness
              </code>
              <motion.div
                className="aspect-video bg-gradient-to-br from-orange-700 to-orange-900 flex items-center justify-center cursor-pointer"
                initial={{ filter: "grayscale(100%) brightness(0.5)" }}
                whileHover={{ filter: "grayscale(0%) brightness(1.15)" }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-white font-black text-2xl"
                      style={{ fontFamily: "var(--font-darker-grotesque)" }}>IMG</span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ 9. FRAMER MOTION ════════════════════════════════════════════════ */}
        <section id="framer" className="py-24 px-8 md:px-16 border-b border-white/[0.06]">
          <SectionLabel index="09" title="Framer Motion" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            {/* AnimatePresence */}
            <DemoBlock label="AnimatePresence — mount/unmount" code="initial + animate + exit com blur">
              <button
                onClick={() => setFmVisible(!fmVisible)}
                className="mb-5 px-5 py-2 border border-[var(--orange)] text-[var(--orange)] text-xs font-bold uppercase
                           tracking-widest hover:bg-[var(--orange)] hover:text-[#181818] transition-colors duration-300"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {fmVisible ? "Esconder" : "Mostrar"}
              </button>
              <div className="min-h-[80px]">
                <AnimatePresence>
                  {fmVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -16, filter: "blur(10px)" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="p-5 bg-white/[0.05] border border-white/10"
                    >
                      <p className="text-sm text-white/70" style={{ fontFamily: "var(--font-inter)" }}>
                        Elemento com animação de entrada <em>e</em> saída. AnimatePresence é necessário para o exit funcionar.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </DemoBlock>

            {/* staggerChildren */}
            <DemoBlock label="variants + staggerChildren" code="staggerChildren: 0.1 · delayChildren: 0.1">
              <FMStaggerDemo />
            </DemoBlock>

            {/* drag */}
            <DemoBlock label="drag com dragConstraints" code='drag · dragConstraints · whileDrag: { scale: 1.1 }'>
              <div className="relative border border-white/10 h-36 flex items-center justify-center overflow-hidden">
                <motion.div
                  drag
                  dragConstraints={{ left: -90, right: 90, top: -40, bottom: 40 }}
                  dragElastic={0.1}
                  whileDrag={{ scale: 1.15, backgroundColor: "rgba(255,91,0,0.2)", cursor: "grabbing" }}
                  className="w-16 h-16 bg-[var(--orange)]/15 border border-[var(--orange)]/50
                             flex items-center justify-center cursor-grab select-none"
                >
                  <span className="text-[var(--orange)] text-2xl">✦</span>
                </motion.div>
                <p className="absolute bottom-2 right-3 text-white/20 text-[10px] font-mono">arraste</p>
              </div>
            </DemoBlock>

            {/* layout */}
            <DemoBlock label="layout animation" code='layout: true · animate={{ height }} · transition ease custom'>
              <FMLayoutDemo />
            </DemoBlock>

            {/* whileTap */}
            <DemoBlock label="whileTap" code='whileTap={{ scale: 0.94, backgroundColor }}'>
              <div className="flex gap-3">
                {["Primário", "Secundário", "Ghost"].map((label, i) => (
                  <motion.button
                    key={label}
                    whileTap={{ scale: 0.93 }}
                    whileHover={{ scale: 1.04 }}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors
                      ${i === 0 ? "bg-[var(--orange)] text-[#181818]"
                        : i === 1 ? "bg-white/10 text-white hover:bg-white/20"
                        : "border border-white/20 text-white/60 hover:text-white hover:border-white/50"}`}
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
            </DemoBlock>

            {/* useScroll progress bar */}
            <DemoBlock label="useScroll → progress bar" code="useScroll() → useTransform(scrollYProgress, [0,1], ['0%','100%'])">
              <p className="text-white/40 text-xs mb-3" style={{ fontFamily: "var(--font-inter)" }}>
                A barra laranja no topo da página (quando implementada) acompanha o scroll.
              </p>
              <Mono>const {"{ scrollYProgress }"} = useScroll()</Mono>
              <Mono>const width = useTransform(scrollYProgress, [0,1], ["0%","100%"])</Mono>
              <Mono>{"<motion.div style={{ width }} />"}</Mono>
            </DemoBlock>
          </div>
        </section>

        {/* ══ 10. GSAP EASINGS ════════════════════════════════════════════════ */}
        <section id="easings" className="py-24 px-8 md:px-16 border-b border-white/[0.06]">
          <SectionLabel index="10" title="GSAP Easings — clique para visualizar" />
          <Mono>todos os easings disponíveis no GSAP 3.15</Mono>

          {/* Track */}
          <div className="relative h-12 mt-8 mb-3 bg-white/[0.03] border border-white/10">
            <div className="absolute inset-0 flex items-center px-6">
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <div ref={easingDotRef}
                 className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 bg-[var(--orange)] rounded-full will-change-transform" />
          </div>

          {activeEasing
            ? <p className="text-[var(--orange)] text-xs font-mono mb-6">{activeEasing}</p>
            : <p className="text-white/20 text-xs font-mono mb-6">clique num easing abaixo</p>
          }

          <div className="flex flex-wrap gap-2">
            {EASINGS.map((e) => (
              <button
                key={e}
                onClick={() => playEasing(e)}
                disabled={!!activeEasing}
                className={`px-3 py-1.5 text-[10px] font-mono border transition-colors duration-200
                  ${activeEasing === e
                    ? "border-[var(--orange)] text-[var(--orange)] bg-[var(--orange)]/10"
                    : "border-white/12 text-white/40 hover:border-white/40 hover:text-white/75"
                  } disabled:cursor-not-allowed`}
              >
                {e}
              </button>
            ))}
          </div>
        </section>

        {/* ══ 11. CSS / TAILWIND ══════════════════════════════════════════════ */}
        <section id="css" className="py-24 px-8 md:px-16 border-b border-white/[0.06]">
          <SectionLabel index="11" title="CSS / Tailwind" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* animate-spin circular text */}
            <DemoBlock label="animate-spin" code='className="animate-spin" · style={{ animationDuration: "14s" }}'>
              <div className="flex justify-center py-4">
                <svg viewBox="0 0 120 120" className="w-24 h-24 animate-spin text-white/25"
                     style={{ animationDuration: "9s" }}>
                  <defs>
                    <path id="demo-circle-text" d="M60,10 a50,50 0 1,1 -0.01,0" />
                  </defs>
                  <text fill="currentColor" fontSize="11" letterSpacing="3"
                        style={{ fontFamily: "var(--font-inter)" }}>
                    <textPath href="#demo-circle-text">TEXTO CIRCULAR · AMP · </textPath>
                  </text>
                </svg>
              </div>
            </DemoBlock>

            {/* clip-path menu reveal */}
            <DemoBlock label="clip-path menu (Navbar)" code="clipPath: inset(0% 0% 100% 0%) → inset(0%) · CSS transition 700ms">
              <ClipPathMenuDemo />
            </DemoBlock>

            {/* Transitions palette */}
            <DemoBlock label="Transition helpers" code="transition-all · transition-colors · transition-opacity">
              <div className="space-y-3">
                {[
                  "hover:text-[var(--orange)] transition-colors duration-300",
                  "hover:opacity-75 transition-opacity duration-300",
                  "hover:scale-105 transition-transform duration-300",
                  "hover:gap-4 transition-all duration-300",
                  "hover:pl-3 transition-all duration-300",
                ].map((cls) => (
                  <div key={cls}
                       className="group cursor-pointer flex items-start gap-2 py-1.5 border-b border-white/[0.05]
                                  hover:pl-2 transition-all duration-300">
                    <span className="w-1 h-1 rounded-full bg-white/15 group-hover:bg-[var(--orange)]
                                     transition-colors flex-shrink-0 mt-1.5" />
                    <code className="text-[10px] text-white/35 group-hover:text-white/70 transition-colors font-mono leading-relaxed">
                      {cls}
                    </code>
                  </div>
                ))}
              </div>
            </DemoBlock>
          </div>

          {/* Loader pattern */}
          <DemoBlock label="Loader: SVG clipPath + fill crescendo + slide-up saída" code="attr({ width: SVG_W }) · yPercent: -100 · power3.inOut" className="mt-8">
            <div className="p-5 bg-white/[0.02] border border-white/[0.06]">
              <p className="text-white/40 text-xs leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                1. <code className="text-[var(--orange)]">clipPath id="amp-clip"</code> com os paths das letras<br />
                2. Rect laranja cresce de width=0 → SVG_W, recortado pelo clip<br />
                3. Contador sincronizado (<code className="text-[var(--orange)]">gsap.to(counter, {"{ val: 100 }"}</code>)<br />
                4. Saída: <code className="text-[var(--orange)]">yPercent: -100</code> no wrapper, ease power3.inOut
              </p>
            </div>
          </DemoBlock>

          {/* Navbar menu clip-path info */}
          <DemoBlock label="Navbar overlay — clip-path wipe reveal" code='clipPath: inset(0% 0% 100% 0%) ↔ inset(0%) · cubic-bezier(0.77,0,0.18,1) · 700ms' className="mt-8">
            <Mono>{"style={{ clipPath: open ? 'inset(0%)' : 'inset(0% 0% 100% 0%)' }}"}</Mono>
            <Mono>className="transition-[clip-path] duration-700 ease-[cubic-bezier(0.77,0,0.18,1)]"</Mono>
          </DemoBlock>
        </section>

        {/* ══ 12. SPLITTEXT ═══════════════════════════════════════════════════ */}
        <section id="splittext" className="py-24 px-8 md:px-16 border-b border-white/[0.06]">
          <SectionLabel index="12" title="SplitText — plugin GSAP (agora free)" />
          <Mono>{"new SplitText(el, { type: 'chars | words | lines' }) · stagger por unidade"}</Mono>
          <p className="text-white/30 text-[11px] font-mono mb-10">
            Anteriormente Club GreenSock (pago). Disponível no gsap/SplitText após aquisição pela Webflow.
          </p>
          <SplitTextDemo />
        </section>

        {/* ══ 13. SCRAMBLE TEXT ═══════════════════════════════════════════════ */}
        <section id="scramble" className="py-24 px-8 md:px-16 border-b border-white/[0.06]">
          <SectionLabel index="13" title="ScrambleText — embaralha e revela" />
          <Mono>gsap.to(el, {"{ scrambleText: { text, chars, speed } }"}) — plugin gsap/ScrambleTextPlugin</Mono>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <DemoBlock label="Texto scramble" code='scrambleText: { text: "TARGET", chars: "upperCase", speed: 0.4 }'>
              <ScrambleTextDemo
                target="AGÊNCIA AMP 360°"
                chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#&"
                label="texto"
              />
            </DemoBlock>
            <DemoBlock label="Números scramble" code='scrambleText: { text: "2.847", chars: "0123456789", speed: 0.6 }'>
              <ScrambleTextDemo
                target="2.847 CLIENTES"
                chars="0123456789"
                label="números"
                duration={1.2}
              />
            </DemoBlock>
          </div>
        </section>

        {/* ══ 14. BOTÃO MAGNÉTICO ═════════════════════════════════════════════ */}
        <section id="magnetic" className="py-24 px-8 md:px-16 border-b border-white/[0.06]">
          <SectionLabel index="14" title="Botão Magnético — efeito premium de hover" />
          <Mono>mousemove → gsap.to(btn, {"{ x: dx*0.35, y: dy*0.35 }"}) · mouseLeave → elastic.out de volta</Mono>
          <p className="text-white/30 text-[11px] font-mono mb-10">
            Sem plugin — puro GSAP + matemática de proximidade. O botão "atrai" o cursor dentro de um raio.
          </p>
          <div className="flex flex-wrap gap-12 mt-8 items-center">
            <MagneticButton>
              <span className="px-10 py-5 bg-[var(--orange)] text-[#181818] font-black uppercase tracking-widest text-sm"
                    style={{ fontFamily: "var(--font-inter)" }}>
                Primário
              </span>
            </MagneticButton>
            <MagneticButton>
              <span className="px-10 py-5 border border-white/30 text-white font-bold uppercase tracking-widest text-sm"
                    style={{ fontFamily: "var(--font-inter)" }}>
                Secundário
              </span>
            </MagneticButton>
            <MagneticButton>
              <span className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center text-2xl">
                ✦
              </span>
            </MagneticButton>
          </div>
          <div className="mt-10 p-5 border border-white/[0.07] bg-white/[0.02] max-w-lg">
            <Mono>{'onMouseMove: gsap.to(el, { x: dx*strength, y: dy*strength, ease: "power2.out" })'}</Mono>
            <Mono>{'onMouseLeave: gsap.to(el, { x: 0, y: 0, ease: "elastic.out(1,0.4)" })'}</Mono>
            <p className="text-white/35 text-[11px] mt-2" style={{ fontFamily: "var(--font-inter)" }}>
              strength = (threshold - dist) / threshold — zero fora do raio, 1 no centro
            </p>
          </div>
        </section>

        {/* ══ 15. DRAWSVG ═════════════════════════════════════════════════════ */}
        <section id="drawsvg" className="py-24 px-8 md:px-16 border-b border-white/[0.06]">
          <SectionLabel index="15" title="DrawSVG — desenha paths SVG" />
          <Mono>gsap.fromTo(path, {"{ drawSVG: '0%' }"}, {"{ drawSVG: '100%' }"}) — plugin gsap/DrawSVGPlugin</Mono>
          <p className="text-white/30 text-[11px] font-mono mb-10">
            Útil para logos, ícones, separadores decorativos e progress rings. Controla strokeDashoffset internamente.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <DemoBlock label="Circle progress" code='drawSVG: "0%" → "100%", ease: power2.inOut'>
              <DrawSVGDemo type="circle" />
            </DemoBlock>
            <DemoBlock label="Path decorativo" code='drawSVG: "0%" → "100%", stagger nos paths'>
              <DrawSVGDemo type="wave" />
            </DemoBlock>
            <DemoBlock label="Logo outline" code='drawSVG: "0% 0%" → "0% 100%", ease: power3.out'>
              <DrawSVGDemo type="logo" />
            </DemoBlock>
          </div>
        </section>

        {/* ══ RODAPÉ ══════════════════════════════════════════════════════════ */}
        <footer className="px-8 md:px-16 py-12 flex items-center justify-between text-white/20 text-xs font-mono border-t border-white/[0.06]"
                style={{ fontFamily: "var(--font-inter)" }}>
          <a href="/quem-somos" className="hover:text-[var(--orange)] transition-colors">
            ← Quem Somos
          </a>
          <span>AMP · Stack: GSAP 3 + FM 12 + Lenis 1.3 + TW4 · SplitText · ScrambleText · DrawSVG</span>
        </footer>
      </div>
    </SmoothScroll>
  );
}

// ─── Subcomponentes ────────────────────────────────────────────────────────────

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-3">
      <span className="text-white/15 text-xs font-mono">{index}</span>
      <h2 className="text-[var(--orange)] text-xs font-bold uppercase tracking-[0.25em]"
          style={{ fontFamily: "var(--font-inter)" }}>
        {title}
      </h2>
    </div>
  );
}

function Mono({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-white/30 text-[11px] font-mono mb-2 leading-relaxed">{children}</p>
  );
}

function DemoBlock({
  children,
  label,
  code,
  className = "",
}: {
  children: React.ReactNode;
  label: string;
  code: string;
  className?: string;
}) {
  return (
    <div className={`border border-white/[0.07] p-6 md:p-8 ${className}`}>
      <div className="mb-5">
        <p className="text-white/35 text-[10px] font-bold uppercase tracking-[0.2em] mb-1"
           style={{ fontFamily: "var(--font-inter)" }}>
          {label}
        </p>
        <code className="text-[var(--orange)] text-[10px] font-mono leading-relaxed">{code}</code>
      </div>
      {children}
    </div>
  );
}

// ── Timeline interativo (replay) ──────────────────────────────────────────────
function TimelineDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState(0);

  useGSAP(() => {
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .fromTo(".tl-tag",  { opacity: 0, y: 20 },       { opacity: 1, y: 0, duration: 0.5 })
      .fromTo(".tl-line", { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 0.5 }, "-=0.2")
      .fromTo(".tl-word", { opacity: 0, y: 55, skewY: 5 }, { opacity: 1, y: 0, skewY: 0, duration: 0.8, stagger: 0.1 }, "-=0.2")
      .fromTo(".tl-sub",  { opacity: 0, y: 18 },       { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
  }, { scope: ref, dependencies: [key] });

  return (
    <div ref={ref} className="mt-8 border border-white/[0.07] p-8 md:p-12 bg-white/[0.01]">
      <p className="tl-tag text-[var(--orange)] text-[11px] font-bold uppercase tracking-[0.3em] mb-4"
         style={{ fontFamily: "var(--font-inter)" }}>
        gsap.timeline()
      </p>
      <div className="tl-line h-px bg-white/10 mb-8" />
      <div className="overflow-hidden flex flex-wrap">
        {["Timeline", "de", "Entrada"].map((word, i) => (
          <span key={i}
                className="tl-word font-black uppercase leading-[0.85] tracking-[-0.05em] inline-block mr-4"
                style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(2.5rem, 7vw, 8rem)" }}>
            {word}
          </span>
        ))}
      </div>
      <p className="tl-sub mt-4 text-white/35 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
        stagger · skewY · opacity · y · scaleX — encadeados com <code className="text-[var(--orange)]">"-=0.2"</code>
      </p>
      <button
        onClick={() => setKey((k) => k + 1)}
        className="mt-5 text-[10px] font-mono text-white/25 hover:text-[var(--orange)] transition-colors uppercase tracking-widest"
      >
        ↺ replay
      </button>
    </div>
  );
}

// ── FM: stagger variants ──────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

function FMStaggerDemo() {
  const [key, setKey] = useState(0);
  return (
    <div>
      <button
        onClick={() => setKey((k) => k + 1)}
        className="mb-4 px-4 py-1.5 border border-white/15 text-[10px] font-mono text-white/40
                   hover:border-white/40 hover:text-white/70 transition-colors uppercase tracking-widest"
      >
        ↺ replay
      </button>
      <motion.ul
        key={key}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        {["Item 01", "Item 02", "Item 03", "Item 04", "Item 05"].map((item) => (
          <motion.li
            key={item}
            variants={itemVariants}
            className="px-4 py-2 bg-white/[0.04] border border-white/[0.07] text-sm text-white/70"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

// ── FM: layout animation ──────────────────────────────────────────────────────
function FMLayoutDemo() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="flex gap-3 items-end h-28">
      {["A", "B", "C", "D"].map((item) => (
        <motion.div
          key={item}
          layout
          onClick={() => setSelected(selected === item ? null : item)}
          animate={{
            height: selected === item ? 112 : 48,
            backgroundColor: selected === item ? "rgba(255,91,0,0.25)" : "rgba(255,255,255,0.04)",
            borderColor: selected === item ? "rgba(255,91,0,0.5)" : "rgba(255,255,255,0.1)",
          }}
          transition={{ duration: 0.45, ease: [0.77, 0, 0.18, 1] }}
          className="flex-1 border flex items-center justify-center cursor-pointer"
        >
          <span className="font-black text-xl" style={{ fontFamily: "var(--font-darker-grotesque)" }}>
            {item}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// ── CSS: clip-path menu ───────────────────────────────────────────────────────
function ClipPathMenuDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="mb-3 px-4 py-1.5 border border-white/15 text-[10px] font-mono text-white/40
                   hover:border-[var(--orange)] hover:text-[var(--orange)] transition-colors uppercase tracking-widest"
      >
        {open ? "fechar" : "abrir"} menu
      </button>
      <div
        className="transition-[clip-path] duration-700 ease-[cubic-bezier(0.77,0,0.18,1)]"
        style={{ clipPath: open ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }}
      >
        <div className="bg-white/[0.06] border border-white/10 p-4 space-y-2">
          {["Quem Somos", "Serviços", "Cases", "Blog"].map((l) => (
            <div key={l}
                 className="text-sm py-1.5 border-b border-white/[0.05] text-white/55"
                 style={{ fontFamily: "var(--font-inter)" }}>
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── SplitText: 3 variações ─────────────────────────────────────────────────────
function SplitTextDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      // 1. CHARS — stagger por caractere com rotateX
      const charsEl = ref.current!.querySelector<HTMLElement>(".st-demo-chars");
      if (charsEl) {
        const split = new SplitText(charsEl, { type: "chars" });
        gsap.fromTo(split.chars,
          { opacity: 0, y: 40, rotateX: -90, transformOrigin: "top center" },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.025, duration: 0.55, ease: "back.out(2)", delay: 0.1,
            onComplete: () => split.revert() }
        );
      }

      // 2. WORDS — stagger por palavra com blur
      const wordsEl = ref.current!.querySelector<HTMLElement>(".st-demo-words");
      if (wordsEl) {
        const split = new SplitText(wordsEl, { type: "words" });
        gsap.fromTo(split.words,
          { opacity: 0, filter: "blur(12px)", y: 18 },
          { opacity: 1, filter: "blur(0px)", y: 0, stagger: 0.07, duration: 0.75, ease: "power3.out", delay: 0.3,
            onComplete: () => split.revert() }
        );
      }

      // 3. LINES — slide-up por linha (efeito "máscara")
      const linesEl = ref.current!.querySelector<HTMLElement>(".st-demo-lines");
      if (linesEl) {
        const split = new SplitText(linesEl, { type: "lines" });
        gsap.fromTo(split.lines,
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, stagger: 0.13, duration: 0.85, ease: "power4.out", delay: 0.2,
            onComplete: () => split.revert() }
        );
      }
    }, ref);

    return () => ctx.revert();
  }, [key]);

  return (
    <div ref={ref} className="space-y-12">
      {/* Chars */}
      <div className="border border-white/[0.07] p-8">
        <code className="text-[var(--orange)] text-[10px] font-mono block mb-5">
          type: "chars" · rotateX(-90→0) + opacity · stagger: 0.025
        </code>
        <p className="st-demo-chars font-black uppercase leading-[0.85] tracking-[-0.05em]"
           style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(2rem, 7vw, 8rem)" }}>
          DESIGN & MOTION
        </p>
      </div>

      {/* Words */}
      <div className="border border-white/[0.07] p-8">
        <code className="text-[var(--orange)] text-[10px] font-mono block mb-5">
          type: "words" · blur(12px→0) + y · stagger: 0.07
        </code>
        <p className="st-demo-words text-white/85 leading-snug"
           style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(1.1rem, 2.4vw, 3rem)" }}>
          Criatividade que move resultados consistentes ao longo do tempo.
        </p>
      </div>

      {/* Lines — precisa de overflow hidden no wrapper para o efeito de máscara */}
      <div className="border border-white/[0.07] p-8">
        <code className="text-[var(--orange)] text-[10px] font-mono block mb-5">
          type: "lines" · y(110%→0%) + opacity · efeito de máscara por linha
        </code>
        <div className="overflow-hidden">
          <p className="st-demo-lines font-black uppercase leading-[1.1] tracking-[-0.04em]"
             style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(1.8rem, 5vw, 6rem)" }}>
            Estratégia.<br />Criatividade.<br />Resultado.
          </p>
        </div>
      </div>

      <button
        onClick={() => setKey((k) => k + 1)}
        className="text-[10px] font-mono text-white/25 hover:text-[var(--orange)] transition-colors uppercase tracking-widest"
      >
        ↺ replay todos
      </button>
    </div>
  );
}

// ── ScrambleText ───────────────────────────────────────────────────────────────
function ScrambleTextDemo({
  target,
  chars,
  label,
  duration = 1.5,
}: {
  target: string;
  chars: string;
  label: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [running, setRunning] = useState(false);

  const play = () => {
    if (running || !ref.current) return;
    setRunning(true);
    gsap.to(ref.current, {
      duration,
      scrambleText: { text: target, chars, speed: 0.45, revealDelay: 0.4 },
      ease: "none",
      onComplete: () => setRunning(false),
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <span
        ref={ref}
        className="font-black uppercase leading-tight tracking-[-0.03em] text-white"
        style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(1.6rem, 4vw, 4rem)" }}
      >
        {label === "texto" ? "Clique para ver" : "000.000"}
      </span>
      <button
        onClick={play}
        disabled={running}
        className={`self-start px-5 py-2 border text-[10px] font-mono uppercase tracking-widest transition-colors
          ${running
            ? "border-[var(--orange)] text-[var(--orange)] cursor-wait"
            : "border-white/20 text-white/45 hover:border-[var(--orange)] hover:text-[var(--orange)]"
          }`}
      >
        {running ? "scrambling..." : "▶ play"}
      </button>
    </div>
  );
}

// ── Magnetic Button ────────────────────────────────────────────────────────────
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const threshold = 90;
    if (dist < threshold) {
      const strength = (threshold - dist) / threshold;
      gsap.to(ref.current, { x: dx * 0.38 * strength, y: dy * 0.38 * strength, duration: 0.3, ease: "power2.out" });
    }
  };

  const onMouseLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-block will-change-transform cursor-pointer"
    >
      {children}
    </div>
  );
}

// ── DrawSVG ────────────────────────────────────────────────────────────────────
function DrawSVGDemo({ type }: { type: "circle" | "wave" | "logo" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      if (type === "circle") {
        gsap.fromTo("circle", { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.8, ease: "power2.inOut" });
        gsap.fromTo(".inner-dot", { scale: 0, transformOrigin: "center" }, { scale: 1, duration: 0.4, ease: "back.out(3)", delay: 1.6 });
      }
      if (type === "wave") {
        gsap.fromTo("path", { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.4, stagger: 0.2, ease: "power3.inOut" });
      }
      if (type === "logo") {
        gsap.fromTo("path", { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 1.6, stagger: 0.3, ease: "power3.out" });
      }
    }, ref);
    return () => ctx.revert();
  }, [key, type]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-5">
      {type === "circle" && (
        <svg viewBox="0 0 100 100" className="w-32 h-32" fill="none">
          <circle cx="50" cy="50" r="44" stroke="var(--orange)" strokeWidth="2" />
          <circle cx="50" cy="50" r="28" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <circle className="inner-dot" cx="50" cy="50" r="6" fill="var(--orange)" />
        </svg>
      )}
      {type === "wave" && (
        <svg viewBox="0 0 200 80" className="w-48" fill="none">
          <path d="M0 40 Q25 10 50 40 Q75 70 100 40 Q125 10 150 40 Q175 70 200 40"
                stroke="var(--orange)" strokeWidth="2" />
          <path d="M0 55 Q25 25 50 55 Q75 85 100 55 Q125 25 150 55 Q175 85 200 55"
                stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <path d="M0 25 Q25 -5 50 25 Q75 55 100 25 Q125 -5 150 25 Q175 55 200 25"
                stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </svg>
      )}
      {type === "logo" && (
        <svg viewBox="0 0 120 60" className="w-36" fill="none">
          {/* A */}
          <path d="M10 50 L22 10 L34 50" stroke="var(--orange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 35 L30 35" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" />
          {/* M */}
          <path d="M42 50 L42 10 L54 35 L66 10 L66 50" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* P */}
          <path d="M76 50 L76 10 L90 10 Q100 10 100 22 Q100 34 90 34 L76 34"
                stroke="var(--orange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <button
        onClick={() => setKey((k) => k + 1)}
        className="text-[10px] font-mono text-white/25 hover:text-[var(--orange)] transition-colors uppercase tracking-widest"
      >
        ↺ replay
      </button>
    </div>
  );
}
