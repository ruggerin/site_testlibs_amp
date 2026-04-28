import type { Metadata } from "next";
import { Inter, Darker_Grotesque } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const darkerGrotesque = Darker_Grotesque({
  variable: "--font-darker-grotesque",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AMP — Agência",
  description: "Ser 360 não é oferecer tudo. É fazer tudo funcionar junto.",
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
      <body className="min-h-full bg-[#181818] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
