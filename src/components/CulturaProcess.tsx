import Image from "next/image";
import { FRAME } from "@/lib/site";

export type CulturaStep = {
  number: number;
  title: string;
  description: string;
  icon: string;
};

const DEFAULT_STEPS: CulturaStep[] = [
  {
    number: 1,
    title: "Imersão",
    icon: "/nossa-cultura/icon-imersao.svg",
    description:
      "Antes de qualquer plano, a gente entende: negócio, mercado, momento e histórico. Uma estratégia consistente não pode ser construída no raso. É aqui que as peças começam a fazer sentido.",
  },
  {
    number: 2,
    title: "Estratégia Unificada",
    icon: "/nossa-cultura/icon-estrategia.svg",
    description:
      "Com o cenário claro, organizamos os caminhos. Canais, mensagens, prioridades, tudo pensado de forma integrada, com cada frente cumprindo um papel dentro do mesmo objetivo. Planejar separado é o começo do problema.",
  },
  {
    number: 3,
    title: "Execução Criativa",
    icon: "/nossa-cultura/icon-execucao.svg",
    description:
      "A estratégia ganha forma. Campanhas, peças, conteúdos e experiências começam a rodar com consistência e alinhamento. A criatividade se torna a direção.",
  },
  {
    number: 4,
    title: "Análise e Evolução",
    icon: "/nossa-cultura/icon-analise.svg",
    description:
      "Acompanhamos, interpretamos e ajustamos. O que funciona escala. O que não funciona ensina e muda. Dado, sem leitura, não leva ninguém a lugar nenhum.",
  },
];

/** Posições no ciclo (desktop): 1 topo, 2 direita, 3 baixo, 4 esquerda */
const CYCLE_SLOTS: { className: string; stepIndex: number }[] = [
  { className: "lg:col-start-2 lg:row-start-1 lg:text-center", stepIndex: 0 },
  { className: "lg:col-start-3 lg:row-start-2 lg:text-left", stepIndex: 1 },
  { className: "lg:col-start-2 lg:row-start-3 lg:text-center", stepIndex: 2 },
  { className: "lg:col-start-1 lg:row-start-2 lg:text-right", stepIndex: 3 },
];

function StepNumber({ n }: { n: number }) {
  return (
    <span
      className="inline-flex items-baseline gap-0.5 font-black uppercase leading-none text-[var(--orange)]"
      style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
    >
      <span className="font-medium">o</span>
      <span className="text-[#232323]/35">{n}</span>
    </span>
  );
}

function StepCard({ step }: { step: CulturaStep }) {
  return (
    <article className="flex max-w-md flex-col gap-3">
      <StepNumber n={step.number} />
      <h3
        className="font-bold uppercase leading-[0.88] tracking-[-0.04em] text-[#232323]/45"
        style={{
          fontFamily: "var(--font-darker-grotesque)",
          fontSize: "clamp(1.75rem, 3.5vw, 4.5rem)",
        }}
      >
        {step.title}
      </h3>
      <p
        className="text-[clamp(14px,1.1vw,17px)] leading-relaxed text-[#232323]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {step.description}
      </p>
    </article>
  );
}

export default function CulturaProcess({ steps = DEFAULT_STEPS }: { steps?: CulturaStep[] }) {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 30% 20%, var(--orange) 0%, transparent 50%)",
        }}
        aria-hidden
      />

      <div className={`${FRAME} relative px-5 sm:px-8 md:px-16`}>
        {/* Desktop: grid 3x3 com hub central */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:grid-rows-3 lg:gap-8 lg:min-h-[1100px]">
          {CYCLE_SLOTS.map(({ className, stepIndex }) => (
            <div key={steps[stepIndex].number} className={`flex items-center justify-center ${className}`}>
              <StepCard step={steps[stepIndex]} />
            </div>
          ))}

          <div className="lg:col-start-2 lg:row-start-2 flex items-center justify-center">
            <div className="relative size-[min(100%,320px)] max-w-[320px]">
              <div className="absolute inset-4 rounded-full border-2 border-dashed border-[var(--orange)]/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-3 p-4">
                  {steps.map((step) => (
                    <div
                      key={step.number}
                      className="flex size-20 items-center justify-center rounded-full bg-[var(--orange)] shadow-lg md:size-24"
                    >
                      <Image
                        src={step.icon}
                        alt=""
                        width={56}
                        height={56}
                        className="size-10 object-contain md:size-14"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="absolute -bottom-2 left-1/2 w-4 -translate-x-1/2 rounded bg-[var(--orange)] py-1"
                aria-hidden
              />
            </div>
          </div>
        </div>

        {/* Mobile / tablet: lista */}
        <div className="flex flex-col gap-14 lg:hidden">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-5">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[var(--orange)]">
                <Image src={step.icon} alt="" width={40} height={40} className="size-9 object-contain" />
              </div>
              <StepCard step={step} />
            </div>
          ))}
        </div>

        <p
          className="mx-auto mt-16 max-w-2xl text-center text-[clamp(15px,1.35vw,20px)] leading-relaxed text-[#232323] lg:mt-20"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          É um ciclo contínuo, onde cada fase alimenta a próxima e refina a anterior.
        </p>
      </div>
    </section>
  );
}
