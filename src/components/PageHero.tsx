import type { ReactNode } from "react";
import { FRAME } from "@/lib/site";

export type HeroTagline = {
  text: string;
  align?: "left" | "right";
};

type PageHeroProps = {
  children: ReactNode;
  taglines?: HeroTagline[];
  className?: string;
};

/** Blocos de subtítulo com retângulo laranja — padrão Figma (Inter 600, uppercase). */
export function HeroTaglines({ lines }: { lines: HeroTagline[] }) {
  return (
    <div className="mt-8 flex flex-col gap-4 md:mt-12">
      {lines.map((line) => (
        <div
          key={line.text}
          className={`flex items-stretch gap-0 ${line.align === "right" ? "flex-row-reverse" : ""}`}
        >
          <span className="w-1 shrink-0 bg-[var(--orange)] md:w-1.5" aria-hidden />
          <p
            className={`max-w-[min(100%,28rem)] px-4 py-2 text-[clamp(1.125rem,2.5vw,3.25rem)] font-semibold uppercase leading-tight marker-quote-bg md:px-5 ${
              line.align === "right" ? "ml-auto text-right" : ""
            }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {line.text}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function PageHero({ children, taglines, className = "" }: PageHeroProps) {
  return (
    <section className={`relative overflow-hidden bg-[var(--cream)] ${className}`}>
      <div className={`${FRAME} px-5 pb-16 pt-6 sm:px-8 md:px-16 md:pb-24 md:pt-10`}>
        {children}
        {taglines?.length ? <HeroTaglines lines={taglines} /> : null}
      </div>
    </section>
  );
}
