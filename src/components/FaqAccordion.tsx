"use client";

import { useState } from "react";
import type { FaqItem } from "@/data/faq";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <article
            key={item.id}
            className="flex min-h-[280px] flex-col rounded-[35px] bg-[var(--cream)] p-8 md:min-h-[320px] md:p-10"
          >
            <button
              type="button"
              onClick={() => setOpenId(open ? null : item.id)}
              className="text-left"
              aria-expanded={open}
            >
              <h3
                className="text-[clamp(1.25rem,2.5vw,3.25rem)] font-black uppercase leading-tight text-[#232323]"
                style={{ fontFamily: "var(--font-darker-grotesque)" }}
              >
                {item.id}. {item.question}
              </h3>
            </button>
            <div
              className={`mt-6 flex-1 overflow-hidden transition-all duration-300 ${
                open ? "opacity-100" : "max-h-0 opacity-0 md:max-h-none md:opacity-100"
              }`}
            >
              <p
                className="text-[clamp(15px,1.2vw,28px)] leading-[1.8] text-[#232323]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {item.answer}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
