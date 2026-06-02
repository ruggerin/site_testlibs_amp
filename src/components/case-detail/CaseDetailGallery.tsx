"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { figmaAspect } from "@/lib/figma-scale";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** sec2 — Figma 2:715 (2×945×940 + 1920×1080). */
export default function CaseDetailGallery({
  images,
}: {
  images: [string, string, string];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [left, right, full] = images;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // ── Par de imagens: entram de lados opostos ──────────────────────────
      gsap.fromTo(
        ".cdg-left",
        { x: -48, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cdg-pair",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        ".cdg-right",
        { x: 48, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: ".cdg-pair",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );

      // ── Imagem full-width: scale reveal ──────────────────────────────────
      gsap.fromTo(
        ".cdg-full-inner",
        { scale: 1.07, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".cdg-full",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      // ── Parallax suave na imagem full ────────────────────────────────────
      gsap.to(".cdg-full-inner", {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: ".cdg-full",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-white">
      <div className="mx-auto w-full max-w-[1920px]">
        <div className="cdg-pair grid grid-cols-1 gap-0 md:grid-cols-2">
          <div
            className="cdg-left hover-zoom-media relative w-full bg-[#D9D9D9]"
            style={{ aspectRatio: figmaAspect(945, 940) }}
          >
            <Image src={left} alt="" fill className="object-cover" sizes="50vw" />
          </div>
          <div
            className="cdg-right hover-zoom-media relative w-full bg-[#D9D9D9]"
            style={{ aspectRatio: figmaAspect(945, 940) }}
          >
            <Image src={right} alt="" fill className="object-cover" sizes="50vw" />
          </div>
        </div>
        <div
          className="cdg-full hover-zoom-media relative w-full bg-[#D9D9D9]"
          style={{ aspectRatio: figmaAspect(1920, 1080) }}
        >
          <div className="cdg-full-inner absolute inset-0 will-change-transform">
            <Image src={full} alt="" fill className="object-cover" sizes="100vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
