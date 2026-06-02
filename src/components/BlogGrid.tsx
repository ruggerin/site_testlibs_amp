"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BlogCard from "@/components/BlogCard";
import { POSTS } from "@/data/posts";
import { figmaClamp } from "@/lib/figma-scale";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SIDE_PAD = "clamp(24px, 1.56vw, 30px)";

export default function BlogGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const ordered = POSTS;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        ".blg-card",
        { y: 56, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".blg-grid",
            start: "top 86%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        ".blg-more",
        { y: 24, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".blg-more",
            start: "top 92%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="w-full bg-white pb-16 md:pb-24">
      <div
        className="mx-auto w-full max-w-[1860px]"
        style={{ paddingLeft: SIDE_PAD, paddingRight: SIDE_PAD }}
      >
        <ul className="blg-grid m-0 grid list-none grid-cols-1 gap-y-12 p-0 md:grid-cols-2 md:gap-x-[clamp(20px,2vw,40px)] md:gap-y-[clamp(48px,5.5vw,105px)]">
          {ordered.map((post) => (
            <li key={post.slug} className="blg-card min-w-0">
              <BlogCard post={post} variant="listing" />
            </li>
          ))}
        </ul>

        <div className="mt-14 flex justify-center md:mt-20">
          <span
            className="blg-more inline-flex min-w-[185px] cursor-default items-center justify-center bg-[var(--orange)] px-10 py-3 font-medium uppercase leading-[2.08] text-[#F7F7F7]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: figmaClamp(25, { min: 14, max: 25, vw: 1.3 }),
            }}
          >
            ver mais
          </span>
        </div>
      </div>
    </section>
  );
}
