"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type LenisInstance = {
  scroll: number;
  scrollTo: (target: number, opts?: { duration?: number }) => void;
  on: (event: string, fn: () => void) => void;
  off: (event: string, fn: () => void) => void;
};

function getLenis(): LenisInstance | undefined {
  return (window as unknown as { __lenis?: LenisInstance }).__lenis;
}

/** Botão flutuante — todas as páginas exceto home; oculto enquanto o hero está visível. */
export default function ScrollToTopButton() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [visible, setVisible] = useState(false);

  const updateVisibility = useCallback(() => {
    const hero = document.querySelector("[data-page-hero]");

    if (!hero) {
      setVisible(window.scrollY > window.innerHeight * 0.55);
      return;
    }

    const rect = hero.getBoundingClientRect();
    setVisible(rect.bottom < window.innerHeight * 0.12);
  }, []);

  useEffect(() => {
    if (isHome) {
      setVisible(false);
      return;
    }

    updateVisibility();

    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility, { passive: true });

    const lenis = getLenis();
    if (lenis) lenis.on("scroll", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
      if (lenis) lenis.off("scroll", updateVisibility);
    };
  }, [isHome, pathname, updateVisibility]);

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isHome) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      className={`fixed bottom-[clamp(1.1rem,2.8vw,1.75rem)] right-[clamp(1.1rem,2.8vw,1.75rem)] z-40 flex h-10 w-10 items-center justify-center rounded-full border border-[#232323]/15 bg-white/75 text-[#232323] shadow-[0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur-[2px] transition-[opacity,transform,background-color,color,border-color] duration-300 md:h-11 md:w-11 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-[0.38] hover:border-[var(--orange)]/35 hover:bg-white hover:text-[var(--orange)] hover:opacity-90"
          : "pointer-events-none translate-y-1 opacity-0"
      }`}
    >
      <svg
        className="h-4 w-4 md:h-[18px] md:w-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
