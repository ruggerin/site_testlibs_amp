import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/data/cases";

export default function CaseCard({ item }: { item: CaseStudy }) {
  return (
    <Link
      href={`/cases/${item.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm bg-[var(--cream)] transition-opacity hover:opacity-90"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#232323]/5">
        <Image
          src={item.image}
          alt=""
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <p
          className="text-xs font-bold uppercase tracking-wide text-[var(--orange)] md:text-sm"
          style={{ fontFamily: "var(--font-darker-grotesque)" }}
        >
          {item.client}
        </p>
        <h3
          className="text-lg font-bold uppercase leading-snug text-[#232323]/45 md:text-xl"
          style={{ fontFamily: "var(--font-darker-grotesque)" }}
        >
          {item.campaign}
        </h3>
        <p
          className="line-clamp-3 text-sm leading-relaxed text-[#232323] md:text-base"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {item.excerpt}
        </p>
      </div>
    </Link>
  );
}
