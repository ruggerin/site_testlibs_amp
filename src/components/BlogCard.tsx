import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/posts";

type BlogCardProps = {
  post: BlogPost;
  variant?: "default" | "compact";
};

export default function BlogCard({ post, variant = "default" }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm bg-[var(--cream)] transition-opacity hover:opacity-90"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--cream)]">
        <Image
          src={post.image}
          alt=""
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className={`flex flex-1 flex-col gap-3 ${variant === "compact" ? "p-4" : "p-5 md:p-6"}`}>
        <h3
          className={`font-bold uppercase leading-snug text-[#232323]/50 ${
            variant === "compact" ? "text-base" : "text-lg md:text-xl"
          }`}
          style={{ fontFamily: "var(--font-darker-grotesque)" }}
        >
          {post.title}
        </h3>
        <p
          className="line-clamp-3 text-sm leading-relaxed text-[#232323] md:text-base"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {post.excerpt}
        </p>
        <p
          className="mt-auto text-xs font-bold uppercase text-[var(--orange)]"
          style={{ fontFamily: "var(--font-darker-grotesque)" }}
        >
          {post.date}
        </p>
      </div>
    </Link>
  );
}
