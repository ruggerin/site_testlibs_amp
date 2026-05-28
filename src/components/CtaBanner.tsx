import Link from "next/link";
import { FRAME } from "@/lib/site";

type CtaBannerProps = {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function CtaBanner({
  title,
  subtitle,
  ctaLabel = "Quero o padrão AMP",
  ctaHref = "/quem-somos",
}: CtaBannerProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className={`${FRAME} px-5 sm:px-8 md:px-16`}>
        <div className="overflow-hidden rounded-[35px] bg-[var(--cream)] md:grid md:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
            <p
              className="text-[clamp(1.5rem,3.5vw,5.75rem)] font-black uppercase leading-[1.02] tracking-[-0.04em] text-[#232323]"
              style={{ fontFamily: "var(--font-darker-grotesque)" }}
            >
              {title}
            </p>
          </div>
          <div className="flex flex-col justify-center gap-8 bg-[#232323] p-8 md:rounded-r-[35px] md:p-12 lg:p-16">
            {subtitle ? (
              <p
                className="text-[clamp(15px,1.35vw,38px)] font-semibold leading-relaxed text-[var(--cream)]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {subtitle}
              </p>
            ) : null}
            <Link
              href={ctaHref}
              className="inline-flex w-fit items-center justify-center border-2 border-[var(--cream)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[var(--cream)] hover:text-[#232323]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
