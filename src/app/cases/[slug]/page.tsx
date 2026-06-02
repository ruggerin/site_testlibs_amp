import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseDetailBanner from "@/components/case-detail/CaseDetailBanner";
import CaseDetailContent from "@/components/case-detail/CaseDetailContent";
import CaseDetailGallery from "@/components/case-detail/CaseDetailGallery";
import CaseDetailHero from "@/components/case-detail/CaseDetailHero";
import CaseDetailRelated from "@/components/case-detail/CaseDetailRelated";
import PageFooter from "@/components/PageFooter";
import SmoothScroll from "@/components/SmoothScroll";
import { CASES, getCaseBySlug } from "@/data/cases";
import { getAdjacentCases, getCaseGallery } from "@/lib/cases-nav";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getCaseBySlug(slug);
  if (!item) return { title: "Projeto — AMP" };
  return pageMetadata({
    title: `${item.client} — ${item.campaign}`,
    description: item.excerpt,
    path: `/cases/${slug}`,
  });
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getCaseBySlug(slug);
  if (!item) notFound();

  const { prev, next } = getAdjacentCases(slug);
  const gallery = getCaseGallery(item);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-white text-[#232323]">
        <CaseDetailHero item={item} prev={prev} next={next} />
        <CaseDetailContent item={item} />
        <CaseDetailGallery images={gallery} />
        <CaseDetailRelated slug={slug} />
        <CaseDetailBanner />
        <PageFooter />
      </div>
    </SmoothScroll>
  );
}
