import ClientsMarquee from "@/components/ClientsMarquee";
import { figmaClamp } from "@/lib/figma-scale";

/** Frame sec3 — Figma Quem Somos (1920×2141, fill #F7F7F7). */
const CLIENTS_ARTBOARD_W = 1920;
const CLIENTS_SECTION_H = 2141;

const NAV_OFFSET = "clamp(5rem, 9svh, 6rem)";

const CLIENTS_TITLE_FONT = figmaClamp(250, { min: 40, max: 250 });
const CLIENTS_COPY_FONT = figmaClamp(28, { min: 15, max: 28 });

const CLIENTS_COPY =
  "Grandes marcas não aceitam amadorismo. Se elas confiam a estratégia de crescimento à AMP, talvez você devesse se perguntar por que a sua marca ainda não está aqui.";

const TITLE_STYLE = {
  fontFamily: "var(--font-darker-grotesque)",
  fontSize: CLIENTS_TITLE_FONT,
  lineHeight: 0.82,
  letterSpacing: "-0.06em",
} as const;

export default function ClientsSection() {
  return (
    <section
      data-section
      className="clients-section relative w-full max-w-[100vw] overflow-x-clip overflow-y-visible bg-[#f7f7f7] text-[var(--ink)]"
      style={{
        minHeight: `max(calc(100vw * ${CLIENTS_SECTION_H} / ${CLIENTS_ARTBOARD_W}), calc(100svh + ${NAV_OFFSET}))`,
        paddingTop: NAV_OFFSET,
        paddingBottom: "clamp(2rem, 5vw, 5rem)",
      }}
    >
      <div
        className="relative w-full"
        style={{
          marginLeft: "clamp(-32px, -1.67vw, 0px)",
          width: "calc(100% + clamp(0px, 1.67vw, 32px))",
        }}
      >
        {/* Títulos — posições do grupo sec3 (1:131) */}
        <div
          className="clients-title relative z-10 flex w-full flex-col gap-[clamp(0.75rem,1.6vw,2.25rem)] overflow-visible"
        >
          <h2
            className="clients-title-1 block font-black uppercase whitespace-nowrap text-right md:ml-[25.83%] md:w-[75.2%]"
            style={TITLE_STYLE}
          >
            Em excelente
          </h2>
          <h2
            className="clients-title-2 block font-black uppercase whitespace-nowrap text-left md:max-w-[63.4%]"
            style={TITLE_STYLE}
          >
            companhia
          </h2>
        </div>

        <p
          className="clients-sub relative z-20 mt-[clamp(2.5rem,4.5vw,5.5rem)] w-full font-medium text-[var(--ink)]/85
                     md:ml-[46.875%] md:max-w-[44.58%] md:pr-6"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: CLIENTS_COPY_FONT,
            lineHeight: 1.607,
          }}
        >
          {CLIENTS_COPY}
        </p>

        <div className="relative z-0 mt-[clamp(2rem,7.3vw,8.75rem)] w-[96.67%] max-w-none">
          <ClientsMarquee variant="prototype" />
        </div>
      </div>
    </section>
  );
}
