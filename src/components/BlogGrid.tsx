import BlogCard from "@/components/BlogCard";
import { POSTS } from "@/data/posts";
import { figmaClamp } from "@/lib/figma-scale";

const SIDE_PAD = "clamp(24px, 1.56vw, 30px)";

/** Ordem visual Figma sec2 — colunas alternadas. */
const GRID_ORDER = [
  "site-amp-10-anos",
  "ze-lootinho-ouro-pmkt",
  "marketing-360-dados-branding",
  "site-bonitinho-sobrinho",
] as const;

export default function BlogGrid() {
  const ordered = GRID_ORDER.map((slug) => POSTS.find((p) => p.slug === slug)).filter(
    (p): p is (typeof POSTS)[number] => Boolean(p)
  );

  return (
    <section className="w-full bg-white pb-16 md:pb-24">
      <div
        className="mx-auto w-full max-w-[1860px]"
        style={{ paddingLeft: SIDE_PAD, paddingRight: SIDE_PAD }}
      >
        <ul
          className="m-0 grid list-none grid-cols-1 gap-y-12 p-0 md:grid-cols-2 md:gap-x-[clamp(20px,2vw,40px)] md:gap-y-[clamp(48px,5.5vw,105px)]"
        >
          {ordered.map((post) => (
            <li key={post.slug} className="min-w-0">
              <BlogCard post={post} variant="listing" />
            </li>
          ))}
        </ul>

        <div className="mt-14 flex justify-center md:mt-20">
          <span
            className="inline-flex min-w-[185px] items-center justify-center bg-[var(--orange)] px-10 py-3 font-medium uppercase leading-[2.08] text-[#F7F7F7]"
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
