"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { ServiceBlock as ServiceBlockData } from "@/data/services";
import { getServiceLayout, type ServiceTitlePositions } from "@/data/service-layouts";
import { FIGMA_W, figmaAspect, figmaClamp } from "@/lib/figma-scale";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TITLE_LINE = figmaClamp(250, { min: 48, max: 250, vw: 13 });
const TITLE_AMP  = figmaClamp(450, { min: 72, max: 450, vw: 23.4 });
const SUBTITLE   = figmaClamp(32,  { min: 14, max: 32,  vw: 1.67 });
const BODY       = figmaClamp(28,  { min: 14, max: 28,  vw: 1.46 });

const IMAGE_W = `min(1360px, ${(1360 / FIGMA_W) * 100}%)`;

const titleWordStyle = {
  fontFamily: "var(--font-darker-grotesque)",
  fontSize: TITLE_LINE,
  lineHeight: 0.64,
  letterSpacing: "-0.06em",
} as const;

const ampStyle = {
  fontFamily: "var(--font-darker-grotesque)",
  fontSize: TITLE_AMP,
  letterSpacing: "-0.06em",
} as const;

function ServiceTitleDesktop({
  service,
  pos,
  minHeight,
  variant,
}: {
  service: ServiceBlockData;
  pos: ServiceTitlePositions;
  minHeight: string;
  variant: "default" | "conteudo";
}) {
  const isConteudo = variant === "conteudo";
  const lineClass = `service-title-word absolute z-20 w-max whitespace-nowrap font-black text-[#232323] ${
    isConteudo ? "" : "uppercase"
  }`;
  const ampLineHeight = isConteudo ? 0.35555555555555557 : 0.36;

  return (
    <div className="relative hidden w-full md:block" style={{ minHeight }}>
      {service.subtitle2 && pos.subtitle2 ? (
        <p
          className="service-subtitle absolute z-40 text-left font-semibold uppercase leading-[1.31] text-[#232323]"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: SUBTITLE,
            top: pos.subtitle2.top,
            width: pos.subtitle2.width,
            ...(pos.subtitle2.right !== undefined
              ? { right: pos.subtitle2.right }
              : { left: pos.subtitle2.left }),
          }}
        >
          {service.subtitle2}
        </p>
      ) : null}

      <p
        className="service-subtitle absolute z-40 text-right font-semibold uppercase leading-[1.31] text-[#232323]"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: SUBTITLE,
          left: pos.subtitle.left,
          top: pos.subtitle.top,
          maxWidth: pos.subtitle.maxWidth,
        }}
      >
        {service.subtitle}
      </p>

      <span
        className="service-accent absolute z-10 font-black text-[var(--orange)]"
        style={{ ...ampStyle, lineHeight: ampLineHeight, left: pos.amp.left, top: pos.amp.top }}
      >
        {service.accent}
      </span>

      <span className={lineClass} style={{ ...titleWordStyle, left: pos.line2.left, top: pos.line2.top }}>
        {service.line2}
      </span>

      <span
        className={lineClass}
        style={{ ...titleWordStyle, left: pos.line1.left, top: pos.line1.top, maxWidth: pos.line1.maxWidth }}
      >
        {service.line1}
      </span>
    </div>
  );
}

function ServiceTitleMobile({ service }: { service: ServiceBlockData }) {
  const isConteudo = service.id === "conteudo";
  const lineClass = `font-black text-[#232323] ${isConteudo ? "" : "uppercase"}`;

  return (
    <div className="flex flex-col gap-4 px-5 sm:px-8">
      <div className="relative flex flex-wrap items-end gap-x-1 leading-none">
        <span className={`relative z-20 ${lineClass}`} style={titleWordStyle}>
          {isConteudo ? service.line2 : service.line1}
        </span>
        <span
          className="relative z-10 font-black text-[var(--orange)]"
          style={{ ...ampStyle, fontSize: TITLE_AMP, lineHeight: service.id === "conteudo" ? 0.35555555555555557 : 0.36 }}
        >
          {service.accent}
        </span>
        <span className={`relative z-20 ${lineClass}`} style={titleWordStyle}>
          {isConteudo ? service.line1 : service.line2}
        </span>
      </div>
      <p className="font-semibold uppercase leading-[1.31] text-[#232323]"
         style={{ fontFamily: "var(--font-inter)", fontSize: SUBTITLE }}>
        {service.subtitle}
      </p>
      {service.subtitle2 ? (
        <p className="font-semibold uppercase leading-[1.31] text-[#232323]"
           style={{ fontFamily: "var(--font-inter)", fontSize: SUBTITLE }}>
          {service.subtitle2}
        </p>
      ) : null}
    </div>
  );
}

export default function ServiceBlock({ service }: { service: ServiceBlockData }) {
  const blockRef   = useRef<HTMLElement>(null);
  const layout     = getServiceLayout(service.id);
  const showHero   = layout.showHeroImage !== false;
  const titleVariant = layout.titleVariant ?? "default";

  useGSAP(() => {
    const block = blockRef.current;
    if (!block) return;

    const trigger = { trigger: block, start: "top 78%", toggleActions: "play none none none" };

    // ── Imagem wide: scale + fade reveal ───────────────────────────────────
    if (showHero) {
      gsap.fromTo(".service-img-inner",
        { scale: 1.07, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1, ease: "power2.out", scrollTrigger: trigger }
      );
      gsap.to(".service-img-inner", {
        yPercent: 7,
        ease: "none",
        scrollTrigger: {
          trigger: ".service-img-wrap",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
        },
      });
    }

    // ── Palavras do título: sobem em stagger ────────────────────────────────
    gsap.fromTo(".service-title-word",
      { y: 48, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1, scrollTrigger: trigger }
    );

    // ── Acento "&": escala + fade ───────────────────────────────────────────
    gsap.fromTo(".service-accent",
      { scale: 1.22, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.75, ease: "back.out(1.5)", scrollTrigger: trigger }
    );

    // ── Subtítulos ──────────────────────────────────────────────────────────
    gsap.fromTo(".service-subtitle",
      { y: 22, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, ease: "power2.out", stagger: 0.1, delay: 0.2, scrollTrigger: trigger }
    );

    // ── Marcador laranja: cresce de cima ────────────────────────────────────
    gsap.fromTo(".service-orange-marker",
      { scaleY: 0, transformOrigin: "top" },
      { scaleY: 1, duration: 0.55, ease: "power2.out", delay: 0.15, scrollTrigger: trigger }
    );

    // ── Card artigo: slide up ───────────────────────────────────────────────
    gsap.fromTo(".service-article",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, ease: "power2.out", delay: 0.1, scrollTrigger: trigger }
    );

    // ── Parágrafos: stagger fade ────────────────────────────────────────────
    gsap.fromTo(".service-para",
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, ease: "power2.out", stagger: 0.14, delay: 0.3, scrollTrigger: trigger }
    );
  }, { scope: blockRef });

  return (
    <section
      ref={blockRef}
      className="bg-[var(--cream)] pb-14 md:pb-24"
      style={{ paddingTop: layout.sectionPt }}
    >
      <div className="relative mx-auto w-full max-w-[1920px]">

        {showHero ? (
          <div className="service-img-wrap relative" style={{ width: IMAGE_W }}>
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: figmaAspect(1360, 450) }}>
              <div className="service-img-inner absolute inset-0">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  className="object-cover"
                  style={{ objectPosition: layout.imageObjectPosition }}
                  sizes="(max-width: 1920px) 70vw, 1360px"
                  priority={service.id === "branding"}
                />
              </div>
            </div>
          </div>
        ) : null}

        <div
          className="relative z-10 max-md:hidden"
          style={{
            marginTop: showHero
              ? layout.titleGapAfterImage ?? `calc(-1 * ${layout.titleOverlap})`
              : undefined,
            paddingLeft: layout.titleInset,
            paddingRight: layout.titleInset,
            maxWidth: "100%",
          }}
        >
          <div className="relative" style={{ maxWidth: layout.titleMaxW }}>
            <ServiceTitleDesktop
              service={service}
              pos={layout.titlePos}
              minHeight={layout.titleMinH}
              variant={titleVariant}
            />
          </div>
        </div>

        <div className="mt-6 md:hidden">
          {showHero ? (
            <div className="relative mb-4 overflow-hidden" style={{ width: IMAGE_W, aspectRatio: figmaAspect(1360, 450) }}>
              <Image
                src={service.image}
                alt=""
                fill
                className="object-cover"
                style={{ objectPosition: layout.imageObjectPosition }}
                sizes="100vw"
              />
            </div>
          ) : null}
          <ServiceTitleMobile service={service} />
        </div>

        <div className="relative z-10 w-full px-[clamp(1rem,1.4vw,1.6875rem)] md:mt-[clamp(1rem,1.56vw,30px)]">
          <div className="grid grid-cols-1 items-stretch lg:grid-cols-[minmax(0,718px)_1fr]">
            <article className="service-article relative border-[3px] border-[#232323] bg-[var(--cream)] pt-6 pl-6 pr-6 pb-8 md:pt-8 md:pl-[calc(clamp(56px,4.7vw,90px)+2.5rem)] md:pr-10">
              {!showHero ? (
                <div
                  className="service-orange-marker absolute left-6 top-6 h-[clamp(56px,4.7vw,90px)] w-[clamp(56px,4.7vw,90px)] overflow-hidden bg-[var(--orange)] md:left-10 md:top-10"
                  aria-hidden
                >
                  <Image src={service.image} alt="" fill className="object-cover" sizes="90px" />
                </div>
              ) : (
                <span
                  className="service-orange-marker absolute left-6 top-6 block h-[clamp(56px,4.7vw,90px)] w-[clamp(56px,4.7vw,90px)] bg-[var(--orange)] md:left-10 md:top-10"
                  aria-hidden
                />
              )}
              <div className="space-y-6 text-[#232323]"
                   style={{ fontFamily: "var(--font-inter)", fontSize: BODY, lineHeight: 1.86 }}>
                {service.description.split("\n\n").map((para) => (
                  <p key={para.slice(0, 24)} className="service-para">{para}</p>
                ))}
              </div>
            </article>

            <div className="hidden min-h-[clamp(320px,33.5vw,643px)] bg-[#D9D9D9] lg:grid lg:grid-cols-3" aria-hidden>
              <div /><div /><div />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
