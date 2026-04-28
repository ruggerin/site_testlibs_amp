import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // basePath necessário quando o repo NÃO é username.github.io
  basePath: isProd ? "/site_testlibs_amp" : "",
  assetPrefix: isProd ? "/site_testlibs_amp/" : "",
  images: {
    unoptimized: true,   // GitHub Pages não tem servidor de imagens
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

export default nextConfig;
