"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BlogCard from "@/components/BlogCard";
import { figmaClamp } from "@/lib/figma-scale";
import type { BlogPost } from "@/data/posts";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SIDE_PAD = "clamp(24px, 1.56vw, 30px)";

const HEADING_SIZE = figmaClamp(32, { min: 16, max: 32, vw: 1.67 });
const LINK_SIZE = figmaClamp(32, { min: 14, max: 32, vw: 1.67 });

type BlogRelatedProps = {
  posts: BlogPost[];
};

export default function BlogRelated({ posts }: BlogRelatedProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const trigger = {
        trigger: section,
        start: "top 82%",
        toggleActions: "play none none none",
      };

      // ── Cabeçalho: fade up ───────────────────────────────────────────────
      gsap.fromTo(
        ".blr-header",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", scrollTrigger: trigger },
      );

      // ── Cards: stagger slide up ──────────────────────────────────────────
      gsap.fromTo(
        ".blr-card",
        { y: 52, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.13,
          scrollTrigger: {
            trigger: ".blr-grid",
            start: "top 84%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="w-full bg-white pb-16 pt-4 md:pb-24">
      <div
        className="mx-auto w-full max-w-[1860px]"
        style={{ paddingLeft: SIDE_PAD, paddingRight: SIDE_PAD }}
      >
        <div className="blr-header mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
          <h2
            className="font-light uppercase text-[var(--orange)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: HEADING_SIZE,
            }}
          >
            confira os artigos relacionados
          </h2>
          <Link
            href="/blog"
            className="font-light uppercase text-[var(--orange)] hover:opacity-80"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: LINK_SIZE,
            }}
          >
            ver todos
          </Link>
        </div>

        <ul className="blr-grid m-0 grid list-none grid-cols-1 gap-12 p-0 md:grid-cols-3 md:gap-8">
          {posts.map((post) => (
            <li key={post.slug} className="blr-card min-w-0">
              <BlogCard post={post} variant="related" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
