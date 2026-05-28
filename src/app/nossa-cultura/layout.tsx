import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nossa Cultura",
  description:
    "Visão holística é método. Marketing integrado não acontece por acaso — conheça o processo da AMP.",
  path: "/nossa-cultura",
});

export default function NossaCulturaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
