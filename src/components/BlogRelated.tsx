import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { figmaClamp } from "@/lib/figma-scale";
import type { BlogPost } from "@/data/posts";

const SIDE_PAD = "clamp(24px, 1.56vw, 30px)";

const HEADING_SIZE = figmaClamp(32, { min: 16, max: 32, vw: 1.67 });
const LINK_SIZE = figmaClamp(32, { min: 14, max: 32, vw: 1.67 });

type BlogRelatedProps = {
  posts: BlogPost[];
};

export default function BlogRelated({ posts }: BlogRelatedProps) {
  return (
    <section className="w-full bg-white pb-16 pt-4 md:pb-24">
      <div
        className="mx-auto w-full max-w-[1860px]"
        style={{ paddingLeft: SIDE_PAD, paddingRight: SIDE_PAD }}
      >
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
          <h2
            className="font-light uppercase text-[var(--orange)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: HEADING_SIZE,
            }}
          >
            confira os artigos relacionadaos
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

        <ul className="m-0 grid list-none grid-cols-1 gap-12 p-0 md:grid-cols-3 md:gap-8">
          {posts.map((post) => (
            <li key={post.slug} className="min-w-0">
              <BlogCard post={post} variant="related" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
