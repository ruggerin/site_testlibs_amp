import CtaBanner from "@/components/CtaBanner";
import FaqAccordion from "@/components/FaqAccordion";
import ScrollReveal from "@/components/ScrollReveal";
import PageFooter from "@/components/PageFooter";
import PageShell from "@/components/PageShell";
import { FAQ_ITEMS } from "@/data/faq";
import { FRAME } from "@/lib/site";

export default function FaqPage() {
  return (
    <PageShell theme="light">
      <ScrollReveal>
      <section className="bg-white pb-12 pt-4 md:pb-20">
        <div className={`${FRAME} px-5 sm:px-8 md:px-16`}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
            <div>
              <h1
                className="font-black uppercase leading-[0.75] tracking-[-0.09em] text-[#232323]"
                style={{
                  fontFamily: "var(--font-darker-grotesque)",
                  fontSize: "clamp(5rem, 18vw, 24rem)",
                }}
              >
                faq
              </h1>
              <p
                className="mt-6 max-w-xs text-[clamp(1.25rem,2vw,3.25rem)] font-black uppercase leading-tight text-[#232323]"
                style={{ fontFamily: "var(--font-darker-grotesque)" }}
              >
                <span className="mr-2 inline-block h-3 w-16 bg-[var(--orange)] align-middle" aria-hidden />
                perguntas frequentes
              </p>
            </div>
            <FaqAccordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>
      </ScrollReveal>

      <CtaBanner
        title="Para construir um ecossistema digital que converte curiosos em clientes fiéis..."
        subtitle="...você precisa da nossa estratégia 360. Sem firula, com inteligência de dados e UI de alto impacto."
        ctaHref="tel:+5592992345678"
        ctaLabel="Quero o padrão AMP"
      />

      <PageFooter />
    </PageShell>
  );
}
