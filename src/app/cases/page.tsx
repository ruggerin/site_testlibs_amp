import CasesChampionBanner from "@/components/CasesChampionBanner";
import CasesGrid from "@/components/CasesGrid";
import CasesHero from "@/components/CasesHero";
import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projetos",
  description:
    "Cases e projetos da Agência AMP — branding, performance, conteúdo e tecnologia integrados.",
  path: "/cases",
});

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-white text-[#232323]">
      <div className="relative">
        <Navbar theme="light" />
        <CasesHero />
      </div>
      <CasesGrid />
      <CasesChampionBanner />
      <PageFooter />
    </div>
  );
}
