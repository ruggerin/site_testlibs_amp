import Image from "next/image";
import Link from "next/link";
import { figmaClamp } from "@/lib/figma-scale";
import type { BlogPost } from "@/data/posts";

const ARTBOARD_W = 1920;

const TITLE_SIZE = figmaClamp(52, { min: 18, max: 52, vw: 2.7 });
const EXCERPT_SIZE = figmaClamp(32, { min: 14, max: 32, vw: 1.67 });
const DATE_SIZE = figmaClamp(32, { min: 14, max: 32, vw: 1.67 });

/** Figma Rectangle 32 — 910×643 no card listing. */
const IMAGE_ASPECT = "910 / 643";

type BlogCardProps = {
  post: BlogPost;
  variant?: "listing" | "related";
};

export default function BlogCard({ post, variant = "listing" }: BlogCardProps) {
  const isRelated = variant === "related";

  return (
    <Link href={`/blog/${post.slug}`} className="group block min-w-0">
      <div
        className="hover-zoom-media relative w-full bg-[#D9D9D9]"
        style={{ aspectRatio: isRelated ? "751 / 530" : IMAGE_ASPECT }}
      >
        <Image
          src={post.image}
          alt=""
          fill
          className="object-cover"
          sizes={
            isRelated
              ? "(max-width: 768px) 100vw, 40vw"
              : "(max-width: 768px) 100vw, 48vw"
          }
        />
      </div>

      <div className={isRelated ? "mt-5 space-y-3" : "mt-6 space-y-4 md:mt-8"}>
        <h3
          className="font-black uppercase leading-[0.9] text-black"
          style={{
            fontFamily: "var(--font-darker-grotesque)",
            fontSize: isRelated ? figmaClamp(42, { min: 16, max: 42, vw: 2.2 }) : TITLE_SIZE,
          }}
        >
          {post.title}
        </h3>

        {!isRelated && post.excerpt ? (
          <p
            className="font-semibold leading-[1.31] text-[#232323]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: EXCERPT_SIZE,
            }}
          >
            {post.excerpt}
          </p>
        ) : null}

        <p
          className="font-black uppercase leading-none text-[var(--orange)]"
          style={{
            fontFamily: "var(--font-darker-grotesque)",
            fontSize: DATE_SIZE,
          }}
        >
          {post.date}
        </p>
      </div>
    </Link>
  );
}
