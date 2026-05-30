import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import ScrollReveal from "@/components/ScrollReveal";
import ServiceBlock from "@/components/ServiceBlock";
import ServicosConnectBanner from "@/components/ServicosConnectBanner";
import ServicosHero from "@/components/ServicosHero";
import { SERVICES } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Serviços",
  description:
    "Tecnologia, conteúdo, performance e branding integrados — marketing 360 da Agência AMP em Manaus.",
  path: "/servicos",
});

export default function ServicosPage() {
  return (
    <div className="min-h-screen bg-white text-[#232323]">
      <div className="relative">
        <Navbar theme="light" />
        <ServicosHero />
      </div>

      {SERVICES.map((service, i) => (
        <ScrollReveal key={service.id} delay={i * 60}>
          <ServiceBlock service={service} />
        </ScrollReveal>
      ))}

      <ScrollReveal className="overflow-visible">
        <ServicosConnectBanner />
      </ScrollReveal>

      <PageFooter />
    </div>
  );
}
