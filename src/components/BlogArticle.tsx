import Image from "next/image";
import { figmaClamp } from "@/lib/figma-scale";
import type { BlogPost } from "@/data/posts";

/** Mesmo padrão de BlogGrid / BlogRelated. */
const SIDE_PAD = "clamp(24px, 1.56vw, 30px)";

const DATE_SIZE = figmaClamp(32, { min: 14, max: 32, vw: 1.67 });
const TITLE_SIZE = figmaClamp(90, { min: 32, max: 90, vw: 4.7 });
const LEAD_SIZE = figmaClamp(32, { min: 16, max: 32, vw: 1.67 });
const BODY_SIZE = figmaClamp(22, { min: 15, max: 22, vw: 1.15 });
const META_SIZE = figmaClamp(22, { min: 14, max: 22, vw: 1.15 });

type BlogArticleProps = {
  post: BlogPost;
};

export default function BlogArticle({ post }: BlogArticleProps) {
  const lead = post.lead ?? post.excerpt;
  const paragraphs = post.body.split("\n\n").filter(Boolean);

  return (
    <article className="w-full bg-white">
      <div
        className="relative w-full overflow-hidden bg-[#D9D9D9]"
        style={{ aspectRatio: "1920 / 780" }}
      >
        <Image
          src={post.image}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <div
        className="mx-auto w-full max-w-[1920px]"
        style={{
          paddingLeft: SIDE_PAD,
          paddingRight: SIDE_PAD,
          paddingTop: "clamp(2.5rem, 5vw, 4rem)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        <p
          className="mb-6 font-black uppercase leading-none text-[var(--orange)]"
          style={{
            fontFamily: "var(--font-darker-grotesque)",
            fontSize: DATE_SIZE,
          }}
        >
          {post.date}
        </p>

        <h1
          className="mb-8 w-full font-black uppercase leading-[0.83] tracking-[-0.05em] text-[#232323]"
          style={{
            fontFamily: "var(--font-darker-grotesque)",
            fontSize: TITLE_SIZE,
          }}
        >
          {post.title}
        </h1>

        {post.author ? (
          <p
            className="mb-10 text-[#676767]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: META_SIZE,
            }}
          >
            {post.author}
          </p>
        ) : null}

        <p
          className="mb-10 w-full font-semibold uppercase leading-[1.5] text-[#232323]"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: LEAD_SIZE,
          }}
        >
          {lead}
        </p>

        <div
          className="w-full space-y-8 border-t border-[#B5B5B5] pt-10"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: BODY_SIZE,
            lineHeight: 2.82,
          }}
        >
          {paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="text-[#232323]">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-[#B5B5B5] pt-8">
          <span
            className="font-light uppercase text-[#B5B5B5]"
            style={{ fontFamily: "var(--font-inter)", fontSize: META_SIZE }}
          >
            compartilhar
          </span>
          <span
            className="text-[#B5B5B5]"
            style={{ fontFamily: "var(--font-inter)", fontSize: META_SIZE }}
          >
            0 visualização | 0 comentário
          </span>
        </div>
      </div>
    </article>
  );
}
