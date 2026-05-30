import type { CaseStudy } from "@/data/cases";
import { figmaClamp } from "@/lib/figma-scale";

/** Figma sec1 — grupo 1867×1341 @ x:28 (padding ~1,46vw). */
const SIDE_PAD = "clamp(20px, 1.46vw, 28px)";

const CAMPAIGN_SIZE = figmaClamp(90, { min: 32, max: 90, vw: 4.7 });
const NARRATIVE_SIZE = figmaClamp(28, { min: 15, max: 28, vw: 1.45 });
const CARD_LABEL_SIZE = figmaClamp(90, { min: 28, max: 90, vw: 4.7 });
const CARD_BODY_SIZE = figmaClamp(28, { min: 14, max: 28, vw: 1.45 });

const PILLARS = [
  { key: "objective" as const, label: "Objetivo" },
  { key: "challenge" as const, label: "impacto" },
  { key: "result" as const, label: "resultado" },
];

/** sec1 — Figma 2:720 (fundo cream, largura total, título + narrativa + 3 caixas). */
export default function CaseDetailContent({ item }: { item: CaseStudy }) {
  const paragraphs = item.narrative.split(/\n\n+/).filter(Boolean);

  return (
    <section className="w-full bg-[var(--cream)] py-12 md:py-16 lg:py-20">
      <div className="w-full" style={{ paddingLeft: SIDE_PAD, paddingRight: SIDE_PAD }}>
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,27.5%)_minmax(0,1fr)] lg:gap-x-[clamp(24px,8.3vw,159px)] lg:gap-y-14">
          <h1
            className="font-black uppercase leading-[0.83] tracking-[-0.05em] text-[var(--orange)]"
            style={{
              fontFamily: "var(--font-darker-grotesque)",
              fontSize: CAMPAIGN_SIZE,
            }}
          >
            {item.campaign}
          </h1>

          <div
            className="min-w-0 space-y-6 text-[#232323] lg:max-w-[1192px] lg:justify-self-end lg:pt-0"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: NARRATIVE_SIZE,
              lineHeight: 2.214,
            }}
          >
            {paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>

        <div
          className="mt-12 grid w-full grid-cols-1 gap-[clamp(16px,1.5vw,29px)] md:grid-cols-3 lg:mt-16"
        >
          {PILLARS.map(({ key, label }) => (
            <div
              key={key}
              className="min-w-0 border-[3px] border-[var(--orange)] bg-[var(--cream)] p-8 md:min-h-[280px] md:p-10 lg:min-h-[320px]"
            >
              <h2
                className="mb-6 font-bold uppercase leading-[0.73] tracking-[-0.05em] text-[var(--orange)]"
                style={{
                  fontFamily: "var(--font-darker-grotesque)",
                  fontSize: CARD_LABEL_SIZE,
                }}
              >
                {label}
              </h2>
              <p
                className="text-[#232323]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: CARD_BODY_SIZE,
                  lineHeight: 1.786,
                  letterSpacing: "-0.03em",
                }}
              >
                {item[key]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
