export type Award = {
  id: string;
  title: string;
  description?: string;
  image?: string;
};

export const AWARDS: Award[] = [
  {
    id: "1",
    title: "PMKT 11ª edição — Ouro",
    image: "/assets/premios/PREMIO-PMKT-2022-OURO.webp",
  },
  {
    id: "2",
    title: "PMKT — Bronze 2022",
    image: "/assets/premios/PREMIO-PMKT-BRONZE-2022.webp",
  },
  {
    id: "3",
    title: "PMKT 2021 - PRATA",
    image: "/assets/premios/PREMIO-PMKT-2021.webp",
  },
  {
    id: "4",
    title: "PMKT 2019 — Prata",
    image: "/assets/premios/PREMIO-PMKT-2019-PRATA.webp",
  },
  {
    id: "5",
    title: "PMKT 2019 — Bronze",
    image: "/assets/premios/PREMIO-PMKT-2019-BRONZE.webp",
  },
];
