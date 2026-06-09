import { AWARDS } from "@/data/awards";
import { getPublishedCases } from "@/data/cases";
import { POSTS } from "@/data/posts";
import { SERVICOS_SECTIONS } from "@/data/servicos-sections";
import teamData from "../../public/assets/team/team.json";

/** Vídeos pesados — download antecipado (não entram na barra de %). */
export const PRELOAD_VIDEOS = [
  "/assets/COMPILADO-WEBM0001-1210.webm",
  "/assets/VIDEO_COMPILADO_2.mp4",
] as const;

function unique(paths: Iterable<string | undefined>): string[] {
  return [...new Set([...paths].filter((src): src is string => Boolean(src)))];
}

function firstTeamHeroPhoto(): string | undefined {
  return (teamData.team as { fotos: string[] }[])[0]?.fotos[0];
}

function firstServicosHeroImage(): string | undefined {
  return SERVICOS_SECTIONS.find((s) => s.hero?.src)?.hero?.src;
}

/**
 * Primeira imagem crítica por rota principal — reduz o tempo do loader.
 * Demais mídias carregam sob demanda ao navegar / rolar a página.
 */
export function getPreloadImageUrls(): string[] {
  return unique([
    // Shell (navbar em todas as páginas)
    "/assets/logo_amp_blackfont.svg",

    // Home
    "/assets/wppr_orange_1.jpg",

    // Quem somos — hero do carrossel de equipe
    firstTeamHeroPhoto(),

    // Nossa cultura — hero
    "/assets/nossa_cultura/DSC04583.TOPO%20PAGINA.jpeg",

    // Serviços — primeiro hero de seção (Branding)
    firstServicosHeroImage(),

    // Projetos — primeiro card do grid
    getPublishedCases()[0]?.image,

    // Prêmios — primeiro item do carrossel
    AWARDS.find((a) => a.image)?.image,

    // Blog — primeiro post da listagem
    POSTS[0]?.image,
  ]);
}

/**
 * URLs servidas em `public/` (Next `images.unoptimized` — sem `/_next/image`).
 * O loader usa `new Image().src` para popular o cache HTTP do navegador.
 */
export function getAllPreloadImageUrls(): string[] {
  return getPreloadImageUrls();
}

/** @deprecated use getPreloadImageUrls */
export function getAllPreloadUrls(): string[] {
  return getPreloadImageUrls();
}
