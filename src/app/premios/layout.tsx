import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Prêmios",
  description:
    "Prêmios são a consequência de estratégias bem executadas e clientes que confiam no nosso trabalho.",
  path: "/premios",
});

export default function PremiosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
