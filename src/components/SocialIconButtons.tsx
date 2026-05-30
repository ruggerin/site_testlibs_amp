import type { ComponentType, SVGProps } from "react";
import { FOOTER_SOCIAL_LINKS, SOCIAL_LINKS } from "@/lib/social";

type IconProps = SVGProps<SVGSVGElement>;

function IconInstagram({ className, ...props }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function IconFacebook({ className, ...props }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M14 8h3V5h-3c-2.2 0-4 1.8-4 4v3H7v3h3v8h3v-8h3l1-3h-4V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

function IconYoutube({ className, ...props }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M21.6 7.2s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.2 4 12 4 12 4s-4.2 0-6.8.3c-.4 0-1.2 0-2 .9-.6.6-.8 2-.8 2S2 9 2 10.8v2.4c0 1.8.2 3.6.2 3.6s.2 1.4.8 2c.8.8 1.9.8 2.4.9 1.8.2 7.6.2 7.6.2s4.2 0 6.8-.3c.4 0 1.2 0 2-.9.6-.6.8-2 .8-2s.2-1.8.2-3.6v-2.4c0-1.8-.2-3.6-.2-3.6zM10 14.5V8.5L15.2 11.5 10 14.5z" />
    </svg>
  );
}

function IconBehance({ className, ...props }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M7.8 5.6h5.5c1.5 0 2.8 1 2.8 2.5 0 1.2-.6 2-1.5 2.4 1.3.4 2.2 1.4 2.2 3 0 2.2-1.7 3.5-4 3.5H7.8V5.6zm2.4 4.3h2.4c.9 0 1.5-.4 1.5-1.2 0-.8-.6-1.2-1.5-1.2h-2.4v2.4zm0 4.4h2.8c1 0 1.7-.5 1.7-1.5s-.7-1.5-1.8-1.5h-2.7V14.3zM18.4 9.2h4.1v1.5h-4.1V9.2z" />
    </svg>
  );
}

function IconLinkedin({ className, ...props }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M5 3a2 2 0 100 4 2 2 0 000-4zm-2 7h4v11H3V10zm7 0h3.8v1.5h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6v5.5h-4v-4.9c0-1.2 0-2.7-1.7-2.7-1.7 0-2 1.3-2 2.7V21h-4V10z" />
    </svg>
  );
}

const SOCIAL_ICONS: ComponentType<IconProps>[] = [
  IconInstagram,
  IconFacebook,
  IconYoutube,
  IconBehance,
  IconLinkedin,
];

const SOCIAL_ICON_BY_LABEL: Record<string, ComponentType<IconProps>> = {
  Instagram: IconInstagram,
  Facebook: IconFacebook,
  YouTube: IconYoutube,
  Behance: IconBehance,
  LinkedIn: IconLinkedin,
};

export {
  IconInstagram,
  IconFacebook,
  IconYoutube,
  IconBehance,
  IconLinkedin,
  SOCIAL_ICONS,
  SOCIAL_ICON_BY_LABEL,
};

type SocialLink = (typeof SOCIAL_LINKS)[number];

type SocialIconButtonsProps = {
  /** Rodapé escuro (#161616) ou home sobre laranja. */
  variant?: "on-dark" | "on-light";
  className?: string;
  links?: readonly SocialLink[];
};

const variantStyles = {
  /** Rodapé escuro — Figma: borda/ícone laranja; hover fundo #232323 + ícone #FF5B00 */
  "on-dark":
    "border-2 border-[var(--orange)] bg-transparent text-[var(--orange)] transition-colors duration-300 ease-out hover:border-[var(--orange)] hover:bg-[var(--ink)] hover:text-[var(--orange)]",
  "on-light":
    "border-2 border-[var(--ink)] bg-transparent text-[var(--ink)] transition-colors duration-300 ease-out hover:border-[var(--orange)] hover:bg-[var(--ink)] hover:text-[var(--orange)]",
} as const;

/** Botões quadrados com ícone — padrão Figma (borda 2px). */
export default function SocialIconButtons({
  variant = "on-dark",
  className = "",
  links = FOOTER_SOCIAL_LINKS,
}: SocialIconButtonsProps) {
  return (
    <div className={`flex flex-wrap gap-2 lg:gap-3 ${className}`}>
      {links.map((social) => {
        const Icon = SOCIAL_ICON_BY_LABEL[social.label] ?? IconLinkedin;
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className={`flex shrink-0 items-center justify-center ${variantStyles[variant]}`}
            style={{
              width: "clamp(34px, 2.6vw, 47px)",
              height: "clamp(34px, 2.6vw, 47px)",
            }}
          >
            <Icon className="h-4 w-4 lg:h-[clamp(14px,1.1vw,20px)] lg:w-[clamp(14px,1.1vw,20px)]" />
          </a>
        );
      })}
    </div>
  );
}
