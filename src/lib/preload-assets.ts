import { AWARDS } from "@/data/awards";
import { CASES } from "@/data/cases";
import { POSTS } from "@/data/posts";
import { SERVICES } from "@/data/services";
import { PARTNER_LOGO_SRCS } from "@/data/partners";
import teamData from "../../public/assets/team/team.json";

/** Vídeos pesados — download antecipado (não entram na barra de %). */
export const PRELOAD_VIDEOS = [
  "/assets/COMPILADO-WEBM0001-1210.webm",
  "/assets/VIDEO_COMPILADO_2.mp4",
] as const;

/** Imagens estáticas fora de `src/data/*`. */
const STATIC_IMAGES = [
  "/assets/wppr_orange_1.jpg",
  "/assets/logo_amp_blackfont.svg",
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
  "/servicos/branding.png",
  "/servicos/performance-trafego.png",
  "/servicos/tecnologia-web.png",
  "/servicos/conteudo-social.png",
] as const;

function unique(paths: Iterable<string>): string[] {
  return [...new Set([...paths].filter(Boolean))];
}

function collectCaseImages(): string[] {
  return CASES.flatMap((c) => [c.image, ...(c.gallery ?? [])]);
}

function collectPostImages(): string[] {
  return POSTS.map((p) => p.image);
}

function collectAwardImages(): string[] {
  return AWARDS.map((a) => a.image).filter((src): src is string => Boolean(src));
}

function collectServiceImages(): string[] {
  return SERVICES.map((s) => s.image);
}

function collectTeamPhotos(): string[] {
  return (teamData.team as { fotos: string[] }[]).flatMap((m) => m.fotos);
}

/**
 * URLs exatas servidas em `public/` (Next `images.unoptimized` — sem `/_next/image`).
 * O loader usa `new Image().src` para popular o cache HTTP do navegador.
 */
export function getAllPreloadImageUrls(): string[] {
  return unique([
    ...STATIC_IMAGES,
    ...collectCaseImages(),
    ...collectPostImages(),
    ...collectAwardImages(),
    ...collectServiceImages(),
    ...collectTeamPhotos(),
    ...PARTNER_LOGO_SRCS,
  ]);
}

/** @deprecated use getAllPreloadImageUrls */
export function getAllPreloadUrls(): string[] {
  return getAllPreloadImageUrls();
}
