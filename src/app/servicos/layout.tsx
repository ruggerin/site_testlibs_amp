import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Serviços",
  description: "Tudo conectado. Do jeito que deve ser — tecnologia, conteúdo, performance e branding integrados.",
  path: "/servicos",
});

export default function ServicosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
