import type { Metadata } from "next";
import { Inter, Darker_Grotesque } from "next/font/google";
import AppShell from "@/components/AppShell";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const darkerGrotesque = Darker_Grotesque({
  variable: "--font-darker-grotesque",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AMP — Agência",
  description: "Ser 360 não é oferecer tudo. É fazer tudo funcionar junto.",
  icons: {
    icon: [{ url: "/amp_favicon.svg", type: "image/svg+xml" }],
    shortcut: "/amp_favicon.svg",
    apple: "/amp_favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${darkerGrotesque.variable} h-full antialiased`}
    >
      <head>
        {/* Start fetching heavy videos before JS hydrates */}
        <link rel="preload" as="video" href="/assets/COMPILADO-WEBM0001-1210.webm" />
        <link rel="preload" as="video" href="/assets/VIDEO_COMPILADO_2.mp4" />
      </head>
      <body className="min-h-full bg-[#181818] text-white overflow-x-hidden">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
