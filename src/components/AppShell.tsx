"use client";

import { useEffect, useState, type ReactNode } from "react";
import Loader from "@/components/Loader";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const STORAGE_KEY = "amp-media-preloaded-v3";

type Phase = "checking" | "loading" | "ready";

type AppShellProps = {
  children: ReactNode;
};

/**
 * Loader na primeira visita da sessão — pré-baixa imagens críticas (1ª por página) e vídeos do hero.
 */
export default function AppShell({ children }: AppShellProps) {
  const [phase, setPhase] = useState<Phase>("checking");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        setPhase("ready");
        return;
      }
    } catch {
      /* sessionStorage indisponível */
    }
    setPhase("loading");
  }, []);

  if (phase === "checking") {
    return <div className="fixed inset-0 z-50 bg-[#181818]" aria-hidden />;
  }

  if (phase === "loading") {
    return (
      <Loader
        onComplete={() => {
          try {
            sessionStorage.setItem(STORAGE_KEY, "1");
          } catch {
            /* ignore */
          }
          setPhase("ready");
        }}
      />
    );
  }

  return (
    <>
      {children}
      <ScrollToTopButton />
    </>
  );
}
