import ChampionBanner from "@/components/ChampionBanner";
import { FULL_BLEED, PREMIOS_PAD_X } from "@/lib/site";

/** Banner CTA — /premios (Figma 2:580). */
export default function PremiosChampionBanner() {
  return (
    <ChampionBanner
      sectionClassName={`${FULL_BLEED} bg-[#232323] py-10 md:py-14`}
      cardClassName="w-full max-w-none overflow-hidden rounded-[28px] bg-[#232323] ring-1 ring-white/10 md:grid md:min-h-[clamp(300px,24vw,520px)] md:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]"
      padStyle={{ paddingLeft: PREMIOS_PAD_X, paddingRight: PREMIOS_PAD_X }}
    />
  );
}
