import ChampionBanner from "@/components/ChampionBanner";
import { CASES_GRID_LAYOUT } from "@/data/cases-layout";

const SIDE_PAD = "clamp(20px, 1.46vw, 30px)";

/** Banner CTA — /cases (Figma 2:857). */
export default function CasesChampionBanner() {
  return (
    <ChampionBanner
      typeScale={CASES_GRID_LAYOUT.typeScale * 0.9}
      padStyle={{ paddingLeft: SIDE_PAD, paddingRight: SIDE_PAD }}
    />
  );
}
