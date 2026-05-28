"use client";

import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";

type PageShellProps = {
  children: ReactNode;
  /** Fundo da página — internas claras usam branco/cream; home/quem-somos não usam este shell. */
  theme?: "light" | "dark";
  className?: string;
};

export default function PageShell({
  children,
  theme = "light",
  className = "",
}: PageShellProps) {
  const bg = theme === "light" ? "bg-white text-[#232323]" : "bg-[#181818] text-white";

  return (
    <div className={`min-h-screen ${bg} ${className}`}>
      <Navbar theme={theme} />
      <div aria-hidden className="h-[72px] shrink-0 md:h-[88px]" />
      {children}
    </div>
  );
}
