import PageFooter from "@/components/PageFooter";
import PageHero from "@/components/PageHero";
import PageShell from "@/components/PageShell";
import ScrollReveal from "@/components/ScrollReveal";
import ServiceBlock from "@/components/ServiceBlock";
import { SERVICES } from "@/data/services";

export default function ServicosPage() {
  return (
    <PageShell theme="light">
      <PageHero
        taglines={[
          { text: "Tudo conectado.", align: "right" },
          { text: "Do jeito que deve ser.", align: "left" },
        ]}
        className="min-h-[min(70svh,720px)]"
      >
        <h1
          className="font-black uppercase leading-[0.85] tracking-[-0.06em] text-[#232323]"
          style={{
            fontFamily: "var(--font-darker-grotesque)",
            fontSize: "clamp(4rem, 16vw, 18rem)",
          }}
        >
          serviços
        </h1>
      </PageHero>

      {SERVICES.map((service, i) => (
        <ScrollReveal key={service.id} delay={i * 80}>
          <ServiceBlock service={service} />
        </ScrollReveal>
      ))}

      <PageFooter />
    </PageShell>
  );
}
