import CaseCard from "@/components/CaseCard";
import ScrollReveal from "@/components/ScrollReveal";
import PageFooter from "@/components/PageFooter";
import PageHero from "@/components/PageHero";
import PageShell from "@/components/PageShell";
import { CASES } from "@/data/cases";
import { FRAME } from "@/lib/site";

export default function CasesPage() {
  return (
    <PageShell theme="light">
      <PageHero
        taglines={[
          { text: "Quando tudo se conecta,", align: "right" },
          { text: "o resultado deixa de ser esforço", align: "left" },
        ]}
        className="min-h-[min(60svh,640px)]"
      >
        <h1
          className="font-black uppercase leading-[0.85] tracking-[-0.06em] text-[#232323]"
          style={{
            fontFamily: "var(--font-darker-grotesque)",
            fontSize: "clamp(4rem, 14vw, 16rem)",
          }}
        >
          projetos
        </h1>
      </PageHero>

      <section className="bg-white py-16 md:py-24">
        <div className={`${FRAME} px-5 sm:px-8 md:px-16`}>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {CASES.map((item, i) => (
              <ScrollReveal key={item.slug} delay={i * 60}>
                <CaseCard item={item} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <PageFooter />
    </PageShell>
  );
}
