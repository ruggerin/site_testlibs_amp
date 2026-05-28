import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import BlogCard from "@/components/BlogCard";
import PageFooter from "@/components/PageFooter";
import PageShell from "@/components/PageShell";
import { POSTS, getPostBySlug, getRelatedPosts } from "@/data/posts";
import { FRAME } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Blog — AMP" };
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);
  const idx = POSTS.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? POSTS[idx - 1] : null;
  const next = idx < POSTS.length - 1 ? POSTS[idx + 1] : null;

  return (
    <PageShell theme="light">
      <article className="bg-white pb-12 pt-4 md:pb-16">
        <div className={`${FRAME} px-5 sm:px-8 md:px-16`}>
          <p
            className="mb-4 text-xs font-bold uppercase text-[var(--orange)]"
            style={{ fontFamily: "var(--font-darker-grotesque)" }}
          >
            {post.date}
          </p>
          <h1
            className="max-w-4xl font-bold uppercase leading-tight text-[#232323]/50"
            style={{
              fontFamily: "var(--font-darker-grotesque)",
              fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
            }}
          >
            {post.title}
          </h1>

          <div className="relative my-10 aspect-[21/9] w-full overflow-hidden rounded-sm bg-[var(--cream)]">
            <Image
              src={post.image}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          </div>

          <div className="max-w-3xl space-y-6">
            {post.body.split("\n\n").map((p) => (
              <p
                key={p.slice(0, 32)}
                className="text-[clamp(15px,1.15vw,18px)] leading-[1.85] text-[#232323]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {p}
              </p>
            ))}
          </div>

          <nav
            className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#232323]/10 pt-8"
            aria-label="Navegação entre artigos"
          >
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="text-sm font-semibold uppercase text-[var(--orange)] hover:opacity-80"
              >
                ← {prev.title.slice(0, 40)}…
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="text-right text-sm font-semibold uppercase text-[var(--orange)] hover:opacity-80"
              >
                {next.title.slice(0, 40)}… →
              </Link>
            ) : null}
          </nav>
        </div>
      </article>

      <section className="border-t border-[#232323]/10 bg-[var(--cream)] py-16 md:py-20">
        <div className={`${FRAME} px-5 sm:px-8 md:px-16`}>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2
              className="text-xl font-black uppercase text-[#232323]"
              style={{ fontFamily: "var(--font-darker-grotesque)" }}
            >
              confira os artigos relacionados
            </h2>
            <Link
              href="/blog"
              className="text-sm font-semibold uppercase tracking-widest text-[var(--orange)]"
            >
              ver todos
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      <PageFooter />
    </PageShell>
  );
}
