"use client";

import Navbar from "@/components/Navbar";

/* ── Social icons (footer) ──────────────────────────────────────────────── */
function IgIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
function FbIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M14 8h3V5h-3c-2.2 0-4 1.8-4 4v3H7v3h3v8h3v-8h3l1-3h-4V9c0-.6.4-1 1-1z" />
    </svg>
  );
}
function YtIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M21.6 7.2s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.2 4 12 4 12 4s-4.2 0-6.8.3c-.4 0-1.2 0-2 .9-.6.6-.8 2-.8 2S2 9 2 10.8v2.4c0 1.8.2 3.6.2 3.6s.2 1.4.8 2c.8.8 1.9.8 2.4.9 1.8.2 7.6.2 7.6.2s4.2 0 6.8-.3c.4 0 1.2 0 2-.9.6-.6.8-2 .8-2s.2-1.8.2-3.6v-2.4c0-1.8-.2-3.6-.2-3.6zM10 14.5V8.5L15.2 11.5 10 14.5z" />
    </svg>
  );
}
function LiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M5 3a2 2 0 100 4 2 2 0 000-4zm-2 7h4v11H3V10zm7 0h3.8v1.5h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6v5.5h-4v-4.9c0-1.2 0-2.7-1.7-2.7-1.7 0-2 1.3-2 2.7V21h-4V10z" />
    </svg>
  );
}
function BeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M7.8 5.6h5.5c1.5 0 2.8 1 2.8 2.5 0 1.2-.6 2-1.5 2.4 1.3.4 2.2 1.4 2.2 3 0 2.2-1.7 3.5-4 3.5H7.8V5.6zm2.4 4.3h2.4c.9 0 1.5-.4 1.5-1.2 0-.8-.6-1.2-1.5-1.2h-2.4v2.4zm0 4.4h2.8c1 0 1.7-.5 1.7-1.5s-.7-1.5-1.8-1.5h-2.7V14.3zM18.4 9.2h4.1v1.5h-4.1V9.2z" />
    </svg>
  );
}

const FOOTER_SOCIAL = [
  { label: "Instagram", Icon: IgIcon, href: "https://instagram.com" },
  { label: "Facebook", Icon: FbIcon, href: "https://facebook.com" },
  { label: "YouTube", Icon: YtIcon, href: "https://youtube.com" },
  { label: "LinkedIn", Icon: LiIcon, href: "https://linkedin.com" },
  { label: "Behance", Icon: BeIcon, href: "https://behance.net" },
];

export default function Home() {
  return (
    <div className="relative flex h-[100svh] w-full flex-col overflow-hidden bg-[#FF5B00]">
      <Navbar />

      {/* spacer sob a navbar fixed (py-6 + h-10 ≈ 88px em desktop) */}
      <div aria-hidden className="h-[72px] shrink-0 md:h-[88px]" />

      {/* ── 10 ANOS ─────────────────────────────────────────────────────── */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <svg
          viewBox="0 0 1872 836"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="10 Anos"
        >
          <defs>
            <clipPath id="anos-clip">
              <path d="M1832.21 196.326C1805.65 133.77 1765.37 85.4181 1711.28 51.2703C1657.29 17.0253 1588.51 0 1504.94 0L1005.17 1.75117C928.412 3.98877 863.229 19.652 812.445 51.8541C757.867 86.4883 717.882 134.84 692.101 197.007C666.514 259.173 653.77 332.43 653.77 416.876C653.77 433.998 655.813 450.537 656.883 467.27H638.788V0.583723H193.504C190.683 39.4986 180.468 71.8952 162.956 91.8391C145.347 111.783 125.209 125.5 102.541 133.089C79.7755 140.677 58.6642 144.277 39.2067 143.79C19.7493 143.304 6.71282 142.137 0.0972871 140.288V441.489C4.86436 441.489 15.2741 441.003 31.3265 440.127C47.3789 439.154 65.2797 434.874 84.7371 427.285C104.195 419.697 122.29 405.688 138.829 385.355C155.368 364.924 166.653 335.349 172.296 296.434V467.368H0V835.016H744.15V721.093C744.441 721.384 744.539 721.774 744.831 722.163C802.717 794.155 890.08 830.735 1005.17 834.043L1504.94 835.308C1588.41 835.308 1657.19 817.796 1711.28 782.675C1765.37 747.555 1805.65 698.522 1832.21 635.383C1858.77 572.34 1872 499.472 1872 416.973C1872 334.473 1858.67 258.978 1832.21 196.423V196.326ZM1802.93 509.688C1790.38 513.871 1775.59 516.011 1758.56 516.011C1741.54 516.011 1737.06 514.844 1726.65 512.314C1716.24 509.785 1706.81 505.796 1698.44 500.251C1690.07 494.705 1683.36 487.506 1678.2 478.653C1677.72 477.875 1677.62 476.026 1677.13 474.956C1670.03 486.922 1661.67 497.721 1649.5 504.726C1635.11 513.093 1617.3 517.276 1596 517.276C1564.28 517.276 1540.06 508.228 1523.32 490.23C1518.75 485.268 1516.32 478.653 1512.91 472.718V512.509H1405.31L1386.25 430.301H1385.56V512.509H1300.44L1287.99 464.644H1224.36L1212.1 512.509H1161.12L1216.19 321.34H1294.02L1336.34 463.282V321.34H1446.47L1462.71 405.007H1463.39V321.34H1513.01V360.838C1520.11 348.483 1528.97 337.587 1541.71 330.29C1556.21 322.021 1574.3 317.837 1596.09 317.837C1627.81 317.837 1651.94 326.885 1668.38 344.883C1673.15 350.039 1675.67 356.849 1679.08 362.978C1680.93 355.682 1682.48 348.288 1687.35 342.645C1694.16 334.765 1703.79 328.636 1716.24 324.355C1728.7 320.075 1743.68 317.837 1761.09 317.837C1778.51 317.837 1788.33 320.367 1800.69 325.328C1813.04 330.29 1823.16 337.878 1830.94 348.094C1838.73 358.309 1842.72 382.436 1842.72 398.099H1796.89H1782.5C1782.5 394.791 1781.62 392.165 1779.97 390.122C1778.31 388.079 1776.07 386.522 1773.35 385.452C1770.63 384.382 1767.81 383.701 1764.79 383.311C1761.77 382.922 1759.05 382.825 1756.62 382.728C1738.72 382.436 1737.06 393.429 1750.97 396.348C1758.27 397.905 1766.25 399.753 1774.91 401.407C1783.66 403.158 1792.32 405.201 1800.88 407.731C1809.44 410.26 1817.23 413.665 1824.13 418.14C1831.04 422.518 1836.39 428.355 1840.38 435.652C1844.37 442.851 1845.93 452.191 1844.95 463.476C1844.27 474.567 1840.19 484.004 1832.89 491.884C1825.5 499.667 1815.57 505.699 1803.02 509.882L1802.93 509.688Z" />
            </clipPath>
          </defs>

          {/* Vídeo recortado pelo shape "10 ANOS" */}
          <foreignObject x="0" y="0" width="1872" height="836" clipPath="url(#anos-clip)">
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            >
              <source src="/assets/VIDEO_COMPILADO_2.mp4" type="video/mp4" />
            </video>
          </foreignObject>
        </svg>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer
        className="shrink-0 border-t border-black/10 px-6 py-3 md:px-12 md:py-4"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Copyright */}
          <p className="text-[11px] leading-snug text-white md:text-xs">
            Agência AMP ® 2026
            <br />
            Todos os direitos reservados.
          </p>

          {/* Endereço */}
          <p className="hidden text-center text-[11px] text-white md:block md:text-xs">
            Rua Andrea Limongi, N16 - Parque Dez de Novembro | Manaus - AM
          </p>

          {/* Redes sociais */}
          <div className="flex gap-1.5 sm:gap-2">
            {FOOTER_SOCIAL.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-7 w-7 items-center justify-center border border-white/50 text-white transition-opacity hover:opacity-70 md:h-8 md:w-8"
              >
                <Icon />
              </a>
            ))}
          </div>

          {/* Contato */}
          <div className="text-right text-[11px] text-white md:text-xs">
            <span className="block font-medium">Fale conosco</span>
            <a
              href="tel:+5592992345678"
              className="transition-opacity hover:opacity-75"
            >
              +55 92 99234-5678
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
