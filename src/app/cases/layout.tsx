import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projetos",
  description: "Quando tudo se conecta, o resultado deixa de ser esforço.",
  path: "/cases",
});

export default function CasesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
