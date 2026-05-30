export type ServiceBlock = {
  id: string;
  line1: string;
  line2: string;
  accent: string;
  subtitle: string;
  subtitle2?: string;
  description: string;
  imageSide: "left" | "right";
  image: string;
};

/** Ordem Figma Desktop 2:893 — brand → performance → tecnologia → conteúdo. */
export const SERVICES: ServiceBlock[] = [
  {
    id: "branding",
    line1: "Branding",
    line2: "Design",
    accent: "&",
    subtitle: "Marca não nasce no logo",
    subtitle2: "nasce na forma como a empresa se posiciona",
    description:
      "Traduzimos estratégia em identidade e levamos isso até a experiência, com UI/UX Design entrando para organizar, simplificar e dar sentido ao que o usuário vê e faz.\n\nDesign, aqui, não entra no final. Ele já nasce com função. E essa função é clara: sustentar conteúdo, orientar navegação e preparar o terreno para conversão.",
    imageSide: "left",
    image: "/servicos/branding.png",
  },
  {
    id: "performance",
    line1: "Performance",
    line2: "Tráfego",
    accent: "&",
    subtitle: "Não existe performance sem leitura.",
    subtitle2: "E não existe leitura sem contexto.",
    description:
      "Estruturamos campanhas com base em dados, mas sem perder de vista o que está por trás deles: comportamento e intenção. O ajuste é constante, porque o mercado muda — e rápido.\n\nClique por clique não sustenta crescimento.\n\nPor isso, a performance aqui não roda sozinha. Ela depende e se beneficia de um branding bem definido, de um conteúdo que prepara e de uma estrutura que converte.",
    imageSide: "right",
    image: "/assets/servicos/PERFOMANCE.png",
  },
  {
    id: "tecnologia",
    line1: "Tecnologia",
    line2: "WEB",
    accent: "&",
    subtitle: "Um site pode até ser bonito",
    subtitle2: "mas se não funciona, ele trava tudo ao redor",
    description:
      "Desenvolvemos páginas com lógica e clareza. UI/UX Design entra como base para garantir que a navegação flua, que a informação apareça no tempo certo e que o usuário tenha uma experiência intuitiva.\n\nA tecnologia, pra gente, está além do suporte. Está na estrutura que sustenta o tráfego, viabiliza a coleta de dados e dá continuidade à estratégia.",
    imageSide: "left",
    image: "/servicos/tecnologia-web.png",
  },
  {
    id: "conteudo",
    line1: "CONTEÚDO",
    line2: "SOCIAL",
    accent: "&",
    subtitle: "Conteúdo sem direção",
    subtitle2: "não tem utilidade.",
    description:
      "Ao trabalhar com a lógica de Inbound Marketing, isto é, entendendo o que dizer, quando dizer e por quê, não existe a produção por obrigação e nem o calendário vazio de intenção.\n\nA presença, sozinha, não equivale a posicionamento.\n\nO nosso conteúdo constrói percepção, abre caminho para mídia e mantém o ecossistema inteiro ativo.",
    imageSide: "right",
    image: "/assets/servicos/SOCIAL%20E%20CONTE%C3%9ADO.png",
  },
];
