import AwardsCarousel from "@/components/AwardsCarousel";
import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import PremiosChampionBanner from "@/components/PremiosChampionBanner";
import PremiosHero from "@/components/PremiosHero";
import PremiosIntro from "@/components/PremiosIntro";
import ScrollReveal from "@/components/ScrollReveal";
import { AWARDS } from "@/data/awards";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Prêmios",
  description:
    "Reconhecimentos e prêmios da Agência AMP — estratégia, criatividade e resultados para marcas no Norte.",
  path: "/premios",
});

export default function PremiosPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[#232323]">
      <Navbar theme="light" />
      <PremiosHero />

      <PremiosIntro />

      <AwardsCarousel awards={AWARDS} />

      <ScrollReveal className="overflow-visible">
        <PremiosChampionBanner />
      </ScrollReveal>

      <PageFooter />
    </div>
  );
}
