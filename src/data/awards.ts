export type Award = {
  id: string;
  title: string;
  description: string;
  image?: string;
};

export const AWARDS: Award[] = [
  {
    id: "1",
    title: "pmkt 11° edição — ouro",
    description: "aqui vai um breve texto falando sobre o projeto",
  },
  {
    id: "2",
    title: "Prêmio Colunistas — prata",
    description: "Campanha integrada 360 com foco em performance e branding.",
  },
  {
    id: "3",
    title: "Effie Awards — shortlist",
    description: "Estratégia unificada com resultados mensuráveis em 90 dias.",
  },
  {
    id: "4",
    title: "ABMN — destaque regional",
    description: "Reconhecimento por inovação em marketing na Amazônia.",
  },
];
