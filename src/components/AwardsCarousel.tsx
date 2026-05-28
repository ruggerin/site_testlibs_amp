"use client";

import { useEffect, useState } from "react";
import type { Award } from "@/data/awards";

export default function AwardsCarousel({ awards }: { awards: Award[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % awards.length);
    }, 5000);
    return () => clearInterval(id);
  }, [awards.length]);

  const current = awards[index];

  return (
    <div className="relative">
      <div className="flex items-center justify-center gap-4 md:gap-8">
        <button
          type="button"
          onClick={() => setIndex((i) => (i - 1 + awards.length) % awards.length)}
          className="flex size-12 shrink-0 items-center justify-center border-2 border-[var(--orange)] text-[var(--orange)] transition-colors hover:bg-[var(--orange)] hover:text-white"
          aria-label="Prêmio anterior"
        >
          ←
        </button>

        <article className="min-h-[280px] flex-1 max-w-2xl rounded-full border-4 border-[#232323]/10 bg-[var(--cream)] px-8 py-12 text-center md:min-h-[320px] md:px-16">
          <p
            className="mb-4 text-sm font-bold uppercase tracking-widest text-[var(--orange)]"
            style={{ fontFamily: "var(--font-darker-grotesque)" }}
          >
            {current.title}
          </p>
          <p
            className="text-[clamp(1.5rem,3vw,2.5rem)] font-black uppercase leading-tight text-[#232323]"
            style={{ fontFamily: "var(--font-darker-grotesque)" }}
          >
            {current.description}
          </p>
        </article>

        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % awards.length)}
          className="flex size-12 shrink-0 items-center justify-center border-2 border-[var(--orange)] text-[var(--orange)] transition-colors hover:bg-[var(--orange)] hover:text-white"
          aria-label="Próximo prêmio"
        >
          →
        </button>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {awards.map((a, i) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setIndex(i)}
            className={`size-2 rounded-full transition-colors ${
              i === index ? "bg-[var(--orange)]" : "bg-[#232323]/20"
            }`}
            aria-label={`Ir para prêmio ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
