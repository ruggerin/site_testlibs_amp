/** Artboard principal do protótipo AMP (Desktop). */
export const FIGMA_W = 1920;
export const FIGMA_H = 1080;

/**
 * Converte px do Figma em clamp fluido — mesmo raciocínio de quem-somos
 * (ex.: fontSize: "clamp(36px, min(10vw, 14svh), 130px)").
 */
export function figmaClamp(
  px: number,
  opts?: { min?: number; max?: number; vw?: number }
): string {
  const vw = opts?.vw ?? (px / FIGMA_W) * 100;
  const min = opts?.min ?? px * 0.38;
  const max = opts?.max ?? px;
  return `clamp(${Math.round(min)}px, ${vw.toFixed(2)}vw, ${Math.round(max)}px)`;
}

/** Altura fluida a partir de um frame alto (ex.: página cultura 6444px). */
export function figmaHeightClamp(px: number, artboardH: number): string {
  const svh = (px / artboardH) * 100;
  return `clamp(${Math.round(px * 0.35)}px, ${svh.toFixed(2)}svh, ${Math.round(px)}px)`;
}

/** Proporção largura/alura do Figma → aspect-ratio CSS. */
export function figmaAspect(w: number, h: number): string {
  return `${w} / ${h}`;
}
