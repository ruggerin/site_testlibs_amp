import Image from "next/image";
import Navbar from "@/components/Navbar";
import CulturaBanner from "@/components/CulturaBanner";
import CulturaHero from "@/components/CulturaHero";
import CulturaProcess, { CulturaSec1Quote } from "@/components/CulturaProcess";
import PageFooter from "@/components/PageFooter";
import ScrollReveal from "@/components/ScrollReveal";
import { CULTURA_SEC1, FRAME_PAD_X } from "@/lib/site";
import { figmaAspect, figmaClamp } from "@/lib/figma-scale";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Nossa Cultura",
  description:
    "Conheça o método AMP: imersão, estratégia unificada, execução criativa e análise contínua em marketing integrado.",
  path: "/nossa-cultura",
});

export default function NossaCulturaPage() {
  const photoW = CULTURA_SEC1.photoW;
  const photoVw = (photoW / 1920) * 100;

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[#232323]">
      <div className="relative">
        <Navbar theme="light" />
        <CulturaHero />
      </div>

        {/* sec1 — grid 780 + foto: texto nunca invade a coluna da imagem (Figma 2:1155) */}
        <section className="relative z-30 z-10 -mt-[clamp(80px,12svh,180px)] overflow-x-clip bg-[var(--cream)] pb-12 md:pb-20">
          <div
            className={`grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,780px)_1fr] md:gap-x-0 md:gap-y-0 md:pt-[clamp(48px,8.4vw,161px)] ${FRAME_PAD_X} md:pr-0`}
          >
            {/* Coluna texto — 780px máx.; em telas menores ocupa só a coluna esquerda */}
            <div className="relative z-10 min-w-0 pt-12 md:max-w-[780px] md:pt-0 md:pr-6 lg:pr-10">
              <div
                className="flex flex-col"
                style={{ gap: figmaClamp(39, { min: 20, max: 39, vw: (39 / 1920) * 100 }) }}
              >
                <CulturaSec1Quote />

                <ScrollReveal delay={300}>
                  <p
                    className="max-w-[780px] font-medium text-[#232323]"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: figmaClamp(28, { min: 15, max: 28, vw: 1.45 }),
                      lineHeight: 2.2142857142857144,
                    }}
                  >
                    Ao longo dos anos, estruturamos uma forma de trabalhar que respeita o todo. Sem pular
                    etapas, sem atropelar decisões e sem tratar canais como ilhas.
                  </p>
                </ScrollReveal>
              </div>
            </div>

            {/* Foto — coluna direita até a borda; largura reduz em viewports estreitos */}
            <ScrollReveal className="sec1-photo relative min-w-0 -mt-[clamp(100px,21svh,320px)]" delay={80}>
              <div
                className="group relative ml-auto w-full overflow-hidden bg-[#d9d9d9]"
                style={{
                  aspectRatio: figmaAspect(photoW, CULTURA_SEC1.photoH),
                  maxWidth: `min(1052px, ${photoVw.toFixed(2)}vw)`,
                  zIndex: 9999,
                }}
              >
                <Image
                  src="/assets/nossa_cultura/DSC04583.TOPO%20PAGINA.jpeg"
                  alt="Ambiente de trabalho AMP"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  style={{ objectPosition: "24% center" }}
                  sizes={`(max-width: 768px) 100vw, min(42vw, ${photoVw.toFixed(0)}vw)`}
                  priority
                />
              </div>
            </ScrollReveal>
          </div>
        </section>

      <ScrollReveal>
        <CulturaProcess />
      </ScrollReveal>

      <ScrollReveal className="overflow-visible">
        <CulturaBanner />
      </ScrollReveal>

      <PageFooter />
    </div>
  );
}
