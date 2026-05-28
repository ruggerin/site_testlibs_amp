import Image from "next/image";
import CulturaProcess from "@/components/CulturaProcess";
import PageFooter from "@/components/PageFooter";
import PageHero from "@/components/PageHero";
import PageShell from "@/components/PageShell";
import ScrollReveal from "@/components/ScrollReveal";
import { FRAME } from "@/lib/site";

export default function NossaCulturaPage() {
  return (
    <PageShell theme="light">
      <PageHero
        taglines={[
          { text: "Visão holística é método.", align: "right" },
          { text: "Marketing integrado não acontece por acaso.", align: "left" },
        ]}
        className="relative min-h-[min(100svh,900px)] overflow-hidden"
      >
        <div
          className="pointer-events-none absolute -right-[20%] top-0 z-0 h-full w-[85%] max-w-[1200px] opacity-90 relative"
          aria-hidden
        >
          <Image
            src="/nossa-cultura/hero-bg.svg"
            alt=""
            fill
            className="object-cover object-right-top"
            priority
          />
        </div>
        <div className="relative z-10">
          <h1
            className="flex flex-wrap items-end gap-x-[0.08em] uppercase leading-[0.85] tracking-[-0.06em] text-[#232323]"
            style={{ fontFamily: "var(--font-darker-grotesque)" }}
          >
            <span
              className="font-black"
              style={{ fontSize: "clamp(4rem, 18vw, 29rem)" }}
            >
              nossa
            </span>
            <span
              className="font-black text-[var(--orange)]"
              style={{ fontSize: "clamp(5rem, 22vw, 34rem)", lineHeight: 0.75 }}
              aria-hidden
            >
              c
            </span>
            <span
              className="font-black"
              style={{ fontSize: "clamp(4rem, 18vw, 29rem)" }}
            >
              ultura
            </span>
          </h1>
        </div>
      </PageHero>

      <ScrollReveal>
      {/* sec1 — imagem + manifesto (sobreposição ao hero no Figma) */}
      <section className="relative z-10 -mt-8 bg-white pb-16 md:-mt-20 md:pb-24">
        <div className={`${FRAME} grid gap-10 px-5 sm:px-8 md:grid-cols-2 md:items-center md:gap-16 md:px-16`}>
          <div className="relative aspect-[880/636] w-full overflow-hidden rounded-sm bg-[var(--cream)]">
            <Image
              src="/nossa-cultura/sec1-photo.png"
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="flex flex-col gap-8">
            <p
              className="text-[clamp(16px,1.5vw,28px)] leading-[2.2] text-[#232323]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Ao longo dos anos, estruturamos uma forma de trabalhar que respeita o todo. Sem pular
              etapas, sem atropelar decisões e sem tratar canais como ilhas.
            </p>

            <div className="flex gap-3">
              <div className="flex flex-col gap-2 pt-1" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="h-1 w-8 bg-[var(--orange)] md:w-10" />
                ))}
              </div>
              <p
                className="max-w-lg text-[clamp(15px,1.2vw,22px)] font-medium leading-snug text-[#232323]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Ele precisa de direção, processo e, principalmente, de uma leitura completa do
                negócio.
              </p>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <CulturaProcess />

      <ScrollReveal>
      {/* banner — bloco “E se...?” */}
      <section className="bg-white py-16 md:py-24">
        <div className={`${FRAME} px-5 sm:px-8 md:px-16`}>
          <div className="overflow-hidden rounded-[35px] bg-[#232323] md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div className="relative min-h-[240px] bg-[var(--cream)] md:min-h-[360px]">
              <div
                className="absolute inset-0 bg-gradient-to-br from-[var(--orange)]/20 to-transparent"
                aria-hidden
              />
            </div>
            <div className="flex flex-col justify-center gap-6 bg-[#232323] p-8 md:rounded-r-[35px] md:p-12 lg:p-16">
              <p
                className="text-[clamp(1.5rem,3vw,5.75rem)] font-black uppercase leading-[1.02] tracking-[-0.04em] text-[var(--cream)]"
                style={{ fontFamily: "var(--font-darker-grotesque)" }}
              >
                Na AMP, acreditamos que as melhores ideias nascem da pergunta &ldquo;E se...?&rdquo;
              </p>
              <p
                className="text-[clamp(15px,1.25vw,20px)] leading-relaxed text-[var(--cream)]/90"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Nós não apenas pensamos fora da caixa, nós criamos uma nova caixa onde sua marca
                brilha e seus concorrentes ficam se perguntando o que aconteceu.
              </p>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <PageFooter />
    </PageShell>
  );
}
