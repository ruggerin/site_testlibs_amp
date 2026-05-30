export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  body: string;
  lead?: string;
  author?: string;
};

export const POSTS: BlogPost[] = [
  {
    slug: "site-amp-10-anos",
    title: "site da amp entra no ar com o pé na porta comemorando seus 10 anos",
    image: "/freepik_aplique-efeitos-fotografi_2853326270%201.png",
    excerpt:
      "Após 10 longos anos de espera, finalmente o novo site da agência mais laranja de Manaux surge em meio a mata com seu novo design, mais moderno, clean e brutal...",
    date: "22 de abril . 2026",
    author: "Por: Aline Cardoso Berdinazzi 🤌🏼",
    lead:
      "Após 10 longos anos de espera, finalmente o novo site da agência mais laranja de Manaux surge em meio a mata com seu novo design, mais moderno, clean e brutal.",
    body: `Ser 360 não é oferecer tudo. É fazer tudo funcionar junto. Ao longo de mais de uma década, a AMP entendeu que resultados consistentes não nascem de esforços isolados. Eles nascem da harmonia entre estratégia, criatividade e análise.

Ser uma agência de marketing 360 vai além de reunir serviços sob o mesmo teto. Trata-se de operar como um verdadeiro hub de marketing, sendo um sistema onde cada frente conversa, se alimenta e evolui em conjunto.

Aqui, o criativo não caminha sem o dado. E os dados não existem sem direção estratégica. Branding influencia performance. Conteúdo impulsiona tráfego. Tecnologia sustenta experiência.

É assim que transformamos ações dispersas em uma operação integrada, capaz de gerar clareza, eficiência e crescimento. No fim, entregamos mais que marketing de ponta a ponta. Entregamos coerência.`,
  },
  {
    slug: "marketing-360-dados-branding",
    title: "marketing 360, dados e branding para entender o mercado",
    image: "/servicos/branding.png",
    excerpt:
      "O mercado não tem tempo para marcas médias. Nós também não. Na AMP, somos obcecados por performance, resultados e em transformar sua marca em uma...",
    date: "18 de maio . 2026",
    body: `Explore nossa curadoria de insights sobre marketing 360, dados e branding para entender como o mercado está evoluindo e como sua marca pode liderar essa mudança.

O mercado não tem tempo para marcas médias. Nós também não. Na AMP, somos obcecados por performance, resultados e em transformar sua marca em uma referência no setor.`,
  },
  {
    slug: "ze-lootinho-ouro-pmkt",
    title: "zé lootinho que chama? mais um prêmio na pmkt e dessa vez é ouro",
    image: "/servicos/conteudo-social.png",
    excerpt:
      "Quando o negócio é fazer o melhor, procuramos sempre entregar projetos diferentes e com personalidade, vai além de só conquistar prêmios...",
    date: "10 de maio . 2026",
    body: `Quando o negócio é fazer o melhor, procuramos sempre entregar projetos diferentes e com personalidade, vai além de só conquistar prêmios.

Este reconhecimento reforça o compromisso da AMP com criatividade estratégica e resultados mensuráveis para nossos clientes.`,
  },
  {
    slug: "site-bonitinho-sobrinho",
    title: "Para fazer site bonitinho, você contrata um sobrinho",
    image: "/servicos/tecnologia-web.png",
    excerpt:
      "Para construir um ecossistema digital que converte curiosos em clientes fiéis, você precisa da nossa estratégia 360.",
    date: "10 de junho . 2026",
    body: `Para fazer site bonitinho, você contrata um sobrinho. Para construir um ecossistema digital que converte curiosos em clientes fiéis, você precisa da nossa estratégia 360.

Sem firula, com inteligência de dados e UI de alto impacto. A tecnologia entra como estrutura — não como enfeite.`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  return POSTS.filter((p) => p.slug !== slug).slice(0, limit);
}
