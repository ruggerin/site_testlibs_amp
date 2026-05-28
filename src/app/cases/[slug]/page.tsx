import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import CaseCard from "@/components/CaseCard";
import PageFooter from "@/components/PageFooter";
import PageShell from "@/components/PageShell";
import { CASES, getCaseBySlug, getRelatedCases } from "@/data/cases";
import { FRAME } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getCaseBySlug(slug);
  if (!item) return { title: "Projeto — AMP" };
  return pageMetadata({
    title: item.client,
    description: item.excerpt,
    path: `/cases/${slug}`,
  });
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getCaseBySlug(slug);
  if (!item) notFound();

  const related = getRelatedCases(slug);

  return (
    <PageShell theme="light">
      <section className="bg-[var(--cream)] pb-12 pt-4 md:pb-16">
        <div className={`${FRAME} px-5 sm:px-8 md:px-16`}>
          <p
            className="mb-4 text-sm font-bold uppercase text-[var(--orange)]"
            style={{ fontFamily: "var(--font-darker-grotesque)" }}
          >
            {item.client}
          </p>
          <h1
            className="max-w-4xl font-bold uppercase leading-tight text-[#232323]/50"
            style={{
              fontFamily: "var(--font-darker-grotesque)",
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
            }}
          >
            {item.campaign}
          </h1>
        </div>
      </section>

      <section className="bg-white py-12 md:py-20">
        <div className={`${FRAME} px-5 sm:px-8 md:px-16`}>
          <div className="relative mb-12 aspect-[21/9] w-full overflow-hidden rounded-sm bg-[var(--cream)]">
            <Image
              src={item.image}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          </div>

          <div className="max-w-3xl space-y-6">
            {item.narrative.split("\n\n").map((p) => (
              <p
                key={p.slice(0, 32)}
                className="text-[clamp(15px,1.2vw,20px)] leading-relaxed text-[#232323]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {(
              [
                { label: "Objetivo", text: item.objective },
                { label: "Impacto", text: item.impact },
                { label: "Resultado", text: item.result },
              ] as const
            ).map(({ label, text }) => (
              <div
                key={label}
                className="border-2 border-[#232323] bg-[var(--cream)] p-6 md:p-8"
              >
                <h2
                  className="mb-4 text-xl font-bold uppercase text-[var(--orange)]"
                  style={{ fontFamily: "var(--font-darker-grotesque)" }}
                >
                  {label}
                </h2>
                <p
                  className="text-sm leading-relaxed text-[#232323] md:text-base"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#232323]/10 bg-white py-16 md:py-20">
        <div className={`${FRAME} px-5 sm:px-8 md:px-16`}>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2
              className="text-2xl font-black uppercase text-[#232323]"
              style={{ fontFamily: "var(--font-darker-grotesque)" }}
            >
              Projetos relacionados
            </h2>
            <Link
              href="/cases"
              className="text-sm font-semibold uppercase tracking-widest text-[var(--orange)] hover:opacity-80"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              ver todos
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {related.map((r) => (
              <CaseCard key={r.slug} item={r} />
            ))}
          </div>
        </div>
      </section>

      <PageFooter />
    </PageShell>
  );
}
