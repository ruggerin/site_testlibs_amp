import CaseCard from "@/components/CaseCard";
import ScrollReveal from "@/components/ScrollReveal";
import { getCaseBySlug } from "@/data/cases";
import { CASES_GRID_LAYOUT, CASES_GRID_SLUGS } from "@/data/cases-layout";
import { figmaClamp } from "@/lib/figma-scale";
import { FRAME, FRAME_PAD_X } from "@/lib/site";

const S = CASES_GRID_LAYOUT.typeScale;

const CLIENT_SIZE = figmaClamp(32 * S, { min: 12, max: 28, vw: 1.35 });
const CAMPAIGN_SIZE = figmaClamp(52 * S, { min: 18, max: 38, vw: 2.05 });
const EXCERPT_SIZE = figmaClamp(32 * S, { min: 12, max: 22, vw: 1.25 });

export default function CasesGrid() {
  const items = CASES_GRID_SLUGS.flatMap((slug) => {
    const item = getCaseBySlug(slug);
    return item ? [{ item, key: slug }] : [];
  });

  const { colGapPx, rowGapPx } = CASES_GRID_LAYOUT;

  return (
    <section className="bg-white pb-10 pt-6 md:pb-14 md:pt-8" id="cases-grid">
      <div className={`${FRAME} ${FRAME_PAD_X}`}>
        <ul
          className="grid list-none grid-cols-1 p-0 m-0 md:grid-cols-2"
          style={{
            columnGap: `clamp(20px, 2.5vw, ${colGapPx}px)`,
            rowGap: `clamp(40px, 4vw, ${rowGapPx}px)`,
          }}
        >
          {items.map(({ item, key }, i) => (
            <li key={key} className="min-w-0">
              <ScrollReveal delay={i * 50}>
                <CaseCard
                  item={item}
                  variant="listing"
                  typography={{
                    client: CLIENT_SIZE,
                    campaign: CAMPAIGN_SIZE,
                    excerpt: EXCERPT_SIZE,
                  }}
                />
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
