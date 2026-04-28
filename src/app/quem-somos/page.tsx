"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import ClientsMarquee from "@/components/ClientsMarquee";
import ZoomImage from "@/components/ZoomImage";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Dados de conteúdo ────────────────────────────────────────────────────────

const TEAM = [
  { name: "Jaím Re'Banis", role: "Diretor de Criação" },
  { name: "Nome e Sobrenome", role: "Função" },
  { name: "Nome e Sobrenome", role: "Função" },
  { name: "Nome e Sobrenome", role: "Função" },
  { name: "Nome e Sobrenome", role: "Função" },
  { name: "Nome e Sobrenome", role: "Função" },
  { name: "Nome e Sobrenome", role: "Função" },
];

const STATES = ["Acre", "Amapá", "Amazonas", "Pará", "Rondônia", "Roraima"];

// ─── Componente principal ─────────────────────────────────────────────────────

export default function QuemSomos() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ── Utilitário de reveal padrão ──────────────────────────────────────
      const reveal = (selector: string, vars?: gsap.TweenVars) =>
        gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
          gsap.fromTo(
            el,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              ...vars,
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        });

      // ── Scale-down reveal para títulos grandes ───────────────────────────
      // Efeito: nasce maior (zoom in) e "pousa" no tamanho normal
      // Scale 1.18 → 1.0  +  blur 10px → 0px  +  opacity 0 → 1
      const revealScale = (selector: string) =>
        gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
          gsap.fromTo(
            el,
            {
              scale: 1.18,
              opacity: 0,
              filter: "blur(12px)",
              transformOrigin: "center center",
            },
            {
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.4,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        });

      // ── Hero — mesma lógica scale-down no load ───────────────────────────
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(".hero-tag",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 })
        .fromTo(".hero-quem",
          { scale: 1.22, opacity: 0, filter: "blur(14px)", transformOrigin: "left center" },
          { scale: 1,    opacity: 1, filter: "blur(0px)",  duration: 1.3 },
          "-=0.2")
        .fromTo(".hero-photo",
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1,    duration: 1.4 },
          "-=1.0")
        .fromTo(".hero-somos",
          { scale: 1.22, opacity: 0, filter: "blur(14px)", transformOrigin: "left center" },
          { scale: 1,    opacity: 1, filter: "blur(0px)",  duration: 1.3 },
          "-=1.1")
        .fromTo(".hero-bottom",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          "-=0.7");

      // ── Scroll reveals ───────────────────────────────────────────────────
      revealScale(".reveal-title");
      reveal(".reveal-text");
      reveal(".reveal-orange-quote", { x: -30, y: 0 });

      // Photo grid — stagger
      gsap.utils.toArray<HTMLElement>(".photo-grid-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power4.out",
            delay: i * 0.15,
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // Team list — stagger
      gsap.fromTo(
        ".team-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".team-list", start: "top 80%" },
        }
      );

      // Seção de clientes — reveal da seção toda (o marquee se anima internamente)
      gsap.fromTo(
        ".clients-section",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".clients-section", start: "top 85%" },
        }
      );
    },
    { scope: pageRef }
  );

  return (
    <SmoothScroll>
      <div ref={pageRef} className="bg-[#181818] text-white">
        <Navbar />

        {/* ══════════════════════════════════════════════════════════════════
            HERO — QUEM SOMOS
        ══════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen pt-24 pb-16 px-8 md:px-16 overflow-hidden">
          {/* Tag topo esquerda */}
          <p
            className="hero-tag text-white/60 text-xs uppercase tracking-[0.2em] mb-4"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Ser 360 não é oferecer tudo.
          </p>

          {/* QUEM */}
          <h1
            className="hero-quem text-[#FF4D00] font-black uppercase leading-none"
            style={{
              fontFamily: "var(--font-darker-grotesque)",
              fontSize: "clamp(80px, 17vw, 220px)",
            }}
          >
            QUEM
          </h1>

          {/* Foto + SOMOS em grid editorial */}
          <div className="relative flex items-end">
            {/* SOMOS */}
            <div className="flex-1">
              <h1
                className="hero-somos text-[#FF4D00] font-black uppercase leading-none"
                style={{
                  fontFamily: "var(--font-darker-grotesque)",
                  fontSize: "clamp(80px, 17vw, 220px)",
                }}
              >
                SOMOS
              </h1>
            </div>

            {/* Foto — sobreposição editorial */}
            <div
              className="hero-photo absolute right-0 top-1/2 -translate-y-1/2 w-[32vw] max-w-[420px] min-w-[220px] z-10"
              style={{ marginTop: "-4vw" }}
            >
              <ZoomImage
                src="https://picsum.photos/seed/director1/600/800"
                alt="Jaím Re'Banis — Diretor de Criação"
                className="w-full aspect-[3/4]"
              >
                {/* Gradiente + caption sobre a imagem */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
                <div className="relative z-10">
                  <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-darker-grotesque)" }}>
                    Jaím Re&apos;Banis
                  </p>
                  <p className="text-white/50 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                    Diretor de Criação
                  </p>
                </div>
              </ZoomImage>
            </div>
          </div>

          {/* Tagline bottom */}
          <div className="hero-bottom mt-8 md:mt-12 flex flex-col md:flex-row md:justify-between gap-4">
            <p
              className="hero-bottom text-white/80 text-base md:text-lg font-medium max-w-xs"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              É fazer tudo funcionar junto.
            </p>
            <div className="hero-bottom w-16 h-[2px] bg-[#FF4D00] mt-2 md:mt-3 self-start md:self-auto" />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            MANIFESTO
        ══════════════════════════════════════════════════════════════════ */}
        <section className="px-8 md:px-16 py-24 grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Coluna esquerda — quote em laranja */}
          <div>
            <p
              className="reveal-orange-quote text-[#FF4D00] font-black text-xl md:text-2xl leading-snug uppercase"
              style={{ fontFamily: "var(--font-darker-grotesque)" }}
            >
              AO LONGO DE MAIS DE UMA DÉCADA, A AMP ENTENDEU QUE RESULTADOS
              CONSISTENTES NÃO NASCEM DE ESFORÇOS ISOLADOS.
            </p>
          </div>

          {/* Coluna direita — texto corrido */}
          <div className="space-y-5">
            <p
              className="reveal-text text-white/70 text-base leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Ser uma agência de marketing 360 vai além do Huml serviços sob o
              mesmo teto. Trata-se de operar como um verdadeiro hub de marketing,
              sendo um sistema onde cada frente conversa, se alimenta e evolui em
              conjunto.
            </p>
            <p
              className="reveal-text text-white/70 text-base leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Sabemos bem como funciona: branding sem performance é só um quadro
              bonito na parede, e a performance sem branding é quase recurso sem
              rosto. A harmonia da AMP, intuição que o cliente for e o quanto está sendo vendido.
            </p>
            <p
              className="reveal-text text-white/70 text-base leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              No fim das contas, entregamos o que falta em quase toda agência por
              aí: coerência.
            </p>
          </div>
        </section>

        {/* Pull quote lateral */}
        <div className="px-8 md:px-16 pb-20">
          <p
            className="reveal-orange-quote text-[#FF4D00] font-black text-2xl md:text-4xl xl:text-5xl uppercase leading-tight max-w-4xl border-l-4 border-[#FF4D00] pl-8"
            style={{ fontFamily: "var(--font-darker-grotesque)" }}
          >
            AQUI, O CRIATIVO NÃO CAMINHA SEM O DADO, E OS DADOS NÃO EXISTEM SEM
            DIREÇÃO ESTRATÉGICA.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            PHOTO GRID
        ══════════════════════════════════════════════════════════════════ */}
        <section className="px-8 md:px-16 py-8 grid grid-cols-3 gap-3 md:gap-4">
          {[
            { seed: "office01", label: "Escritório" },
            { seed: "meeting2", label: "Reunião de time" },
            { seed: "creative", label: "Ambiente criativo" },
          ].map(({ seed, label }) => (
            <div key={seed} className="photo-grid-item overflow-hidden">
              <ZoomImage
                src={`https://picsum.photos/seed/${seed}/800/450`}
                alt={label}
                className="w-full aspect-video"
                overlayClassName="bg-black/20 hover:bg-black/0"
              />
            </div>
          ))}
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            TIME
        ══════════════════════════════════════════════════════════════════ */}
        <section className="px-8 md:px-16 py-24 grid md:grid-cols-2 gap-16">
          {/* Coluna esquerda — foto do colaborador */}
          <div className="relative">
            <ZoomImage
              src="https://picsum.photos/seed/member01/600/800"
              alt="Colaborador"
              className="w-full max-w-sm aspect-[3/4]"
            />
            <p
              className="reveal-text mt-4 text-white/50 text-sm"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Aqui vai um breve histórico da jornada profissional do colaborador.
            </p>
          </div>

          {/* Coluna direita — título + lista */}
          <div>
            {/* Título com texto circular decorativo */}
            <div className="relative mb-12">
              <h2
                className="reveal-title text-white font-black uppercase leading-none"
                style={{
                  fontFamily: "var(--font-darker-grotesque)",
                  fontSize: "clamp(60px, 10vw, 130px)",
                }}
              >
                TIME
              </h2>
              {/* Texto circular decorativo */}
              <svg
                viewBox="0 0 120 120"
                className="absolute top-0 right-0 w-20 h-20 opacity-30 animate-spin"
                style={{ animationDuration: "12s" }}
              >
                <defs>
                  <path id="circle-text" d="M60,10 a50,50 0 1,1 -0.01,0" />
                </defs>
                <text
                  className="fill-white"
                  fontSize="11"
                  letterSpacing="3"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <textPath href="#circle-text">NOSSAS TRÊS LETRAS · </textPath>
                </text>
              </svg>
            </div>

            {/* Lista do time */}
            <ul className="team-list divide-y divide-white/10">
              {TEAM.map((member, i) => (
                <li
                  key={i}
                  className="team-item flex items-center justify-between py-4 group cursor-pointer hover:pl-3 transition-all duration-300"
                >
                  <span
                    className="font-bold text-white group-hover:text-[#FF4D00] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-darker-grotesque)", fontSize: "1.1rem" }}
                  >
                    {member.name}
                  </span>
                  <span
                    className="text-white/40 text-sm group-hover:text-white/70 transition-colors duration-300"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {member.role}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className="mt-8 text-[#FF4D00] text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all duration-300"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              + Ver mais
            </button>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            ESTAMOS AQUI
        ══════════════════════════════════════════════════════════════════ */}
        <section className="px-8 md:px-16 py-24 bg-[#111111]">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Coluna esquerda — texto */}
            <div>
              <h2
                className="reveal-title text-white font-black uppercase leading-none"
                style={{
                  fontFamily: "var(--font-darker-grotesque)",
                  fontSize: "clamp(48px, 7vw, 100px)",
                }}
              >
                ESTAMOS
              </h2>
              <h2
                className="reveal-title text-white font-black uppercase leading-none"
                style={{
                  fontFamily: "var(--font-darker-grotesque)",
                  fontSize: "clamp(48px, 7vw, 100px)",
                }}
              >
                AQUI
              </h2>

              <p
                className="reveal-text mt-6 text-[#FF4D00] font-bold text-sm uppercase tracking-widest"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Presença estratégica com alcance nacional
              </p>
              <p
                className="reveal-text mt-3 text-white/60 text-sm"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Para quem pensa grande, o Brasil é logo ali. Com a AMP, o destino é sempre o topo.
              </p>

              {/* Lista de estados */}
              <ul className="mt-10 space-y-1">
                {STATES.map((state) => (
                  <li
                    key={state}
                    className="reveal-text flex items-center gap-3 py-2 border-b border-white/10"
                  >
                    {state === "Amazonas" && (
                      <span className="w-2 h-2 rounded-full bg-[#FF4D00] inline-block" />
                    )}
                    <span
                      className={`text-sm font-medium ${state === "Amazonas" ? "text-[#FF4D00]" : "text-white/60"}`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {state}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna direita — Mapa do Brasil simplificado */}
            <div className="reveal-text flex items-center justify-center">
              <div className="relative w-full max-w-md">
                {/* Mapa placeholder — substitua pelo SVG real do Brasil */}
                <svg viewBox="0 0 400 450" className="w-full opacity-80">
                  {/* Outline simplificado do Brasil */}
                  <path
                    d="M200 30 L320 80 L370 160 L360 240 L310 310 L260 370 L200 410 L140 370 L90 310 L40 240 L30 160 L80 80 Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeOpacity="0.2"
                  />
                  {/* Região AM destacada */}
                  <path
                    d="M120 100 L200 90 L230 140 L220 200 L160 210 L110 170 Z"
                    fill="#FF4D00"
                    fillOpacity="0.8"
                  />
                  {/* Label AM */}
                  <text
                    x="165"
                    y="158"
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                    style={{ fontFamily: "var(--font-darker-grotesque)" }}
                  >
                    AM
                  </text>
                  {/* Outros estados — outline leve */}
                  <path
                    d="M200 90 L270 80 L300 120 L280 160 L230 140 Z"
                    fill="white"
                    fillOpacity="0.05"
                    stroke="white"
                    strokeWidth="0.5"
                    strokeOpacity="0.15"
                  />
                  <path
                    d="M110 170 L160 210 L150 270 L100 280 L70 230 L80 180 Z"
                    fill="white"
                    fillOpacity="0.05"
                    stroke="white"
                    strokeWidth="0.5"
                    strokeOpacity="0.15"
                  />
                  <path
                    d="M220 200 L280 190 L300 250 L260 290 L210 270 L200 230 Z"
                    fill="white"
                    fillOpacity="0.05"
                    stroke="white"
                    strokeWidth="0.5"
                    strokeOpacity="0.15"
                  />
                  <path
                    d="M110 100 L120 100 L110 170 L80 180 L60 140 L80 100 Z"
                    fill="white"
                    fillOpacity="0.05"
                    stroke="white"
                    strokeWidth="0.5"
                    strokeOpacity="0.15"
                  />
                  <path
                    d="M150 60 L200 30 L200 90 L120 100 L110 100 L120 60 Z"
                    fill="white"
                    fillOpacity="0.05"
                    stroke="white"
                    strokeWidth="0.5"
                    strokeOpacity="0.15"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            EM EXCELENTE COMPANHIA
        ══════════════════════════════════════════════════════════════════ */}
        <section className="px-8 md:px-16 py-24">
          <h2
            className="reveal-title text-white font-black uppercase leading-none mb-2"
            style={{
              fontFamily: "var(--font-darker-grotesque)",
              fontSize: "clamp(40px, 8vw, 110px)",
            }}
          >
            EM EXCELENTE
          </h2>
          <h2
            className="reveal-title text-white font-black uppercase leading-none mb-12"
            style={{
              fontFamily: "var(--font-darker-grotesque)",
              fontSize: "clamp(40px, 8vw, 110px)",
            }}
          >
            COMPANHIA
          </h2>

          <p
            className="reveal-text text-white/50 text-sm mb-16 max-w-xl"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Grandes nomes não acabaram amadorismo. Se eles confirmam a estratégia
            de crescimento delas à AMP, talvez você devesse se perguntar por que a
            sua marca ainda não está aqui.
          </p>

          {/* Marquee animado de logos */}
          <div className="clients-section -mx-8 md:-mx-16">
            <ClientsMarquee />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════════════════════════ */}
        <footer className="px-8 md:px-16 py-16 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <span
            className="font-black text-3xl text-[#FF4D00]"
            style={{ fontFamily: "var(--font-darker-grotesque)" }}
          >
            AMP
          </span>

          <div className="flex flex-col md:flex-row gap-4 md:gap-12 text-white/40 text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-inter)" }}>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Termos de uso</a>
            <a href="#" className="hover:text-white transition-colors">Política de privacidade</a>
          </div>

          <p className="text-white/20 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
            © {new Date().getFullYear()} AMP. Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </SmoothScroll>
  );
}
