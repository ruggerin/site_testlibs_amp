"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

/** Itens centrais — Figma 2:121 (textCase UPPER no arquivo; rótulos como no layout). */
const MENU_PRIMARY: { label: string; href: string }[] = [
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Nossa Cultura", href: "/nossa-cultura" },
  { label: "Serviços", href: "/servicos" },
  { label: "Projetos", href: "/cases" },
  { label: "Prêmios", href: "/premios" },
  { label: "Blog", href: "/blog" },
];

const SOCIAL: { label: string; href: string }[] = [
  { label: "instagram", href: "https://instagram.com" },
  { label: "facebook", href: "https://facebook.com" },
  { label: "youtube", href: "https://youtube.com" },
  { label: "behance", href: "https://behance.net" },
  { label: "linkedin", href: "https://linkedin.com" },
];

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
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

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 8h3V5h-3c-2.2 0-4 1.8-4 4v3H7v3h3v8h3v-8h3l1-3h-4V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

function IconYoutube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.6 7.2s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.2 4 12 4 12 4s-4.2 0-6.8.3c-.4 0-1.2 0-2 .9-.6.6-.8 2-.8 2S2 9 2 10.8v2.4c0 1.8.2 3.6.2 3.6s.2 1.4.8 2c.8.8 1.9.8 2.4.9 1.8.2 7.6.2 7.6.2s4.2 0 6.8-.3c.4 0 1.2 0 2-.9.6-.6.8-2 .8-2s.2-1.8.2-3.6v-2.4c0-1.8-.2-3.6-.2-3.6zM10 14.5V8.5L15.2 11.5 10 14.5z" />
    </svg>
  );
}

function IconBehance({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7.8 5.6h5.5c1.5 0 2.8 1 2.8 2.5 0 1.2-.6 2-1.5 2.4 1.3.4 2.2 1.4 2.2 3 0 2.2-1.7 3.5-4 3.5H7.8V5.6zm2.4 4.3h2.4c.9 0 1.5-.4 1.5-1.2 0-.8-.6-1.2-1.5-1.2h-2.4v2.4zm0 4.4h2.8c1 0 1.7-.5 1.7-1.5s-.7-1.5-1.8-1.5h-2.7V14.3zM18.4 9.2h4.1v1.5h-4.1V9.2z" />
    </svg>
  );
}

function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M5 3a2 2 0 100 4 2 2 0 000-4zm-2 7h4v11H3V10zm7 0h3.8v1.5h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6v5.5h-4v-4.9c0-1.2 0-2.7-1.7-2.7-1.7 0-2 1.3-2 2.7V21h-4V10z" />
    </svg>
  );
}

const SOCIAL_ICONS = [IconInstagram, IconFacebook, IconYoutube, IconBehance, IconLinkedin] as const;

const LOGO_DARK = "/assets/logo_amp_blackfont.svg";
const LOGO_LIGHT = "/logo_AMP-NEW_1.png";

type NavbarProps = {
  /** Páginas claras usam ícone escuro; home e quem-somos mantêm o padrão claro. */
  theme?: "dark" | "light";
};

export default function Navbar({ theme = "dark" }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => href !== "#" && pathname === href;
  const isHome = pathname === "/";
  const useDarkChrome = theme === "light" || isHome;
  const barColor = menuOpen ? "bg-[var(--orange)]" : useDarkChrome ? "bg-[#232323]" : "bg-white";

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6 md:px-16"
      >
        <Link
          href="/"
          className={`relative z-50 block shrink-0 transition-opacity hover:opacity-90 ${
            useDarkChrome
              ? "h-[26px] w-[4.6rem] sm:h-[30px] sm:w-[5.35rem] md:h-[34px] md:w-[6.1rem]"
              : "h-8 w-[7.5rem] sm:h-9 sm:w-[8.5rem] md:h-10 md:w-40"
          }`}
        >
          <Image
            src={useDarkChrome ? LOGO_DARK : LOGO_LIGHT}
            alt="Agência AMP"
            fill
            className="object-contain object-left"
            sizes={useDarkChrome ? "(max-width: 768px) 74px, 98px" : "(max-width: 768px) 140px, 180px"}
            priority
          />
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          className="relative z-50 flex cursor-pointer flex-col gap-[6px] group"
        >
          <span
            className={`block h-[2px] w-8 origin-center transition-all duration-300 ${barColor}`}
            style={{ transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none" }}
          />
          <span
            className={`block h-[2px] w-8 transition-opacity duration-300 ${barColor}`}
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className={`block h-[2px] w-8 origin-center transition-all duration-300 ${barColor}`}
            style={{ transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none" }}
          />
        </button>
      </nav>

      {/* Overlay menu — fundo #232323, tipografia laranja, redes à direita */}
      <div
        className={`fixed inset-0 z-30 flex w-full max-w-[100vw] flex-col bg-[#232323] transition-[clip-path] duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          clipPath: menuOpen ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
        }}
        aria-hidden={!menuOpen}
      >
        <div
          className="flex min-h-0 min-w-0 flex-1 flex-col px-10 pt-[7.25rem] pb-10 sm:px-16 sm:pt-32 md:px-20 md:pt-36
                     lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:pb-16 lg:pt-[9.5rem]
                     lg:pl-[max(4rem,calc(17vw))] lg:pr-[max(1.75rem,calc(12.6vw-0.5rem))]"
        >
          {/* Navegação */}
          <div className="relative flex min-h-0 min-w-0 flex-1 flex-col justify-center lg:max-w-[min(100%,42rem)] xl:max-w-[50rem]">
            <ul className="min-w-0 flex-1 space-y-0">
              {MENU_PRIMARY.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={`${item.href}-${item.label}`}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center w-full px-5 py-[0.12em] uppercase leading-none tracking-[-0.02em] transition-colors duration-200
                        ${active
                          ? "font-black bg-[var(--orange)] text-[#232323]"
                          : "font-medium text-[var(--orange)] hover:bg-[var(--orange)] hover:text-[#232323] hover:font-black"
                        }`}
                      style={{
                        fontFamily: "var(--font-darker-grotesque)",
                        fontSize: "clamp(1.85rem, 5.2vw, 4.5625rem)",
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Redes sociais */}
          <aside className="mt-12 shrink-0 border-t border-white/10 pt-10 sm:pt-12 lg:mt-0 lg:border-t-0 lg:pt-0">
            <ul className="flex flex-col gap-[37px]">
              {SOCIAL.map((s, i) => {
                const Icon = SOCIAL_ICONS[i] ?? IconLinkedin;
                return (
                  <li key={s.label} className="flex flex-row items-center gap-7 sm:gap-8">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-12 shrink-0 items-center justify-center bg-[var(--orange)] text-white transition-opacity hover:opacity-90"
                      aria-label={s.label}
                    >
                      <Icon className="h-[22px] w-[22px]" />
                    </a>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-w-0 font-medium uppercase leading-[1.356] text-[var(--orange)] transition-opacity hover:opacity-75"
                      style={{
                        fontFamily: "var(--font-darker-grotesque)",
                        fontSize: "clamp(1.125rem, 2.35vw, 2.5rem)",
                      }}
                    >
                      {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
}
