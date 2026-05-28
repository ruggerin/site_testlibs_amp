import BlogCard from "@/components/BlogCard";
import ScrollReveal from "@/components/ScrollReveal";
import PageFooter from "@/components/PageFooter";
import PageHero from "@/components/PageHero";
import PageShell from "@/components/PageShell";
import { POSTS } from "@/data/posts";
import { FRAME } from "@/lib/site";

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <PageShell theme="light">
      <PageHero
        taglines={[
          { text: "Além de entregar resultados,", align: "right" },
          { text: "compartilhamos o pensamento por trás deles", align: "left" },
        ]}
        className="min-h-[min(55svh,560px)]"
      >
        <h1
          className="flex flex-wrap items-baseline gap-x-4 uppercase leading-[0.85] tracking-[-0.04em]"
          style={{ fontFamily: "var(--font-darker-grotesque)" }}
        >
          <span
            className="font-black text-[var(--orange)]"
            style={{ fontSize: "clamp(4rem, 14vw, 16rem)" }}
          >
            blog
          </span>
          <span
            className="font-black text-[#232323]"
            style={{ fontSize: "clamp(4rem, 14vw, 16rem)" }}
          >
            amp
          </span>
        </h1>
        <p
          className="mt-8 max-w-2xl text-[clamp(15px,1.2vw,18px)] leading-relaxed text-[#232323]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Explore nossa curadoria de insights sobre marketing 360, dados e branding para entender
          como o mercado está evoluindo e como sua marca pode liderar essa mudança.
        </p>
      </PageHero>

      <ScrollReveal>
      <section className="bg-white py-16 md:py-24">
        <div className={`${FRAME} px-5 sm:px-8 md:px-16`}>
          {featured ? (
            <div className="mb-16">
              <BlogCard post={featured} />
            </div>
          ) : null}

          <div className="mb-8 flex items-center justify-between border-t border-[#232323]/10 pt-8">
            <span
              className="text-sm font-bold uppercase text-[var(--orange)]"
              style={{ fontFamily: "var(--font-darker-grotesque)" }}
            >
              ver mais
            </span>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      <PageFooter />
    </PageShell>
  );
}
