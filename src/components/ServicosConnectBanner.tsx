import { figmaClamp } from "@/lib/figma-scale";

const SIDE_PAD = "clamp(24px, 1.75vw, 36px)";

const HEADLINE_SIZE = figmaClamp(120, { min: 28, max: 96, vw: 5.4 });
const BODY_SIZE = figmaClamp(38, { min: 15, max: 30, vw: 1.65 });

/** Banner “Quando tudo isso se conecta” — Figma 2:1003 (~1866×587 @ margem 30px). */
export default function ServicosConnectBanner() {
  return (
    <section className="w-full overflow-visible bg-white py-10 md:py-14">
      <div className="w-full" style={{ paddingLeft: SIDE_PAD, paddingRight: SIDE_PAD }}>
        <div className="w-full rounded-[35px] border-[3px] border-[#232323]/15 md:grid md:min-h-[clamp(280px,22vw,520px)] md:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
          <div className="relative flex min-h-[240px] flex-col justify-center overflow-hidden rounded-t-[32px] bg-[var(--cream)] p-6 md:min-h-0 md:rounded-l-[32px] md:rounded-tr-none md:p-8 lg:px-10 lg:py-12">
            <p
              className="font-black uppercase leading-[0.75] tracking-[-0.04em] text-[var(--orange)]"
              style={{
                fontFamily: "var(--font-darker-grotesque)",
                fontSize: HEADLINE_SIZE,
              }}
            >
              <span className="block">Quando</span>
              <span className="block">tudo</span>
              <span className="block md:pl-[clamp(1.5rem,8vw,7rem)]">isso se</span>
              <span className="block">conecta,</span>
            </p>
          </div>

          <div className="box-border flex min-w-0 flex-col justify-center rounded-b-[32px] border-[3px] border-[var(--orange)] bg-[var(--cream)] p-6 md:rounded-bl-none md:rounded-r-[32px] md:border-l-0 md:p-8 lg:px-10 lg:py-12">
            <p
              className="font-semibold leading-[1.45] text-[#232323]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: BODY_SIZE,
              }}
            >
              o marketing deixa de ser uma soma de entregas e passa a operar como um sistema.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
