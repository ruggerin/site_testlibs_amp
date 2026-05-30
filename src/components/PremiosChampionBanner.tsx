import Link from "next/link";
import { figmaClamp } from "@/lib/figma-scale";

const SIDE_PAD = "clamp(24px, 1.75vw, 36px)";

const TITLE_SIZE = figmaClamp(138, { min: 28, max: 96, vw: 5.2 });
const BODY_SIZE = figmaClamp(38, { min: 14, max: 28, vw: 1.55 });
const CTA_SIZE = figmaClamp(28, { min: 12, max: 22, vw: 1.2 });

/** Banner — Figma 2:580 (1860×626 @ x:30). */
export default function PremiosChampionBanner() {
  return (
    <section className="w-full bg-white py-10 md:py-14">
      <div className="w-full" style={{ paddingLeft: SIDE_PAD, paddingRight: SIDE_PAD }}>
        <div className="w-full overflow-hidden rounded-[28px] bg-[#232323] md:grid md:min-h-[clamp(300px,24vw,520px)] md:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
          <div className="flex min-w-0 flex-col justify-center p-6 md:p-8 lg:px-10 lg:py-12">
            <p
              className="max-w-[977px] font-black uppercase leading-[0.87] tracking-[-0.04em] text-[#F7F7F7]"
              style={{
                fontFamily: "var(--font-darker-grotesque)",
                fontSize: TITLE_SIZE,
              }}
            >
              Chega de ser &ldquo;legalzinho&rdquo;. Seja o campeão do seu jogo.
            </p>
          </div>
          <div className="flex min-w-0 flex-col justify-center gap-6 p-6 md:gap-8 lg:px-10 lg:py-12">
            <p
              className="max-w-[587px] font-semibold leading-[1.68] text-[#F7F7F7] md:max-w-none"
              style={{ fontFamily: "var(--font-inter)", fontSize: BODY_SIZE }}
            >
              Na AMP, somos obcecados por performance, resultados e em transformar sua
              marca em uma referência de sucesso
            </p>
            <Link
              href="/quem-somos"
              className="inline-flex w-fit max-w-full items-center justify-center border-[3px] border-[#F7F7F7] px-8 py-3 font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#F7F7F7] hover:text-[#232323] md:px-9 md:py-3.5"
              style={{ fontFamily: "var(--font-inter)", fontSize: CTA_SIZE }}
            >
              quero ser o campeão
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
