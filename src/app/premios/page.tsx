import AwardsCarousel from "@/components/AwardsCarousel";
import ScrollReveal from "@/components/ScrollReveal";
import PageFooter from "@/components/PageFooter";
import PageHero from "@/components/PageHero";
import PageShell from "@/components/PageShell";
import { AWARDS } from "@/data/awards";
import { FRAME } from "@/lib/site";

export default function PremiosPage() {
  return (
    <PageShell theme="light">
      <PageHero
        taglines={[
          { text: "Prêmios são a consequência de estratégias bem executadas", align: "right" },
          { text: "e clientes que confiam no nosso trabalho.", align: "left" },
        ]}
        className="min-h-[min(60svh,640px)]"
      >
        <h1
          className="font-black uppercase leading-[0.85] tracking-[-0.06em] text-[var(--orange)]"
          style={{
            fontFamily: "var(--font-darker-grotesque)",
            fontSize: "clamp(4rem, 14vw, 16rem)",
          }}
        >
          prêmios
        </h1>
      </PageHero>

      <ScrollReveal>
      <section className="bg-white py-16 md:py-24">
        <div className={`${FRAME} px-5 sm:px-8 md:px-16`}>
          <p
            className="mx-auto mb-12 max-w-3xl text-center text-[clamp(16px,1.4vw,22px)] leading-relaxed text-[#232323] md:mb-16"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Prêmios são a consequência de estratégias bem executadas e clientes que confiam no
            nosso trabalho. Cada selo e troféu em nossa prateleira representa um desafio superado
            e um novo patamar de crescimento alcançado para nossas marcas.
          </p>

          <p
            className="mb-10 text-center text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-tight text-[var(--orange)]"
            style={{ fontFamily: "var(--font-darker-grotesque)" }}
          >
            Suco de cevadiss deixa as pessoas mais interessantes
          </p>

          <AwardsCarousel awards={AWARDS} />
        </div>
      </section>
      </ScrollReveal>

      <PageFooter />
    </PageShell>
  );
}
