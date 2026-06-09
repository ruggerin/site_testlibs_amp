import FaqCards from "@/components/FaqCards";
import FaqCtaBanner from "@/components/FaqCtaBanner";
import FaqHero from "@/components/FaqHero";
import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import ScrollReveal from "@/components/ScrollReveal";
import { FAQ_ITEMS } from "@/data/faq";

const SIDE_PAD = "clamp(24px, 1.75vw, 36px)";

/** /faq — Figma 2:694: fundo laranja na seção inteira; cards cream por cima. */
export default function FaqPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[var(--ink)]">
      <div className="relative">
        <Navbar theme="light" />

        <section
          data-page-hero
          className="relative bg-[var(--orange)]"
          aria-label="FAQ"
          style={{ paddingTop: "clamp(6.25rem, 13vh, 8.5rem)" }}
        >
          <div
            className="mx-auto grid w-full max-w-[1920px] grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,34.5%)_minmax(0,1fr)] lg:gap-[clamp(20px,2.2vw,42px)]"
            style={{
              paddingLeft: SIDE_PAD,
              paddingRight: SIDE_PAD,
              paddingBottom: "clamp(2.5rem, 5vw, 4rem)",
            }}
          >
            <FaqHero />
            <FaqCards items={FAQ_ITEMS} />
          </div>
        </section>
      </div>

      <ScrollReveal>
        <FaqCtaBanner />
      </ScrollReveal>

      <PageFooter />
    </div>
  );
}
