/** Ordem do grid — secao_cases.txt (publicados: 01–04, 07). */
export const CASES_GRID_SLUGS = [
  "amazongas",
  "ramsons",
  "supermercados-coema",
  "skarloff",
  "mobili-store",
] as const;

/** Card — Figma case1–6 (910×970; imagem 910×643). */
export const CASE_CARD = {
  width: 910,
  height: 970,
  imageH: 643,
  colGap: 40,
  rowGap: 79,
  sideInset: 30,
} as const;

/** Grid na página — escala ~90% do Figma + margens laterais (FRAME 1440px). */
export const CASES_GRID_LAYOUT = {
  imageMaxHeightPx: 380,
  colGapPx: 36,
  rowGapPx: 56,
  typeScale: 0.88,
} as const;
