export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "1",
    question: "A AMP trabalha com empresas de que dimensão?",
    answer:
      "Focamos o nosso trabalho em empresas que já têm uma operação validada e procuram escala. Seja um negócio local que queira dominar a região ou uma marca nacional, a nossa estrutura está desenhada para quem tem ambição de crescimento.",
  },
  {
    id: "2",
    question: "Em quanto tempo começarei a ver resultados?",
    answer:
      "O marketing de performance é método. Enquanto as campanhas de tráfego pago podem gerar leads nos primeiros dias, a estratégia completa de posicionamento e ROI sólido consolida-se geralmente entre os primeiros 60 e 90 dias de parceria.",
  },
  {
    id: "3",
    question: "A agência trata de toda a integração entre o Online e o Offline?",
    answer:
      "Sim. Esse é o nosso grande diferencial. Não entregamos apenas posts. Criamos ecossistemas onde o seu evento físico (Live Marketing) comunica com os seus anúncios digitais, garantindo que a jornada do cliente seja contínua e lucrativa.",
  },
  {
    id: "4",
    question: "Qual o custo do investimento para trabalhar com a AMP?",
    answer:
      "Não trabalhamos com pacotes prontos. O investimento é calculado com base em seus objetivos de faturamento e no desafio do seu setor. O primeiro passo é o diagnóstico gratuito para avaliarmos se estamos alinhados.",
  },
];
