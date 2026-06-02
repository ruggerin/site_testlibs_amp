import { POSTS, type BlogPost } from "@/data/posts";

export function getAdjacentPosts(slug: string): {
  prev: BlogPost | null;
  next: BlogPost | null;
} {
  const i = POSTS.findIndex((p) => p.slug === slug);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? POSTS[i - 1]! : null,
    next: i < POSTS.length - 1 ? POSTS[i + 1]! : null,
  };
}
