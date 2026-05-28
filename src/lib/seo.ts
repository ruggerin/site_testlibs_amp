import type { Metadata } from "next";

const SITE_NAME = "Agência AMP";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://agenciaamp.com.br";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
};

export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes("AMP") ? title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    alternates: { canonical: url },
  };
}
