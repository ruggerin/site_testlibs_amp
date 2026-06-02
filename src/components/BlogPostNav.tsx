import Link from "next/link";
import type { BlogPost } from "@/data/posts";

function NavArrow({
  href,
  label,
  direction,
}: {
  href: string;
  label: string;
  direction: "prev" | "next";
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-10 w-[82px] items-center justify-center border-2 border-[#232323]/20 bg-white/90 transition-colors hover:border-[#232323] hover:bg-white md:h-[41px]"
    >
      <span className="sr-only">{label}</span>
      <svg
        width="40"
        height="22"
        viewBox="0 0 40 22"
        fill="none"
        aria-hidden
        className={direction === "next" ? "rotate-180" : undefined}
      >
        <path
          d="M38 11H2M2 11L12 2M2 11L12 20"
          stroke="#232323"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}

/** Setas prev/next — Figma /single_blog 2:365 (x:1586, y:30). */
export default function BlogPostNav({
  prev,
  next,
}: {
  prev: BlogPost | null;
  next: BlogPost | null;
}) {
  if (!prev && !next) return null;

  return (
    <nav
      className="pointer-events-auto absolute z-[60] flex gap-3"
      style={{
        top: "clamp(5.5rem, 8vh, 7.5rem)",
        right: "clamp(24px, 7.8vw, 150px)",
      }}
      aria-label="Navegação entre artigos"
    >
      {prev ? (
        <NavArrow
          href={`/blog/${prev.slug}`}
          label={`Artigo anterior: ${prev.title}`}
          direction="prev"
        />
      ) : (
        <span className="h-10 w-[82px] opacity-0 md:h-[41px]" aria-hidden />
      )}
      {next ? (
        <NavArrow
          href={`/blog/${next.slug}`}
          label={`Próximo artigo: ${next.title}`}
          direction="next"
        />
      ) : null}
    </nav>
  );
}
