"use client";

import { useRef, type RefObject } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { ServiceSectionData, TitleLayout } from "@/data/servicos-sections";
import { svw } from "@/lib/servicos-figma";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HERO_W = 1360;
const HERO_H = 450;

const FONT = {
  line: "clamp(3rem, 13.02vw, 250px)",
  amp: "clamp(4.5rem, 23.44vw, 450px)",
  tag: "clamp(0.875rem, 1.67vw, 32px)",
  body: "clamp(0.875rem, 1.46vw, 28px)",
} as const;

const lineStyle = {
  fontFamily: "var(--font-darker-grotesque)",
  fontSize: FONT.line,
  lineHeight: 0.64,
  letterSpacing: "-0.06em",
} as const;

const ampStyle = {
  fontFamily: "var(--font-darker-grotesque)",
  fontSize: FONT.amp,
  lineHeight: 0.36,
  letterSpacing: "-0.06em",
} as const;

function useServiceTitleAnimation(
  scopeRef: RefObject<HTMLElement | null>,
  variant: TitleLayout["variant"],
) {
  useGSAP(
    () => {
      const root = scopeRef.current;
      if (!root) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      const line1 = root.querySelector<HTMLElement>(".svc-title-line1");
      const line2 = root.querySelector<HTMLElement>(".svc-title-line2");
      const amp = root.querySelector<HTMLElement>(".svc-title-amp");
      const tags = root.querySelectorAll<HTMLElement>(".svc-title-tag");

      if (!line1 || !line2 || !amp) return;

      if (reduced.matches) {
        gsap.set([line1, line2, amp, ...tags], { clearProps: "all", opacity: 1, y: 0, scale: 1, filter: "none" });
        return;
      }

      const first = variant === "conteudo" ? line2 : line1;
      const second = variant === "conteudo" ? line1 : line2;

      gsap.set([first, second], { opacity: 0, y: 22, filter: "blur(6px)" });
      gsap.set(amp, { opacity: 0, scale: 0.92, filter: "blur(4px)" });
      gsap.set(tags, { opacity: 0, y: 14 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 84%",
            toggleActions: "play none none none",
          },
          defaults: { ease: "power3.out" },
        })
        .to(first, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 })
        .to(
          amp,
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.65 },
          "-=0.42",
        )
        .to(
          second,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
          "-=0.48",
        )
        .to(tags, { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 }, "-=0.35");
    },
    { scope: scopeRef, dependencies: [variant] },
  );
}

function TitleTag({ tag }: { tag: NonNullable<TitleLayout["tagLeft"]> }) {
  return (
    <p
      className={`svc-title-tag absolute z-30 font-semibold uppercase leading-[1.31] text-[#232323] ${
        tag.align === "right" ? "text-right" : "text-left"
      }`}
      style={{
        fontFamily: "var(--font-inter)",
        fontSize: FONT.tag,
        top: tag.top,
        width: tag.width,
        ...(tag.left != null ? { left: tag.left } : {}),
        ...(tag.right != null ? { right: tag.right } : {}),
      }}
    >
      {tag.text}
    </p>
  );
}

function ServiceTitle({ title }: { title: TitleLayout }) {
  const titleRef = useRef<HTMLDivElement>(null);
  useServiceTitleAnimation(titleRef, title.variant);

  const isConteudo = title.variant === "conteudo";
  const wordClass = `svc-title-part absolute z-20 whitespace-nowrap font-black text-[#232323] will-change-[transform,opacity,filter] ${
    isConteudo ? "" : "uppercase"
  }`;

  return (
    <div
      ref={titleRef}
      className="relative w-full overflow-visible"
      style={{
        marginLeft: svw(title.x),
        width: svw(title.w, title.w),
        minHeight: svw(title.h, title.h),
        marginTop: title.heroOverlap > 0 ? svw(-title.heroOverlap) : undefined,
      }}
    >
      {title.tagLeft ? <TitleTag tag={title.tagLeft} /> : null}
      {title.tagRight ? <TitleTag tag={title.tagRight} /> : null}

      <span
        className={`${wordClass} svc-title-line1 z-20`}
        style={{ ...lineStyle, left: title.line1Pos.left, top: title.line1Pos.top }}
      >
        {title.line1}
      </span>

      <span
        className="svc-title-amp absolute z-10 font-black text-[var(--orange)] will-change-[transform,opacity,filter]"
        style={{
          ...ampStyle,
          lineHeight: isConteudo ? 0.35555555555555557 : 0.36,
          left: title.ampPos.left,
          top: title.ampPos.top,
        }}
      >
        &
      </span>

      <span
        className={`${wordClass} svc-title-line2 z-20`}
        style={{ ...lineStyle, left: title.line2Pos.left, top: title.line2Pos.top }}
      >
        {title.line2}
      </span>
    </div>
  );
}

function ServiceTitleMobile({ section }: { section: ServiceSectionData }) {
  const titleRef = useRef<HTMLDivElement>(null);
  const { title } = section;
  const isConteudo = title.variant === "conteudo";
  useServiceTitleAnimation(titleRef, title.variant);

  const wordClass = `font-black text-[#232323] will-change-[transform,opacity,filter] ${
    isConteudo ? "" : "uppercase"
  }`;

  return (
    <div ref={titleRef} className="space-y-4 px-5 sm:px-8">
      <div className="flex flex-wrap items-end gap-x-2 leading-none">
        <span
          className={`${wordClass} svc-title-line1`}
          style={{ ...lineStyle, order: isConteudo ? 3 : 1 }}
        >
          {title.line1}
        </span>
        <span
          className="svc-title-amp font-black text-[var(--orange)] will-change-[transform,opacity,filter]"
          style={{ ...ampStyle, fontSize: FONT.amp, order: 2 }}
        >
          &
        </span>
        <span
          className={`${wordClass} svc-title-line2`}
          style={{ ...lineStyle, order: isConteudo ? 1 : 3 }}
        >
          {title.line2}
        </span>
      </div>
      {title.tagLeft ? (
        <p
          className="svc-title-tag font-semibold uppercase text-[#232323]"
          style={{ fontFamily: "var(--font-inter)", fontSize: FONT.tag }}
        >
          {title.tagLeft.text}
        </p>
      ) : null}
      {title.tagRight ? (
        <p
          className="svc-title-tag font-semibold uppercase text-[#232323]"
          style={{ fontFamily: "var(--font-inter)", fontSize: FONT.tag }}
        >
          {title.tagRight.text}
        </p>
      ) : null}
    </div>
  );
}

const BODY_TEXT = {
  fontFamily: "var(--font-inter)",
  fontSize: FONT.body,
  lineHeight: 1.55,
} as const;

/** Figma Group 30 + cases — card 718px + grid 1175px @ x:27. */
function ServiceBody({ section }: { section: ServiceSectionData }) {
  const { cases } = section;
  const rowH = Math.max(section.cardH, cases.h);
  const imageCols = cases.cols.filter((c) => c.src);
  const singleImage = imageCols.length === 1;
  const paragraphs = section.description.split("\n\n");

  return (
    <div
      className="grid w-full grid-cols-1 items-stretch lg:grid-cols-[718fr_1175fr]"
      style={{
        marginLeft: svw(27),
        width: svw(1920 - 54),
        maxWidth: `calc(100% - ${svw(54)})`,
        gap: 0,
        minHeight: svw(rowH, rowH),
      }}
    >
      <article
        className="flex h-full items-start border-[3px] border-[#232323] bg-[var(--cream)] text-[#232323]"
        style={{
          minHeight: svw(rowH, rowH),
          paddingTop: svw(36),
          paddingBottom: svw(36),
          paddingLeft: svw(42),
          paddingRight: svw(36),
        }}
      >
        <div
          className="flex w-full items-start"
          style={{ gap: svw(30, 30) }}
        >
          <div
            className="shrink-0 bg-[var(--orange)]"
            style={{
              width: svw(90, 90),
              height: svw(90, 90),
            }}
            aria-hidden
          >
            <div className="relative flex h-full w-full items-center justify-center">
              <Image
                src={section.icon}
                alt=""
                width={50}
                height={50}
                className="h-[55%] w-[55%] object-contain"
              />
            </div>
          </div>

          <div
            className="flex min-w-0 flex-1 flex-col"
            style={{ ...BODY_TEXT, gap: svw(20, 24) }}
          >
            {paragraphs.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </div>
      </article>

      {singleImage ? (
        <div
          className="hover-zoom-media relative hidden h-full min-h-0 overflow-hidden lg:block"
          style={{ minHeight: svw(rowH, rowH) }}
        >
          <Image
            src={imageCols[0].src!}
            alt=""
            fill
            className="object-cover"
            sizes="61vw"
          />
        </div>
      ) : (
        <div
          className="hidden h-full min-h-0 lg:grid"
          style={{
            gridTemplateColumns: "392fr 391fr 392fr",
            minHeight: svw(rowH, rowH),
          }}
        >
          {cases.cols.map((col, i) => (
            <div
              key={i}
              className={`relative h-full min-h-0 overflow-hidden${col.src ? " hover-zoom-media" : ""}`}
              style={{
                backgroundColor: col.color ?? "#D9D9D9",
              }}
            >
              {col.src ? (
                <Image src={col.src} alt="" fill className="object-cover" sizes="20vw" />
              ) : null}
            </div>
          ))}
        </div>
      )}

      {/* Mobile: imagens empilhadas */}
      <div className="grid grid-cols-1 gap-0 lg:hidden">
        {imageCols.map((col) => (
          <div
            key={col.src}
            className="hover-zoom-media relative aspect-[1175/643] w-full overflow-hidden"
          >
            <Image src={col.src!} alt="" fill className="object-cover" sizes="100vw" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServiceSection({ section }: { section: ServiceSectionData }) {
  const gapAfterTitle = svw(30);

  return (
    <section
      className="w-full bg-[var(--cream)]"
      style={{
        paddingTop: section.gapBefore ? svw(section.gapBefore, section.gapBefore) : undefined,
        paddingBottom: svw(80, 120),
      }}
    >
      <div className="relative mx-auto w-full max-w-[1920px] overflow-visible">
        {section.hero ? (
          <div
            className={`hover-zoom-media relative overflow-hidden ${section.hero.placeholder ? "bg-[#D9D9D9]" : ""}`}
            style={{ width: svw(HERO_W, HERO_W), aspectRatio: `${HERO_W}/${HERO_H}` }}
          >
            {section.hero.src ? (
              <div
                className="absolute inset-0"
                style={
                  section.hero.offsetY
                    ? { transform: `translateY(${svw(section.hero.offsetY)})` }
                    : undefined
                }
              >
                <Image
                  src={section.hero.src}
                  alt=""
                  fill
                  className="object-cover"
                  style={{ objectPosition: section.hero.objectPosition ?? "center" }}
                  sizes="71vw"
                  priority={section.id === "branding"}
                />
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="hidden md:block">
          <ServiceTitle title={section.title} />
          <div style={{ height: gapAfterTitle }} aria-hidden />
          <ServiceBody section={section} />
        </div>

        <div className="md:hidden">
          {section.hero ? (
            <div
              className={`hover-zoom-media relative mb-4 aspect-[1360/450] w-full overflow-hidden ${section.hero.placeholder ? "bg-[#D9D9D9]" : ""}`}
            >
              {section.hero.src ? (
                <Image src={section.hero.src} alt="" fill className="object-cover" sizes="100vw" />
              ) : null}
            </div>
          ) : null}
          <ServiceTitleMobile section={section} />
          <div className="mt-8 px-5 sm:px-8">
            <ServiceBody section={section} />
          </div>
        </div>
      </div>
    </section>
  );
}
