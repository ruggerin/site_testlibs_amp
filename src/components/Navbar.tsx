"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SOCIAL_ICON_BY_LABEL } from "@/components/SocialIconButtons";
import { SOCIAL_LINKS } from "@/lib/social";
import { HOME_FIGMA, homeRect } from "@/lib/home-figma";

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
  const homeLogo = homeRect(HOME_FIGMA.logo);
  const homeMenu = homeRect(HOME_FIGMA.menu); // top: -2.5%

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
        className={`z-50 transition-[background-color,padding,box-shadow] duration-300 ease-out ${
          isHome
            ? "pointer-events-none absolute inset-0 z-50 h-full w-full"
            : `fixed top-0 left-0 right-0 flex items-center justify-between px-8 md:px-16 ${
                showScrollBar
                  ? "bg-[#232323]/95 py-4 shadow-[0_2px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm"
                  : "py-6"
              }`
        }`}
      >
        <Link
          href="/"
          className={`relative z-50 block shrink-0 transition-opacity hover:opacity-90 ${
            isHome
              ? "pointer-events-auto absolute"
              : effectiveDarkChrome
              ? "h-[26px] w-[4.6rem] sm:h-[30px] sm:w-[5.35rem] md:h-[34px] md:w-[6.1rem]"
              : "h-8 w-[7.5rem] sm:h-9 sm:w-[8.5rem] md:h-10 md:w-40"
          }`}
          style={isHome ? homeLogo : undefined}
        >
          {isHome ? (
            // SVG 185×66 — mesma caixa do Figma; img nativo evita crop do next/image
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={LOGO_DARK}
              alt="Agência AMP"
              width={185}
              height={66}
              className="block h-full w-full"
              draggable={false}
            />
          ) : (
            <Image
              src={effectiveDarkChrome ? LOGO_DARK : LOGO_LIGHT}
              alt="Agência AMP"
              fill
              className="object-contain object-left"
              sizes={effectiveDarkChrome ? "(max-width: 768px) 74px, 185px" : "(max-width: 768px) 140px, 180px"}
              priority
            />
          )}
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          className={`relative z-50 m-0 flex shrink-0 cursor-pointer flex-col border-0 bg-transparent p-0 group ${
            isHome
              ? "pointer-events-auto absolute min-h-0 justify-start gap-[8px]"
              : "h-8 justify-center gap-[6px] md:h-10"
          }`}
          style={isHome ? homeMenu : undefined}
        >
          <span
            className={`block h-[2px] origin-center transition-all duration-300 ${barColor} ${
              isHome ? "w-full" : "w-8"
            }`}
            style={{ transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none" }}
          />
          <span
            className={`block h-[2px] transition-opacity duration-300 ${barColor} ${
              isHome ? "w-full" : "w-8"
            }`}
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className={`block h-[2px] origin-center transition-all duration-300 ${barColor} ${
              isHome ? "w-full" : "w-8"
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
                      className={`group/nav relative flex min-h-[1em] w-full items-center px-5 uppercase tracking-[-0.02em] ${
                        active ? "font-black" : "font-medium"
                      }`}
                      style={{
                        fontFamily: "var(--font-darker-grotesque)",
                        fontSize: "clamp(1.85rem, 5.2vw, 4.5625rem)",
                      }}
                    >
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute inset-x-0 top-1/2 h-[1em] -translate-y-1/2 transition-colors duration-300 ease-out ${
                          active
                            ? "bg-[var(--orange)]"
                            : "bg-transparent group-hover/nav:bg-[var(--orange)] group-focus-visible/nav:bg-[var(--orange)]"
                        }`}
                      />
                      <span
                        className={`relative z-10 leading-none transition-colors duration-300 ease-out ${
                          active
                            ? "text-[var(--ink)]"
                            : "text-[var(--orange)] group-hover/nav:text-[var(--ink)] group-focus-visible/nav:text-[var(--ink)]"
                        }`}
                      >
                        {item.label}
                      </span>
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
                  <li key={s.label} className="-mx-5 sm:-mx-8 lg:-mx-10">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="group/social relative flex h-12 w-full items-center gap-7 px-5 focus-visible:outline-none sm:gap-8 sm:px-8 lg:px-10"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-transparent transition-colors duration-300 ease-out group-hover/social:bg-[var(--orange)] group-focus-visible/social:bg-[var(--orange)]"
                      />
                      <span className="relative z-10 flex size-12 shrink-0 items-center justify-center bg-[var(--orange)] text-[var(--ink)]">
                        <Icon className="h-[22px] w-[22px]" aria-hidden />
                      </span>
                      <span
                        className="relative z-10 flex h-12 min-w-0 items-center font-medium uppercase text-[var(--orange)] transition-colors duration-300 ease-out group-hover/social:text-[var(--ink)] group-focus-visible/social:text-[var(--ink)]"
                        style={{
                          fontFamily: "var(--font-darker-grotesque)",
                          fontSize: "clamp(1.125rem, 2.35vw, 2.5rem)",
                          lineHeight: 1,
                        }}
                      >
                        {s.label.toLowerCase()}
                      </span>
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
