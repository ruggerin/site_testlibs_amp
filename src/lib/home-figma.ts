/** Figma Início 2:170 — artboard Desktop 1920×1080. */
export const HOME_ARTBOARD_W = 1920;
export const HOME_ARTBOARD_H = 1080;

/** Converte px do Figma em % do frame (escala proporcional). */
export const homeLeft = (px: number) => `${(px / HOME_ARTBOARD_W) * 100}%`;
export const homeTop = (px: number) => `${(px / HOME_ARTBOARD_H) * 100}%`;
export const homeWidth = (px: number) => `${(px / HOME_ARTBOARD_W) * 100}%`;
export const homeHeight = (px: number) => `${(px / HOME_ARTBOARD_H) * 100}%`;

/** Nós do frame — posição e tamanho exatos do Figma. */
export const HOME_FIGMA = {
  frame: { maxWidth: `${HOME_ARTBOARD_W}px` },
  /** x:24 — mesma coluna esquerda do hero/SVG. */
  logo: { x: 24, y: 29, w: 185, h: 66 },
  /** x/w/h do Figma; top calibrado em −2.5% do frame (≈ y:−27 no artboard 1080). */
  menu: { x: 1843, y: -27, w: 53, h: 46 },
  /** y/h +7px — estica levemente para cima mantendo a base. */
  hero: { x: 24, y: 88, w: 1872, h: 842.31 },
  footer: { x: 24, y: 997, w: 1872, h: 47 },
} as const;

export function homeRect(node: { x: number; y: number; w: number; h: number }) {
  return {
    left: homeLeft(node.x),
    top: homeTop(node.y),
    width: homeWidth(node.w),
    height: homeHeight(node.h),
  };
}
