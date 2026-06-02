import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
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

      {SERVICES.map((service) => (
        <ServiceBlock key={service.id} service={service} />
      ))}

      <ServicosConnectBanner />

      <PageFooter />
    </div>
  );
}
