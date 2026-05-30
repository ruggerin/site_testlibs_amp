import Link from "next/link";
import CaseCard from "@/components/CaseCard";
import { CASES_GRID_LAYOUT } from "@/data/cases-layout";
import { getRelatedCases, type CaseStudy } from "@/data/cases";
import { figmaClamp } from "@/lib/figma-scale";
import { FRAME, FRAME_PAD_X } from "@/lib/site";

const S = CASES_GRID_LAYOUT.typeScale;
const HEADING_SIZE = figmaClamp(32, { min: 16, max: 32, vw: 1.67 });
const LINK_SIZE = figmaClamp(32, { min: 16, max: 32, vw: 1.67 });
const CLIENT_SIZE = figmaClamp(32 * S, { min: 12, max: 28, vw: 1.35 });
const CAMPAIGN_SIZE = figmaClamp(52 * S, { min: 18, max: 38, vw: 2.05 });
const EXCERPT_SIZE = figmaClamp(32 * S, { min: 12, max: 22, vw: 1.25 });

/** sec3 — Figma 2:700 (3 cards + títulos). */
export default function CaseDetailRelated({
  slug,
  items,
}: {
  slug: string;
  items?: CaseStudy[];
}) {
  const related = items ?? getRelatedCases(slug, 3);

  return (
    <section className="overflow-x-clip bg-white py-14 md:py-20">
      <div className={`${FRAME} ${FRAME_PAD_X}`}>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2
            className="font-light uppercase text-[var(--orange)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: HEADING_SIZE,
            }}
          >
            confira mais projetos como este
          </h2>
          <Link
            href="/cases"
            className="font-light uppercase text-[var(--orange)] transition-opacity hover:opacity-80"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: LINK_SIZE,
            }}
          >
            ver todos
          </Link>
        </div>

        <ul className="grid list-none grid-cols-1 gap-10 p-0 m-0 lg:grid-cols-3 lg:gap-8">
          {related.map((item) => (
            <li key={item.slug} className="min-w-0">
              <CaseCard
                item={item}
                variant="listing"
                typography={{
                  client: CLIENT_SIZE,
                  campaign: CAMPAIGN_SIZE,
                  excerpt: EXCERPT_SIZE,
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
