import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/BlogArticle";
import BlogPostNav from "@/components/BlogPostNav";
import BlogRelated from "@/components/BlogRelated";
import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import SmoothScroll from "@/components/SmoothScroll";
import { POSTS, getPostBySlug, getRelatedPosts } from "@/data/posts";
import { getAdjacentPosts } from "@/lib/posts-nav";
import { pageMetadata } from "@/lib/seo";

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

  const related = getRelatedPosts(slug, 3);
  const { prev, next } = getAdjacentPosts(slug);

  return (
    <SmoothScroll>
      <div className="min-h-screen overflow-x-clip bg-white text-[#232323]">
        <div className="relative">
          <Navbar theme="light" />
          <BlogPostNav prev={prev} next={next} />
        </div>
        <BlogArticle post={post} />
        <BlogRelated posts={related} />
        <PageFooter />
      </div>
    </SmoothScroll>
  );
}
