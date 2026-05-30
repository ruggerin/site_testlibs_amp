import teamData from "../../public/assets/team/team.json";

/** Videos to kick off (fire-and-forget — not tracked in progress) */
export const PRELOAD_VIDEOS = [
  "/assets/COMPILADO-WEBM0001-1210.webm",
  "/assets/VIDEO_COMPILADO_2.mp4",
];

/** Static images used across all pages */
const STATIC_IMAGES = [
  "/assets/wppr_orange_1.jpg",
  "/assets/ambiente/01.jpeg",
  "/assets/ambiente/02.jpeg",
  "/assets/ambiente/03.jpeg",
  "/assets/ambiente/04.jpeg",
  "/assets/ambiente/05.jpeg",
  "/assets/ambiente/06.jpeg",
  "/assets/ambiente/07.jpeg",
  "/assets/ambiente/08.jpeg",
  "/assets/ambiente/09.jpg",
  "/assets/ambiente/10.jpg",
  "/assets/nossa_cultura/DSC04583.TOPO%20PAGINA.jpeg",
  "/assets/nossa_cultura/DSC04470.jpg.jpeg",
  "/assets/nossa_cultura/icones/item_1.png",
  "/assets/nossa_cultura/icones/item_2.png",
  "/assets/nossa_cultura/icones/item_3.png",
  "/assets/nossa_cultura/icones/item_4.png",
  "/assets/quem_somos/mapa_norte1.svg",
  "/assets/servicos/PERFOMANCE.png",
  "/assets/servicos/SOCIAL%20E%20CONTE%C3%9ADO.png",
];

/**
 * Returns the URL to fetch so the browser caches the image correctly.
 * SVGs are served as-is; raster images go through Next.js image optimizer.
 */
function resolveUrl(src: string, w = 1080, q = 75): string {
  if (src.endsWith(".svg")) return src;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=${q}`;
}

/** All image URLs to preload (next/image-compatible where applicable) */
export function getAllPreloadUrls(): string[] {
  const teamPhotos = (teamData.team as { fotos: string[] }[]).flatMap(
    (m) => m.fotos
  );
  return [...STATIC_IMAGES, ...teamPhotos].map((src) => resolveUrl(src));
}
