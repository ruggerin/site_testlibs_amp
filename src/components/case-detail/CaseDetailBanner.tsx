import Link from "next/link";
import { figmaClamp } from "@/lib/figma-scale";

const SIDE_PAD = "clamp(20px, 1.46vw, 30px)";
const QUOTE_SIZE = figmaClamp(92, { min: 28, max: 92, vw: 4.8 });
const BODY_SIZE = figmaClamp(38, { min: 15, max: 38, vw: 1.98 });
const CTA_SIZE = figmaClamp(28, { min: 13, max: 28, vw: 1.46 });

/** Banner — Figma 2:735 (1860×636, radius 35px). */
export default function CaseDetailBanner() {
  return (
    <section className="w-full bg-white py-10 md:py-14">
      <div className="w-full" style={{ paddingLeft: SIDE_PAD, paddingRight: SIDE_PAD }}>
        <div className="w-full overflow-hidden rounded-[35px] bg-[var(--cream)] md:grid md:min-h-[clamp(420px,33vw,636px)] md:grid-cols-[minmax(0,1.06fr)_minmax(280px,0.94fr)]">
          <div className="flex min-w-0 flex-col justify-center p-8 md:p-12 lg:px-14 lg:py-16">
            <p
              className="max-w-[850px] font-black uppercase leading-[1.01] tracking-[-0.04em] text-[#232323]"
              style={{
                fontFamily: "var(--font-darker-grotesque)",
                fontSize: QUOTE_SIZE,
              }}
            >
              Na AMP, acreditamos que as melhores ideias nascem da pergunta &ldquo;E se...?&rdquo;
            </p>
          </div>

          <div className="flex min-w-0 flex-col justify-center gap-6 bg-[#232323] p-8 md:gap-8 md:rounded-r-[35px] md:p-12 lg:px-14 lg:py-16">
            <p
              className="max-w-[750px] font-semibold leading-[1.68] text-[#F7F7F7] md:max-w-none"
              style={{ fontFamily: "var(--font-inter)", fontSize: BODY_SIZE }}
            >
              Nós não apenas pensamos fora da caixa, nós criamos uma nova caixa onde sua marca
              brilha e seus concorrentes ficam se perguntando o que aconteceu.
            </p>
            <Link
              href="/quem-somos"
              className="inline-flex w-fit max-w-full shrink-0 items-center justify-center border-[3px] border-[var(--orange)] px-10 py-4 font-semibold uppercase tracking-[0.1em] text-[var(--orange)] transition-colors hover:bg-[var(--orange)] hover:text-white"
              style={{ fontFamily: "var(--font-inter)", fontSize: CTA_SIZE }}
            >
              Cansei de ser médio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
