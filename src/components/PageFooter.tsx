import SocialIconButtons from "@/components/SocialIconButtons";
import { FOOTER_SOCIAL_LINKS } from "@/lib/social";
import { FRAME, SITE } from "@/lib/site";

const LEGAL_LINKS: { label: string; href: string }[] = [
  { label: "FAQ", href: "/faq" },
  { label: "Termos", href: "#" },
  { label: "Privacidade", href: "#" },
];

export default function PageFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#161616] text-[var(--orange)]">
      <div
        className={`${FRAME} flex flex-col items-start justify-between gap-8 px-5 py-10 sm:px-8 sm:py-12 md:px-16 lg:flex-row lg:items-center`}
      >
        <p
          className="text-[clamp(13px,1.1vw,20px)] font-normal leading-snug"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Agência AMP ® {year}
          <br />
          Todos os direitos reservados.
        </p>

        <div
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <div className="text-[clamp(13px,1.1vw,20px)] font-normal">
            <span className="block">Fale conosco</span>
            <a href={SITE.phoneHref} className="transition-opacity hover:opacity-80">
              {SITE.phone}
            </a>
          </div>

          <SocialIconButtons variant="on-dark" links={FOOTER_SOCIAL_LINKS} />
        </div>

        <div
          className="flex flex-wrap gap-4 text-[10px] uppercase tracking-widest text-[var(--orange)]/70 sm:text-xs"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {LEGAL_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="transition-colors duration-300 hover:text-[var(--cream)]">
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
