import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Além de entregar resultados, compartilhamos o pensamento por trás deles — insights sobre marketing 360, dados e branding.",
  path: "/blog",
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
