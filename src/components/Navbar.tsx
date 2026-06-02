"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SOCIAL_ICON_BY_LABEL } from "@/components/SocialIconButtons";
import { SOCIAL_LINKS } from "@/lib/social";
import { HOME_EDGE_X, HOME_LOGO_OFFSET, HOME_NAV_WIDTH } from "@/lib/site";

/** Mesma sangria direita do hero/rodapé — evita % no botão que desloca em telas largas. */
const HOME_PAD_X = "clamp(24px, 1.5625vw, 30px)";

/** Itens centrais — Figma 2:121 (textCase UPPER no arquivo; rótulos como no layout). */
const MENU_PRIMARY: { label: string; href: string }[] = [
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Nossa Cultura", href: "/nossa-cultura" },
  { label: "Serviços", href: "/servicos" },
  { label: "Projetos", href: "/cases" },
  { label: "Prêmios", href: "/premios" },
  { label: "Blog", href: "/blog" },
];

const LOGO_DARK = "/assets/logo_amp_blackfont.svg";
const LOGO_LIGHT = "/logo_AMP-NEW_1.png";

type NavbarProps = {
  /** Páginas claras usam ícone escuro; home e quem-somos mantêm o padrão claro. */
  theme?: "dark" | "light";
};

export default function Navbar({ theme = "dark" }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => href !== "#" && pathname === href;
  const isHome = pathname === "/";
  const isCulturaHero = pathname === "/nossa-cultura";
  const useDarkChrome = theme === "light" || isHome || isCulturaHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Quando a barra escura aparece no scroll, elementos devem ser claros (fundo escuro)
  const showScrollBar = scrolled && !isHome && !menuOpen;
  const effectiveDarkChrome = showScrollBar ? false : useDarkChrome;
  const barColor = menuOpen ? "bg-[var(--orange)]" : effectiveDarkChrome ? "bg-[#232323]" : "bg-white";

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`z-50 flex items-center justify-between transition-[background-color,padding,box-shadow] duration-300 ease-out ${
          isHome
            ? "fixed top-0 py-6"
            : `fixed top-0 left-0 right-0 px-8 md:px-16 ${
                showScrollBar
                  ? "bg-[#232323]/95 py-4 shadow-[0_2px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm"
                  : "py-6"
              }`
        }`}
        style={
          isHome
            ? {
                left: HOME_EDGE_X,
                width: HOME_NAV_WIDTH,
                paddingLeft: 0,
                paddingRight: HOME_PAD_X,
              }
            : undefined
        }
      >
        <Link
          href="/"
          className={`relative z-50 block shrink-0 transition-opacity hover:opacity-90 ${
            effectiveDarkChrome
              ? "h-[26px] w-[4.6rem] sm:h-[30px] sm:w-[5.35rem] md:h-[34px] md:w-[6.1rem]"
              : "h-8 w-[7.5rem] sm:h-9 sm:w-[8.5rem] md:h-10 md:w-40"
          }`}
          style={isHome ? { marginLeft: HOME_LOGO_OFFSET } : undefined}
        >
          <Image
            src={effectiveDarkChrome ? LOGO_DARK : LOGO_LIGHT}
            alt="Agência AMP"
            fill
            className="object-contain object-left"
            sizes={effectiveDarkChrome ? "(max-width: 768px) 74px, 98px" : "(max-width: 768px) 140px, 180px"}
            priority
          />
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          className={`relative z-50 flex shrink-0 cursor-pointer flex-col justify-center gap-[6px] group ${
            isHome ? "h-[26px] sm:h-[30px] md:h-[34px]" : "h-8 md:h-10"
          }`}
        >
          <span
            className={`block h-[2px] origin-center transition-all duration-300 ${barColor} ${
              isHome ? "w-[clamp(28px,2.1vw,32px)]" : "w-8"
            }`}
            style={{ transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none" }}
          />
          <span
            className={`block h-[2px] transition-opacity duration-300 ${barColor} ${
              isHome ? "w-[clamp(28px,2.1vw,32px)]" : "w-8"
            }`}
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className={`block h-[2px] origin-center transition-all duration-300 ${barColor} ${
              isHome ? "w-[clamp(28px,2.1vw,32px)]" : "w-8"
            }`}
            style={{ transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none" }}
          />
        </button>
      </nav>

      {/* Overlay menu — fundo #232323, tipografia laranja, redes à direita */}
      <div
        className={`fixed inset-0 z-40 flex w-full max-w-[100vw] flex-col bg-[#232323] transition-[clip-path] duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] ${
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
                      className={`flex w-full items-center px-5 py-[0.12em] uppercase leading-none tracking-[-0.02em] transition-[background-color,color] duration-300 ease-out
                        ${
                          active
                            ? "bg-[var(--orange)] font-black text-[var(--ink)]"
                            : "font-medium text-[var(--orange)] hover:bg-[var(--orange)] hover:text-[var(--ink)]"
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
              {SOCIAL_LINKS.map((s) => {
                const Icon =
                  SOCIAL_ICON_BY_LABEL[s.label] ?? SOCIAL_ICON_BY_LABEL.LinkedIn;
                return (
                  <li key={s.label} className="flex flex-row items-center gap-7 sm:gap-8">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-12 shrink-0 items-center justify-center bg-[var(--orange)] text-[var(--ink)] transition-colors duration-300 ease-out hover:bg-[var(--ink)] hover:text-[var(--orange)]"
                      aria-label={s.label}
                    >
                      <Icon className="h-[22px] w-[22px]" />
                    </a>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-w-0 font-medium uppercase leading-[1.356] text-[var(--orange)] transition-[color,opacity] duration-300 ease-out hover:text-[var(--ink)] hover:opacity-90"
                      style={{
                        fontFamily: "var(--font-darker-grotesque)",
                        fontSize: "clamp(1.125rem, 2.35vw, 2.5rem)",
                      }}
                    >
                      {s.label.toLowerCase()}
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
