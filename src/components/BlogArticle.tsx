"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  IconFacebook,
  IconLinkedin,
} from "@/components/SocialIconButtons";
import type { BlogPost } from "@/data/posts";
import { figmaClamp } from "@/lib/figma-scale";
import { SOCIAL_LINKS } from "@/lib/social";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Figma /single_blog — coluna @ x:355, largura 1210px (frame 1920). */
const CONTENT_PAD = "clamp(24px, 18.49vw, 355px)";
const CONTENT_MAX = 1210;
const RULE_MAX = 1313;

const HERO_H = 780;

const DATE_SIZE = figmaClamp(32, { min: 14, max: 32, vw: 1.67 });
const TITLE_SIZE = figmaClamp(90, { min: 32, max: 90, vw: 4.7 });
const LEAD_SIZE = figmaClamp(32, { min: 16, max: 32, vw: 1.67 });
const BODY_SIZE = figmaClamp(22, { min: 15, max: 22, vw: 1.15 });
const META_SIZE = figmaClamp(22, { min: 14, max: 22, vw: 1.15 });

const facebook = SOCIAL_LINKS.find((s) => s.label === "Facebook");
const linkedin = SOCIAL_LINKS.find((s) => s.label === "LinkedIn");
const WHATSAPP_HREF = `https://wa.me/5592992345678`;

function IconLink({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10 13a5 5 0 007.07 0l1.41-1.41a5 5 0 00-7.07-7.07L10 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M14 11a5 5 0 00-7.07 0L5.52 12.41a5 5 0 107.07 7.07L14 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconWhatsapp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ShareIconButton({
  href,
  label,
  children,
  onClick,
}: {
  href?: string;
  label: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const className =
    "flex size-[clamp(48px,3vw,58px)] shrink-0 items-center justify-center rounded-full border border-[#B5B5B5] text-[#676767] transition-colors hover:border-[#232323] hover:text-[#232323]";

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className} aria-label={label}>
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={label}
    >
      {children}
    </a>
  );
}

type BlogArticleProps = {
  post: BlogPost;
};

export default function BlogArticle({ post }: BlogArticleProps) {
  const articleRef = useRef<HTMLElement>(null);
  const lead = post.lead ?? post.excerpt;
  const paragraphs = post.body.split("\n\n").filter(Boolean);

  const shareUrl = () =>
    typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    const url = shareUrl();
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* ignore */
    }
  };

  const shareWhatsApp = () => {
    const url = shareUrl();
    const text = encodeURIComponent(`${post.title} — ${url}`);
    window.open(`${WHATSAPP_HREF}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const shareLinkedIn = () => {
    const url = shareUrl();
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  useGSAP(
    () => {
      const article = articleRef.current;
      if (!article) return;

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".bla-image",
          { scale: 1.08, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.3, ease: "power2.out" },
        )
        .fromTo(
          ".bla-date",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          "-=0.45",
        )
        .fromTo(
          ".bla-title",
          { y: 52, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.0 },
          "-=0.3",
        )
        .fromTo(
          ".bla-author",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.5",
        )
        .fromTo(
          ".bla-lead",
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.45",
        );

      gsap.fromTo(
        ".bla-para",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.09,
          scrollTrigger: {
            trigger: ".bla-body",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        ".bla-share",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".bla-share",
            start: "top 92%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: articleRef },
  );

  return (
    <article ref={articleRef} className="w-full bg-white">
      <div
        className="hover-zoom-media relative w-full bg-[#D9D9D9]"
        style={{ aspectRatio: `1920 / ${HERO_H}` }}
      >
        <div className="bla-image absolute inset-0 will-change-transform">
          <Image
            src={post.image}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <div
        className="w-full"
        style={{
          paddingLeft: CONTENT_PAD,
          paddingRight: CONTENT_PAD,
          paddingTop: "clamp(2.75rem, 5.2vw, 5rem)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        <div
          className="mx-auto w-full"
          style={{ maxWidth: CONTENT_MAX }}
        >
          <p
            className="bla-date mb-5 font-black uppercase leading-none text-[var(--orange)] md:mb-6"
            style={{
              fontFamily: "var(--font-darker-grotesque)",
              fontSize: DATE_SIZE,
            }}
          >
            {post.date}
          </p>

          <h1
            className="bla-title mb-8 w-full font-black uppercase leading-[0.83] tracking-[-0.05em] text-[#232323] md:mb-10"
            style={{
              fontFamily: "var(--font-darker-grotesque)",
              fontSize: TITLE_SIZE,
            }}
          >
            {post.title}
          </h1>

          {post.author ? (
            <p
              className="bla-author mb-8 text-[#676767] md:mb-10"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: META_SIZE,
                lineHeight: 2.82,
              }}
            >
              {post.author}
            </p>
          ) : null}

          <p
            className="bla-lead mb-0 w-full font-semibold uppercase leading-[1.5] text-[#232323]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: LEAD_SIZE,
            }}
          >
            {lead}
          </p>
        </div>

        <div
          className="bla-body mx-auto w-full pt-10 md:pt-12"
          style={{
            maxWidth: CONTENT_MAX,
            fontFamily: "var(--font-inter)",
            fontSize: BODY_SIZE,
            lineHeight: 2.82,
          }}
        >
          <div className="space-y-8">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="bla-para text-[#232323]">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div
          className="bla-share mx-auto w-full"
          style={{ maxWidth: RULE_MAX }}
        >
          <div
            className="bla-rule h-px w-full bg-[#B5B5B5]"
            aria-hidden
          />

          <div className="flex flex-col gap-8 py-10 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-6">
            <div className="flex flex-wrap items-center gap-5 md:gap-6">
              <span
                className="font-medium uppercase text-[#B5B5B5]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: META_SIZE,
                  lineHeight: 2.82,
                }}
              >
                compartilhar
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <ShareIconButton label="Copiar link do artigo" onClick={copyLink}>
                  <IconLink className="size-6" />
                </ShareIconButton>
                {linkedin ? (
                  <ShareIconButton
                    label="Compartilhar no LinkedIn"
                    onClick={shareLinkedIn}
                  >
                    <IconLinkedin className="size-6" />
                  </ShareIconButton>
                ) : null}
                {facebook ? (
                  <ShareIconButton
                    href={`${facebook.href}`}
                    label="Compartilhar no Facebook"
                  >
                    <IconFacebook className="size-6" />
                  </ShareIconButton>
                ) : null}
                <ShareIconButton label="Compartilhar no WhatsApp" onClick={shareWhatsApp}>
                  <IconWhatsapp className="size-6" />
                </ShareIconButton>
              </div>
            </div>

            <p
              className="font-medium text-[#B5B5B5]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: META_SIZE,
                lineHeight: 2.82,
              }}
            >
              0 visualização | 0 comentário
            </p>
          </div>

          <div
            className="bla-rule h-px w-full bg-[#B5B5B5]"
            aria-hidden
          />
        </div>
      </div>
    </article>
  );
}
