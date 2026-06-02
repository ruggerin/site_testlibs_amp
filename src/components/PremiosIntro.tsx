import { figmaClamp } from "@/lib/figma-scale";
import { FULL_BLEED, PREMIOS_PAD_X } from "@/lib/site";

const HEADLINE_SIZE = figmaClamp(90, { min: 28, max: 90, vw: 4.7 });
const BODY_SIZE = figmaClamp(28, { min: 15, max: 28, vw: 1.45 });

const INTRO =
  "Prêmios são a consequência de estratégias bem executadas e clientes que confiam no nosso trabalho. Cada selo e troféu em nossa prateleira representa um desafio superado e um novo patamar de crescimento alcançado para nossas marcas.";

/** Group 33 — Figma 2:561 (1782×306). */
export default function PremiosIntro() {
  return (
    <section
      className={`${FULL_BLEED} relative overflow-x-clip bg-[#232323] py-10 md:py-14 lg:py-16`}
      style={{ paddingLeft: PREMIOS_PAD_X, paddingRight: PREMIOS_PAD_X }}
    >
      <div className="w-full max-w-none">
        <div className="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,726fr)_minmax(0,888fr)] lg:gap-x-[clamp(1.5rem,4vw,5rem)]">
          <h2
            className="min-w-0 font-black uppercase leading-[0.83] tracking-[-0.05em] text-[var(--orange)]"
            style={{
              fontFamily: "var(--font-darker-grotesque)",
              fontSize: HEADLINE_SIZE,
            }}
          >
            Suco de cevadiss deixa as pessoas mais interessantis
          </h2>
          <p
            className="min-w-0 font-normal leading-[2.21] text-[#F7F7F7] lg:pt-1"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: BODY_SIZE,
            }}
          >
            {INTRO}
          </p>
        </div>
      </div>
    </section>
  );
}
