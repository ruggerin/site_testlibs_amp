import Image from "next/image";
import type { ServiceBlock as ServiceBlockData } from "@/data/services";
import { FRAME } from "@/lib/site";

export default function ServiceBlock({ service }: { service: ServiceBlockData }) {
  const image = (
    <div className="relative aspect-[1360/450] w-full overflow-hidden rounded-sm bg-[var(--cream)]">
      <Image
        src={service.image}
        alt=""
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );

  const content = (
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-end gap-x-2 uppercase leading-none">
            <span
              className="font-black text-[var(--orange)]"
              style={{
                fontFamily: "var(--font-darker-grotesque)",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
              }}
            >
              {service.accent}
            </span>
            <span
              className="font-black text-[#232323]"
              style={{
                fontFamily: "var(--font-darker-grotesque)",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
              }}
            >
              {service.line1}
            </span>
            <span
              className="font-black text-[#232323]/50"
              style={{
                fontFamily: "var(--font-darker-grotesque)",
                fontSize: "clamp(2rem, 5vw, 4rem)",
              }}
            >
              {service.line2}
            </span>
          </div>

          <div>
            <p
              className="text-[clamp(1.25rem,2.5vw,2.5rem)] font-bold uppercase leading-tight text-[#232323]"
              style={{ fontFamily: "var(--font-darker-grotesque)" }}
            >
              {service.subtitle}
            </p>
            {service.subtitle2 ? (
              <p
                className="text-[clamp(1rem,2vw,1.75rem)] font-medium uppercase text-[#232323]/70"
                style={{ fontFamily: "var(--font-darker-grotesque)" }}
              >
                {service.subtitle2}
              </p>
            ) : null}
          </div>

          <div className="border-2 border-[#232323] bg-[var(--cream)] p-6 md:p-8">
            {service.description.split("\n\n").map((para) => (
              <p
                key={para.slice(0, 24)}
                className="mb-4 last:mb-0 text-[clamp(14px,1.1vw,18px)] leading-relaxed text-[#232323]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
  );

  return (
    <section className="border-t border-[#232323]/10 py-16 md:py-24">
      <div
        className={`${FRAME} grid gap-10 px-5 sm:px-8 md:grid-cols-2 md:items-center md:gap-16 md:px-16`}
      >
        {service.imageSide === "left" ? (
          <>
            {image}
            {content}
          </>
        ) : (
          <>
            {content}
            {image}
          </>
        )}
      </div>
    </section>
  );
}
