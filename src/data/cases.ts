export type CaseStudy = {
  slug: string;
  client: string;
  campaign: string;
  excerpt: string;
  image: string;
  /** Hero + galeria padrão quando `gallery` não definido. */
  narrative: string;
  objective: string;
  challenge: string;
  result: string;
  /** Ex.: "2026" — exibido como "ano — 2026" no hero. */
  year?: string;
  /** Até 3 imagens: [esq, dir, full-width]. */
  gallery?: string[];
};

/**
 * Cases fora do site — remover slug daqui para republicar.
 * esplanada · lacqua-residencial · amp-ai
 */
export const ARCHIVED_CASE_SLUGS = [
  "esplanada",
  "lacqua-residencial",
  "amp-ai",
] as const;

export function isCaseArchived(slug: string): boolean {
  return (ARCHIVED_CASE_SLUGS as readonly string[]).includes(slug);
}

/** Cases visíveis no grid e nas rotas públicas. */
export function getPublishedCases(): CaseStudy[] {
  return CASES.filter((c) => !isCaseArchived(c.slug));
}

/** Conteúdo — public/assets/secao_cases.txt */
export const CASES: CaseStudy[] = [
  {
    slug: "amazongas",
    client: "amazongás",
    campaign: "Comprou, Ganhou!",
    image:
      "/assets/projetos/amazongas/KV%20-%20Comprou%2C%20Ganhou%20AmazonG%C3%A1s%20-%20Foto%20da%20Modelo%20-%20Definido.png",
    gallery: [
      "/assets/projetos/amazongas/Mockup%20Outdoor%20-%20AmazonG%C3%A1s.png",
      "/assets/projetos/amazongas/Mockup%20Frontlight%20-%20Compra%20Premiada%20AmazonG%C3%A1s.jpg",
      "/assets/projetos/amazongas/KV%20-%20Comprou%2C%20Ganhou%20AmazonG%C3%A1s%20-%20Foto%20da%20Modelo%20-%20Definido.png",
    ],
    excerpt:
      "Promoção multiplataforma em quatro estados que transformou o consumo em jornada de colecionador — com brindes esgotados em tempo recorde.",
    narrative:
      "Nesta promoção, criamos um movimento de desejo em quatro estados (AM, RO, RR e AC). Por meio de uma estratégia multiplataforma, aumentamos as vendas através da promoção de itens colecionáveis. O resultado foi um engajamento tão agressivo que os brindes, planejados para durar meses, evaporaram em tempo recorde.",
    objective:
      "Alavancar as vendas dos revendedores e transformar o consumo comum em uma jornada de colecionador.",
    challenge:
      "Orquestrar uma comunicação integrada em quatro estados simultaneamente, garantindo presença massiva nos principais veículos regionais.",
    result:
      "Brindes esgotados de forma meteórica e campanha encerrada antes do previsto por puro sucesso de demanda.",
  },
  {
    slug: "ramsons",
    client: "ramsons",
    campaign: "Black Friday Ramsons",
    image: "/assets/projetos/ramsons/Black%20Friday%20Ramsons.webp",
    gallery: [
      "/assets/projetos/ramsons/Backbus.jpeg",
      "/assets/projetos/ramsons/Painel%20de%20LED.jpeg",
      "/assets/projetos/ramsons/Black%20Friday%20Ramsons.webp",
    ],
    excerpt:
      "Design arrojado e operação baseada em dados para dominar o share de atenção e ser escolhida no momento da decisão.",
    narrative:
      "Para a Ramsons, fugimos do óbvio com um design arrojado e uma operação baseada em dados. Integramos criatividade e performance para garantir que a marca não fosse apenas vista, mas escolhida no momento da decisão.",
    objective:
      "Superar os recordes de faturamento do ano anterior e dominar o share de atenção durante a temporada de descontos.",
    challenge:
      "Cortar o ruído da concorrência por meio de uma abordagem que unisse análise de dados e presença digital implacável.",
    result:
      "Visibilidade histórica e metas de vendas batidas com uma estratégia de performance integrada.",
  },
  {
    slug: "supermercados-coema",
    client: "supermercados coema",
    campaign: "Inauguração — Unidade Campos Sales",
    image:
      "/assets/projetos/coema/KV%20-%20Inaugura%C3%A7%C3%A3o%20Supermercados%20COEMA%20Campos%20Salles.png",
    excerpt:
      "Narrativa de expectativa que transformou a abertura das portas em evento comunitário e marcou o bairro com um novo supermercado de referência.",
    narrative:
      "Levar o padrão de uma marca como o Coema para onde ele ainda não estava presente: esse foi o norte da inauguração da nova unidade do Coema. Criamos uma narrativa de expectativa que transformou a abertura das portas em um evento comunitário. Com um KV de impacto e cores superlativas, deixamos claro que o bairro do Campos Sales tinha acabado de ganhar um novo marco.",
    objective:
      "Posicionar a nova unidade como o supermercado de referência na região e garantir um fluxo massivo de clientes na abertura.",
    challenge:
      "Criar uma comunicação que gerasse curiosidade e desejo em um público carente de operações de alto nível.",
    result:
      "Inauguração lotada, engajamento total dos moradores e uma operação que nasceu abraçada pela comunidade.",
  },
  {
    slug: "skarloff",
    client: "skarloff",
    campaign: "Lançamentos de novos sabores",
    image: "/assets/projetos/skarloff/KV%20Skarloff%20Novos%20Sabores.png",
    gallery: [
      "/assets/projetos/skarloff/Mockup%201-01.png",
      "/assets/projetos/skarloff/Mockup%201-02.png",
      "/assets/projetos/skarloff/Skarloff-01.png",
    ],
    excerpt:
      "Ativações no PDV e comunicação de curiosidade que levaram Frutas Amarelas e Pink Lemonade a um movimento de experimentação no Norte.",
    narrative:
      "Fazer novos sabores nascerem grandes em um mercado consolidado exige experiência. Para a Skarloff, integramos ativações intensas, experiências imersivas no PDV e uma comunicação focada em despertar curiosidade, transformando o lançamento de Frutas Amarelas e Pink Lemonade em um movimento de experimentação impossível de ignorar no Norte.",
    objective:
      "Introduzir os novos sabores no mercado nortista com autoridade e escala.",
    challenge:
      "Romper a barreira de fidelidade de marcas já estabelecidas e gerar experimentação imediata.",
    result:
      "Giro de estoque acelerado e consolidação da presença da marca em toda a região.",
  },
  /* arquivado — ver ARCHIVED_CASE_SLUGS */
  {
    slug: "esplanada",
    client: "esplanada",
    campaign: "Reposicionamento e volta ao mercado",
    image: "/assets/ambiente/05.jpeg",
    excerpt:
      "Jingle memorável e reposicionamento emocional que transformaram a inauguração em evento histórico de retorno da marca.",
    narrative:
      "Como reconquistar um espaço que o tempo esfriou? Conexão emocional! Trouxemos a Esplanada de volta ao radar do consumidor criando um jingle memorável e um reposicionamento focado em gerar buzz imediato, transformando a inauguração em um evento histórico que marcou a volta da marca ao dia a dia do público.",
    objective:
      "Reposicionar a marca e transformar sua volta em um grande acontecimento de mercado.",
    challenge:
      "Reconectar a marca com um público que já não a tinha mais na rotina de consumo.",
    result:
      "Lojas completamente lotadas na inauguração e um fluxo intenso de clientes no retorno ao mercado.",
  },
  /* arquivado — ver ARCHIVED_CASE_SLUGS */
  {
    slug: "lacqua-residencial",
    client: "lacqua residencial",
    campaign: "Comercialização pós-Ponte Rio Negro",
    image: "/assets/ambiente/07.jpeg",
    excerpt:
      "Narrativa de valorização e qualidade de vida que transformou uma área em expansão em oportunidade urgente de investimento.",
    narrative:
      "No mercado imobiliário, quem compra lotes, está comprando sonhos. Para o Lacqua, transformamos uma área de expansão após a ponte Rio Negro em uma oportunidade urgente, construindo uma narrativa forte de valorização e qualidade de vida aliada a uma estratégia comercial agressiva e focada em conversão.",
    objective:
      "Acelerar a comercialização de lotes em uma nova área de expansão.",
    challenge:
      "Transformar uma localização ainda em desenvolvimento em uma oportunidade clara de investimento.",
    result:
      "100 lotes vendidos em apenas 2 meses — um case direto, objetivo e altamente lucrativo.",
  },
  {
    slug: "mobili-store",
    client: "mobili store",
    campaign: "Black Friday — Roraima",
    image: "/assets/projetos/mobili/KV%20BLACK%20MOBILI.png",
    excerpt:
      "Ofertas selecionadas, urgência e mídia forte para criar a maior Black Friday do estado e um novo padrão de campanha.",
    narrative:
      "No Estado de Roraima, o padrão da Black Friday subiu. Com a Mobili Store, mostramos que para vencer o período mais saturado do varejo é preciso agressividade, por isso desenvolvemos uma campanha com ofertas escolhidas a dedo, gatilhos de urgência e uma forte presença de mídia que dominou o share de atenção e parou o estado.",
    objective:
      "Criar a maior Black Friday do Estado de Roraima e transformar interesse em faturamento de verdade.",
    challenge:
      "Se destacar e dominar as vendas em meio a um dos períodos mais competitivos do ano.",
    result:
      "Loja tomada por clientes, alto volume de vendas e um novo padrão de campanha para a região.",
  },
  /* arquivado — ver ARCHIVED_CASE_SLUGS */
  {
    slug: "amp-ai",
    client: "agência amp",
    campaign: "AMP AI — criatividade generativa",
    image: "/assets/ambiente/09.jpg",
    excerpt:
      "IA generativa em cada etapa do processo criativo para narrativas hiper-personalizadas e produções de nível cinematográfico em tempo recorde.",
    narrative:
      "Onde a tecnologia encontra a imaginação, a AMP entrega o futuro. Nestas campanhas, integramos inteligência artificial generativa em cada etapa do processo criativo, desde o roteiro até a composição visual e sonora dos vídeos. Ao unir o olhar humano à velocidade e às possibilidades infinitas da IA, criamos narrativas hiper-personalizadas e produções de altíssimo nível que seriam impossíveis de realizar em tempo recorde pelos métodos tradicionais.",
    objective:
      "Romper os limites da produção convencional e entregar campanhas de impacto visual cinematográfico com agilidade extrema.",
    challenge:
      'Dominar ferramentas de IA de ponta para criar conteúdos que não pareçam "artificiais", e sim como uma extensão poderosa da visão da marca.',
    result:
      "Redução drástica no tempo de produção e um engajamento histórico devido ao ineditismo visual das campanhas geradas.",
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}

/** Case publicado — retorna `undefined` se arquivado. */
export function getPublishedCaseBySlug(slug: string): CaseStudy | undefined {
  const item = getCaseBySlug(slug);
  return item && !isCaseArchived(slug) ? item : undefined;
}

export function getRelatedCases(slug: string, limit = 3): CaseStudy[] {
  return getPublishedCases()
    .filter((c) => c.slug !== slug)
    .slice(0, limit);
}
