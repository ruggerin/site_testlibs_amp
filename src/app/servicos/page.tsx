import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import ServiceSection from "@/components/ServiceSection";
import ServicosConnectBanner from "@/components/ServicosConnectBanner";
import ServicosHero from "@/components/ServicosHero";
import { SERVICOS_SECTIONS } from "@/data/servicos-sections";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Serviços",
  description:
    "Tecnologia, conteúdo, performance e branding integrados — marketing 360 da Agência AMP em Manaus.",
  path: "/servicos",
});

export default function ServicosPage() {
  return (
    <div className="min-h-screen bg-[var(--cream)] text-[#232323]">
      <div className="relative">
        <Navbar theme="light" />
        <ServicosHero />
      </div>

      {SERVICOS_SECTIONS.map((section) => (
        <ServiceSection key={section.id} section={section} />
      ))}

      <ServicosConnectBanner />

      <PageFooter />
    </div>
  );
}
