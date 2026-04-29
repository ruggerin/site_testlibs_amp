"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Expõe a instância para que páginas com snap possam chamar lenis.scrollTo()
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    // Sincroniza Lenis com o RAF do GSAP — scroll e animações no mesmo frame
    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      delete (window as unknown as Record<string, unknown>).__lenis;
      lenis.destroy();
      gsap.ticker.remove(ticker);
    };
  }, []);

  return <>{children}</>;
}
