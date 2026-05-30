import { figmaClamp } from "@/lib/figma-scale";
import type { FaqItem } from "@/data/faq";

const ARTBOARD_W = 1920;

/** Figma style_HPMNAF — 52px. */
const QUESTION_SIZE = figmaClamp(52, {
  min: 18,
  max: 52,
  vw: (52 / ARTBOARD_W) * 100,
});

/** Figma style_TKTF44 — 28px. */
const ANSWER_SIZE = figmaClamp(28, {
  min: 15,
  max: 28,
  vw: (28 / ARTBOARD_W) * 100,
});

type FaqCardsProps = {
  items: FaqItem[];
};

/** Figma sec1 2:625 — grid 2×2, cards 596×744, radius 35, fundo cream. */
export default function FaqCards({ items }: FaqCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-[clamp(20px,1.8vw,35px)] sm:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.id}
          className="flex min-h-[clamp(280px,38vw,744px)] flex-col rounded-[35px] bg-[var(--cream)] px-[clamp(24px,2.3vw,45px)] pb-[clamp(24px,2.3vw,45px)] pt-[clamp(40px,2.7vw,52px)]"
        >
          <h2
            className="m-0 font-black uppercase leading-[0.88] text-[var(--ink)]"
            style={{
              fontFamily: "var(--font-darker-grotesque)",
              fontSize: QUESTION_SIZE,
            }}
          >
            {item.id}. {item.question}
          </h2>
          <p
            className="mt-[clamp(1.25rem,2.5vw,2.75rem)] flex-1 text-[var(--ink)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: ANSWER_SIZE,
              lineHeight: 1.79,
              letterSpacing: "-0.03em",
            }}
          >
            {item.answer}
          </p>
        </article>
      ))}
    </div>
  );
}
