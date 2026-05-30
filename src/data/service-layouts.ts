/** Posições do título em % do container (grupo titulo no Figma). */
export type ServiceTitlePositions = {
  line1: { left: string; top: string; maxWidth?: string };
  amp: { left: string; top: string };
  line2: { left: string; top: string };
  subtitle: { left: string; top: string; maxWidth: string };
  subtitle2?: { left?: string; right?: string; top: string; width: string };
};

export type ServiceLayoutConfig = {
  /** Figma sem Mask group no topo (ex.: conteúdo 2:925). */
  showHeroImage?: boolean;
  /** Conteúdo: & no topo à direita; demais: & central sobreposto. */
  titleVariant?: "default" | "conteudo";
  sectionPt: string;
  titleInset: string;
  titleMaxW: string;
  titleMinH: string;
  titleOverlap: string;
  titleGapAfterImage?: string;
  imageObjectPosition: string;
  titleTxtInset?: string;
  titlePos: ServiceTitlePositions;
};

const TITLE_OVERLAP = "clamp(0.5rem, 2.2vw, 2.75rem)";
const TITLE_OVERLAP_FIGMA = "clamp(2.5rem, 4.9vw, 4.6875rem)";
const TITLE_MIN_H = "clamp(260px, 24.3vw, 467px)";
const SECTION_GAP = "clamp(4rem, 7.8vw, 9.375rem)";

/** Figma Desktop 2:893 — brand 2:970, perform 2:951, tecno 2:910, conteúdo 2:931. */
export const SERVICE_LAYOUTS: Record<string, ServiceLayoutConfig> = {
  branding: {
    sectionPt: "clamp(3rem, 8vh, 6.5rem)",
    titleInset: "clamp(1.25rem, 10.73vw, 206px)",
    titleMaxW: "min(1621px, 84.4vw)",
    titleMinH: TITLE_MIN_H,
    titleOverlap: TITLE_OVERLAP,
    imageObjectPosition: "58% 32%",
    titlePos: {
      line1: { left: "0%", top: "1.3%", maxWidth: "66%" },
      amp: { left: "29.7%", top: "29.8%" },
      line2: { left: "43.5%", top: "36.2%" },
      subtitle: { left: "9.2%", top: "54.6%", maxWidth: "288px" },
      subtitle2: { right: "0", top: "0", width: "min(344px, 21.2%)" },
    },
  },
  performance: {
    sectionPt: SECTION_GAP,
    titleInset: "clamp(1.25rem, 1.04vw, 20px)",
    titleMaxW: "min(1881px, 97.97vw)",
    titleMinH: TITLE_MIN_H,
    titleOverlap: TITLE_OVERLAP_FIGMA,
    imageObjectPosition: "55% 34%",
    titlePos: {
      line1: { left: "11.11%", top: "0" },
      amp: { left: "19.35%", top: "30.15%" },
      line2: { left: "29.13%", top: "36.66%" },
      subtitle: { left: "0", top: "59.44%", maxWidth: "min(330px, 17.55%)" },
      subtitle2: { right: "0", top: "45.12%", width: "min(370px, 19.67%)" },
    },
  },
  /** Figma 2:910 — titulo 1504×461 @ x:208, y:381; txt 1299×461 @ x:63. */
  tecnologia: {
    sectionPt: SECTION_GAP,
    titleInset: "clamp(1.25rem, 10.83vw, 208px)",
    titleMaxW: "min(1504px, 78.3vw)",
    titleMinH: TITLE_MIN_H,
    titleOverlap: TITLE_OVERLAP_FIGMA,
    imageObjectPosition: "52% 38%",
    titlePos: {
      line1: { left: "4.19%", top: "0", maxWidth: "min(1299px, 86.4%)" },
      amp: { left: "22.21%", top: "30.15%" },
      line2: { left: "36.37%", top: "36.66%" },
      subtitle: { left: "0", top: "64.21%", maxWidth: "min(307px, 20.4%)" },
      subtitle2: { left: "69.48%", top: "46.2%", width: "min(459px, 30.5%)" },
    },
  },
  conteudo: {
    showHeroImage: false,
    titleVariant: "conteudo",
    sectionPt: SECTION_GAP,
    titleInset: "clamp(1.25rem, 13.96vw, 268px)",
    titleMaxW: "min(1466px, 76.35vw)",
    titleMinH: "clamp(280px, 21.5vw, 413px)",
    titleOverlap: "0",
    imageObjectPosition: "58% 32%",
    /** Figma 2:931 OKSOT9 1466×413 — & em (738,0), não padrão brand. */
    titlePos: {
      line2: { left: "3%", top: "5.08%" },
      amp: { left: "50.34%", top: "0" },
      line1: { left: "20.33%", top: "46%" },
      subtitle: { left: "0", top: "79.9%", maxWidth: "min(270px, 18.4%)" },
      subtitle2: { right: "0", top: "14.28%", width: "min(250px, 17%)" },
    },
  },
};

export function getServiceLayout(id: string): ServiceLayoutConfig {
  return SERVICE_LAYOUTS[id] ?? SERVICE_LAYOUTS.branding;
}
