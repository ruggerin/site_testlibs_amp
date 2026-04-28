import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",      // gera pasta out/ com HTML/CSS/JS estático
  trailingSlash: true,   // /quem-somos → /quem-somos/index.html (obrigatório no Pages)
  images: {
    unoptimized: true,   // GitHub Pages não tem servidor de imagens
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

export default nextConfig;
