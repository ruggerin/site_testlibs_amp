import SocialIconButtons from "@/components/SocialIconButtons";
import { FOOTER_INNER, FOOTER_PAD_X, SITE } from "@/lib/site";
import { FOOTER_SOCIAL_LINKS } from "@/lib/social";

const LEGAL_LINKS: { label: string; href: string }[] = [
  { label: "FAQ", href: "/faq" },
  { label: "Termos", href: "#" },
  { label: "Privacidade", href: "#" },
];

const FOOTER_TEXT =
  "text-[clamp(13px,1.04vw,20px)] font-normal leading-[1.21]";

export default function PageFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#161616] text-[var(--orange)]">
      <div
        className={`${FOOTER_INNER} ${FOOTER_PAD_X}`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {/* Desktop — Figma 1:138: copyright | ícones | fale conosco */}
        <div
          className="relative hidden w-full lg:block"
          style={{ minHeight: "clamp(120px,7.5vw,144px)" }}
        >
          <p
            className={`${FOOTER_TEXT} absolute left-0 top-[clamp(32px,2.29vw,44px)] w-[18.44%] text-left`}
          >
            Agência AMP ® {year}
            <br />
            Todos os direitos reservados.
          </p>

          <div className="absolute left-1/2 top-[clamp(32px,2.29vw,44px)] -translate-x-1/2">
            <SocialIconButtons
              variant="on-dark"
              links={FOOTER_SOCIAL_LINKS}
              className="gap-[14px]"
            />
          </div>

          <div
            className={`${FOOTER_TEXT} absolute right-0 top-[clamp(32px,2.29vw,44px)] w-[18.44%] text-right`}
          >
            <span className="block">Fale conosco</span>
            <a href={SITE.phoneHref} className="transition-opacity hover:opacity-80">
              {SITE.phone}
            </a>
          </div>

          <div className="absolute bottom-4 left-0 right-0 flex flex-wrap justify-center gap-4 text-[10px] uppercase tracking-widest text-[var(--orange)]/70">
            {LEGAL_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="transition-colors duration-300 hover:text-[var(--cream)]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="flex flex-col gap-6 py-10 sm:py-12 lg:hidden">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <p className={FOOTER_TEXT}>
              Agência AMP ® {year}
              <br />
              Todos os direitos reservados.
            </p>
            <div className={`${FOOTER_TEXT} text-right`}>
              <span className="block">Fale conosco</span>
              <a href={SITE.phoneHref} className="transition-opacity hover:opacity-80">
                {SITE.phone}
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <SocialIconButtons variant="on-dark" links={FOOTER_SOCIAL_LINKS} />
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-[10px] uppercase tracking-widest text-[var(--orange)]/70">
            {LEGAL_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="transition-colors duration-300 hover:text-[var(--cream)]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
