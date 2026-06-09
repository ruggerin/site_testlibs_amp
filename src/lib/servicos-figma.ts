/** Artboard /serviços — Figma Desktop 2:893. */
export const SVC_ARTBOARD = 1920;

/** Converte px do Figma em unidade fluida (base 1920px). */
export function svw(px: number, maxPx?: number): string {
  const fluid = `calc(${px} / ${SVC_ARTBOARD} * 100vw)`;
  return maxPx != null ? `min(${maxPx}px, ${fluid})` : fluid;
}

export function pct(value: number, parent: number): string {
  return `${(value / parent) * 100}%`;
}
