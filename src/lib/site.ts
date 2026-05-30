/** Largura máxima de conteúdo alinhada ao protótipo Figma (1920px artboard, ~1440 conteúdo). */
export const FRAME = "max-w-[1440px] mx-auto w-full";

/** Home — margem lateral = início do bloco 10 anos (Figma x:24–30). */
export const HOME_EDGE_X = "clamp(24px, 1.5625vw, 30px)";
export const HOME_CONTENT_W =
  "min(calc(100% - 2 * clamp(24px, 1.5625vw, 30px)), 1872px)";

/** Escala base do hero SVG + ~10% só na horizontal (esq./dir., pelo centro). */
export const HOME_HERO_SCALE_Y = 0.94;
export const HOME_HERO_STRETCH_X = 1.1;
export const HOME_HERO_SCALE_X = HOME_HERO_SCALE_Y * HOME_HERO_STRETCH_X;
/** Logo/menu/rodapé ficam na coluna — não acompanham o esticamento do SVG. */
export const HOME_NAV_WIDTH = HOME_CONTENT_W;
/** Ajuste fino só da logo na home (0 = coluna alinhada ao início do bloco). */
export const HOME_LOGO_OFFSET = "0";
/** Menu hamburger — recuo da borda direita da coluna. */
export const HOME_MENU_INSET_RIGHT = "1.5%";

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

export const SITE = {
  phone: "+55 92 99234-5678",
  phoneHref: "tel:+5592992345678",
} as const;
