"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Serviços", href: "/servicos" },
  { label: "Cases", href: "/cases" },
  { label: "Time", href: "/time" },
  { label: "Contato", href: "/contato" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Esconde/mostra navbar ao scrollar
    ScrollTrigger.create({
      start: "top -80px",
      onEnter: () => gsap.to(navRef.current, { backgroundColor: "rgba(24,24,24,0.95)", duration: 0.3 }),
      onLeaveBack: () => gsap.to(navRef.current, { backgroundColor: "transparent", duration: 0.3 }),
    });
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-40 px-8 md:px-16 py-6 flex items-center justify-between transition-colors"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-black text-2xl text-[#FF4D00] tracking-tight leading-none"
          style={{ fontFamily: "var(--font-darker-grotesque)" }}
        >
          AMP
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          className="flex flex-col gap-[6px] group cursor-pointer"
        >
          <span
            className="block w-8 h-[2px] bg-white origin-center transition-transform duration-300"
            style={{ transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none" }}
          />
          <span
            className="block w-8 h-[2px] bg-white transition-opacity duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-8 h-[2px] bg-white origin-center transition-transform duration-300"
            style={{ transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none" }}
          />
        </button>
      </nav>

      {/* Menu overlay */}
      <div
        className="fixed inset-0 z-30 bg-[#FF4D00] flex flex-col items-start justify-center px-16 transition-all duration-700"
        style={{
          clipPath: menuOpen ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
        }}
      >
        <ul className="space-y-2">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[#181818] font-black uppercase text-6xl md:text-8xl leading-none hover:opacity-60 transition-opacity"
                style={{ fontFamily: "var(--font-darker-grotesque)" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
