import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description: "Perguntas frequentes sobre como trabalhar com a Agência AMP.",
  path: "/faq",
});

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
