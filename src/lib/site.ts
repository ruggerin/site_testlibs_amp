/** Largura máxima de conteúdo alinhada ao protótipo Figma (1920px artboard, ~1440 conteúdo). */
export const FRAME = "max-w-[1440px] mx-auto w-full";

/** Sec1 /nossa-cultura — Figma 2:1155 (grupo 1888×862). */
export const CULTURA_SEC1 = {
  textMaxPx: 780,
  photoW: 1052,
  photoH: 862,
  /** Sobrepõe o hero (px no Figma). */
  overlapTopPx: 45,
} as const;

/** Padding lateral editorial (md) — espelha `md:px-16` do FRAME. */
export const FRAME_PAD_X = "px-5 sm:px-8 md:px-16";

/** Rodapé interno — Figma node 1:138 (1920×144, conteúdo a x:24). */
export const FOOTER_INNER = "relative mx-auto w-full max-w-[1920px]";
/** 24px em 1920 → 1.25vw */
export const FOOTER_PAD_X = "px-[clamp(20px,1.25vw,24px)]";

/** /premios — Figma Group 33 @ x:76 no artboard 1920 (conteúdo edge-to-edge com respiro). */
export const PREMIOS_PAD_X = "clamp(24px, 3.96vw, 76px)";

/** Fundo da seção de borda a borda (quebra limite do container pai). */
export const FULL_BLEED =
  "relative left-1/2 w-[100vw] max-w-[100vw] -translate-x-1/2";

export const SITE = {
  phone: "+55 92 99234-5678",
  phoneHref: "tel:+5592992345678",
  /** Landing de captura — CTAs “quero ser o campeão” e banners de ação. */
  captureUrl: "https://materiais.agenciaamp.tech/captura-resultados-reais-amp",
} as const;
