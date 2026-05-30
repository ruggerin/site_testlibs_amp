import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/data/cases";
import { CASES_GRID_LAYOUT } from "@/data/cases-layout";

type CaseCardTypography = {
  client: string;
  campaign: string;
  excerpt: string;
};

type CaseCardProps = {
  item: CaseStudy;
  variant?: "listing" | "compact";
  typography?: CaseCardTypography;
};

export default function CaseCard({
  item,
  variant = "compact",
  typography,
}: CaseCardProps) {
  if (variant === "listing") {
    const clientSize = typography?.client ?? "clamp(14px, 1.67vw, 32px)";
    const campaignSize = typography?.campaign ?? "clamp(22px, 2.71vw, 52px)";
    const excerptSize = typography?.excerpt ?? "clamp(14px, 1.67vw, 32px)";

    const imageMaxH = CASES_GRID_LAYOUT.imageMaxHeightPx;

    return (
      <Link
        href={`/cases/${item.slug}`}
        className="group block w-full min-w-0 transition-opacity hover:opacity-95"
      >
        <article className="flex flex-col">
          <div
            className="relative w-full overflow-hidden bg-[#D9D9D9]"
            style={{
              height: `clamp(180px, min(28vw, 32svh), ${imageMaxH}px)`,
            }}
          >
            {item.image ? (
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 47vw"
              />
            ) : null}
          </div>

          <div className="flex flex-col pt-[clamp(20px,2vw,36px)]">
            <p
              className="font-black uppercase leading-none text-[var(--orange)]"
              style={{
                fontFamily: "var(--font-darker-grotesque)",
                fontSize: clientSize,
              }}
            >
              {item.client}
            </p>

            <h3
              className="mt-[clamp(12px,1.1vw,21px)] font-black uppercase leading-[0.9] text-black"
              style={{
                fontFamily: "var(--font-darker-grotesque)",
                fontSize: campaignSize,
              }}
            >
              {item.campaign}
            </h3>

            <p
              className="mt-[clamp(12px,1.2vw,22px)] line-clamp-4 font-semibold uppercase leading-[1.31] text-[#232323]"
              style={{ fontFamily: "var(--font-inter)", fontSize: excerptSize }}
            >
              {item.excerpt}
            </p>
          </div>
        </article>
      </Link>
    );
  }

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
