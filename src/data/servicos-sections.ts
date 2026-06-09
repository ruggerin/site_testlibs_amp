/**
 * Seções de /servicos — medidas do Figma Desktop 2:893.
 * brand 2:962, perform 2:943, tecno(web) 2:902, conteúdo 2:925.
 */

export type TitleTag = {
  text: string;
  left?: string;
  right?: string;
  top: string;
  width: string;
  align: "left" | "right";
};

export type TitleLayout = {
  /** Grupo `titulo` — x/y em px no frame 1920. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Sobreposição no hero (450 − y), em px. */
  heroOverlap: number;
  variant: "stacked" | "conteudo";
  line1: string;
  line2: string;
  /** % do box titulo (0–1). */
  line1Pos: { left: string; top: string };
  ampPos: { left: string; top: string };
  line2Pos: { left: string; top: string };
  tagLeft?: TitleTag;
  tagRight?: TitleTag;
};

export type ServiceSectionData = {
  id: string;
  hero?: {
    src?: string;
    objectPosition?: string;
    /** Branding: imagem deslocada para cima no Figma. */
    offsetY?: number;
    /** Sem imagem — apenas área 1360×450 (ex.: Conteúdo no Figma). */
    placeholder?: boolean;
  };
  title: TitleLayout;
  description: string;
  icon: string;
  /** Card Group 30 — altura em px (Figma). */
  cardH: number;
  /** `cases` — 3 colunas 392 + 391 + 392 @ y:872. */
  cases: {
    h: number;
    cols: Array<{ src?: string; color?: string }>;
  };
  /** Espaço antes da seção (px) — gap entre blocos no Figma. */
  gapBefore?: number;
};

const ICON = {
  branding: "/servicos/icons/design-grafico 1.png",
  performance: "/servicos/icons/trafego-da-web 1.png",
  tecnologia: "/servicos/icons/codificacao-da-web 1.png",
  conteudo: "/servicos/PrimeirasImagens/SOCIAL_E_CONTEUDO.png",
} as const;

export const SERVICOS_SECTIONS: ServiceSectionData[] = [
  {
    id: "branding",
    hero: {
      src: "/servicos_old/branding.png",
      objectPosition: "58% 32%",
      offsetY: -155,
    },
    title: {
      x: 206,
      y: 375,
      w: 1621,
      h: 467,
      heroOverlap: 75,
      variant: "stacked",
      line1: "Branding",
      line2: "Design",
      line1Pos: { left: "0%", top: "1.3%" },
      ampPos: { left: "29.7%", top: "29.8%" },
      line2Pos: { left: "43.5%", top: "36.2%" },
      tagLeft: {
        text: "Marca não nasce no logo",
        left: "9.2%",
        top: "54.6%",
        width: "288px",
        align: "right",
      },
      tagRight: {
        text: "nasce na forma como a empresa se posiciona",
        right: "0",
        top: "0",
        width: "min(344px, 21.2%)",
        align: "left",
      },
    },
    description:
      "Traduzimos estratégia em identidade e levamos isso até a experiência, com UI/UX Design entrando para organizar, simplificar e dar sentido ao que o usuário vê e faz.\n\nDesign, aqui, não entra no final. Ele já nasce com função. E essa função é clara: sustentar conteúdo, orientar navegação e preparar o terreno para conversão.",
    icon: ICON.branding,
    cardH: 643,
    cases: {
      h: 643,
      cols: [
        { src: "/servicos/BRANDING_E_DESIGN.jpg" },
        { color: "#BCBCBC" },
        { color: "#D9D9D9" },
      ],
    },
  },
  {
    id: "performance",
    gapBefore: 150,
    hero: {
      src: "/servicos/PrimeirasImagens/PERFORMANCE.png",
      objectPosition: "55% 34%",
    },
    title: {
      x: 20,
      y: 381,
      w: 1881,
      h: 461,
      heroOverlap: 69,
      variant: "stacked",
      line1: "Performance",
      line2: "Tráfego",
      line1Pos: { left: "11.11%", top: "0%" },
      ampPos: { left: "19.35%", top: "30.15%" },
      line2Pos: { left: "29.13%", top: "36.66%" },
      tagLeft: {
        text: "Não existe performance sem leitura.",
        left: "0%",
        top: "59.44%",
        width: "330px",
        align: "right",
      },
      tagRight: {
        text: "E não existe leitura sem contexto.",
        right: "0",
        top: "45.12%",
        width: "370px",
        align: "left",
      },
    },
    description:
      "Estruturamos campanhas com base em dados, mas sem perder de vista o que está por trás deles: comportamento e intenção. O ajuste é constante, porque o mercado muda — e rápido.\n\nClique por clique não sustenta crescimento.\n\nPor isso, a performance aqui não roda sozinha. Ela depende e se beneficia de um branding bem definido, de um conteúdo que prepara e de uma estrutura que converte.",
    icon: ICON.performance,
    cardH: 853,
    cases: {
      h: 643,
      cols: [{ src: "/servicos/PERFORMANCE_E_TRAFEGO.jpg" }],
    },
  },
  {
    id: "tecnologia",
    gapBefore: 150,
    hero: {
      src: "/servicos_old/tecnologia-web.png",
      objectPosition: "52% 38%",
    },
    title: {
      x: 208,
      y: 381,
      w: 1504,
      h: 461,
      heroOverlap: 69,
      variant: "stacked",
      line1: "Tecnologia",
      line2: "web",
      line1Pos: { left: "4.19%", top: "0%" },
      ampPos: { left: "22.21%", top: "30.15%" },
      line2Pos: { left: "36.37%", top: "36.66%" },
      tagLeft: {
        text: "Um site pode até ser bonito",
        left: "0%",
        top: "64.21%",
        width: "307px",
        align: "right",
      },
      tagRight: {
        text: "mas se não funciona, ele trava tudo ao redor.",
        left: "69.48%",
        top: "46.2%",
        width: "min(459px, 30.5%)",
        align: "left",
      },
    },
    description:
      "Desenvolvemos páginas com lógica e clareza. O design de UI/UX atua como base para garantir que a navegação flua, que a informação apareça no tempo certo e que o usuário tenha uma experiência intuitiva.\n\nA tecnologia, para nós, está além do suporte. Ela compõe a estrutura que sustenta o tráfego, viabiliza a coleta de dados e dá continuidade à estratégia.",
    icon: ICON.tecnologia,
    cardH: 695,
    cases: {
      h: 643,
      cols: [
        { src: "/servicos/TECNOLOGIA_E_WEB.jpg" },
        { color: "#BCBCBC" },
        { color: "#D9D9D9" },
      ],
    },
  },
  {
    id: "conteudo",
    gapBefore: 150,
    hero: {
      src: "/servicos_old/performance-trafego.png",
      objectPosition: "55% center",
    },
    title: {
      x: 268,
      y: 360,
      w: 1466,
      h: 413,
      heroOverlap: 90,
      variant: "conteudo",
      line1: "conteúdo",
      line2: "Social",
      line1Pos: { left: "20.33%", top: "46%" },
      ampPos: { left: "50.34%", top: "0%" },
      line2Pos: { left: "3%", top: "5.08%" },
      tagLeft: {
        text: "Conteúdo sem direção",
        left: "0%",
        top: "79.9%",
        width: "270px",
        align: "right",
      },
      tagRight: {
        text: "não tem utilidade.",
        right: "0",
        top: "14.28%",
        width: "250px",
        align: "left",
      },
    },
    description:
      "Ao trabalhar com a lógica de Inbound Marketing — isto é, entendendo o que dizer, quando dizer e o porquê — não existe a produção por obrigação nem o calendário vazio de intenção.\n\nA presença, sozinha, não equivale a posicionamento.\n\nO nosso conteúdo constrói percepção, abre caminho para mídia e mantém o ecossistema inteiro ativo.",
    icon: ICON.conteudo,
    cardH: 745,
    cases: {
      h: 643,
      cols: [
        { src: "/servicos/SOCIAL_E_CONTEUDO-2.jpg" },
        { color: "#BCBCBC" },
        { color: "#D9D9D9" },
      ],
    },
  },
];
