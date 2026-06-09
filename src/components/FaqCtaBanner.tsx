import { figmaClamp } from "@/lib/figma-scale";
import { SITE } from "@/lib/site";

const SIDE_PAD = "clamp(24px, 1.75vw, 36px)";

/** Figma 2:657 banner — 1860×636, fundo #232323, textos cream. */
const TITLE_SIZE = figmaClamp(92, { min: 28, max: 92, vw: 4.8 });
const BODY_SIZE = figmaClamp(38, { min: 14, max: 38, vw: 1.98 });
const CTA_SIZE = figmaClamp(28, { min: 12, max: 28, vw: 1.46 });

export default function FaqCtaBanner() {
  return (
    <section className="w-full bg-white py-10 md:py-14">
      <div className="w-full" style={{ paddingLeft: SIDE_PAD, paddingRight: SIDE_PAD }}>
        <div className="mx-auto w-full max-w-[1860px] overflow-hidden rounded-[35px] bg-[var(--ink)] md:grid md:min-h-[clamp(300px,33vw,636px)] md:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
          <div className="flex min-w-0 flex-col justify-center p-6 md:p-8 lg:px-[clamp(40px,3.4vw,66px)] lg:py-12">
            <p
              className="max-w-[822px] font-black uppercase leading-[1.01] tracking-[-0.04em] text-[var(--cream)]"
              style={{
                fontFamily: "var(--font-darker-grotesque)",
                fontSize: TITLE_SIZE,
              }}
            >
              Para construir um ecossistema digital que converte curiosos em clientes fiéis...
            </p>
          </div>
          <div className="flex min-w-0 flex-col justify-center gap-6 p-6 md:gap-8 lg:px-[clamp(40px,3.4vw,66px)] lg:py-12">
            <p
              className="max-w-[587px] font-semibold leading-[1.68] text-[var(--cream)]"
              style={{ fontFamily: "var(--font-inter)", fontSize: BODY_SIZE }}
            >
              ...você precisa da nossa estratégia 360. Sem firula, com inteligência de dados e
              UI de alto impacto.
            </p>
            <a
              href={SITE.captureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit max-w-full items-center justify-center border-[3px] border-[var(--cream)] bg-white px-8 py-3 font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition-colors hover:bg-[var(--cream)] md:px-10 md:py-3.5"
              style={{ fontFamily: "var(--font-inter)", fontSize: CTA_SIZE }}
            >
              Quero o padrão AMP
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
