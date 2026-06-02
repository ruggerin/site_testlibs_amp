"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { figmaAspect } from "@/lib/figma-scale";

const MAP_SRC = "/assets/quem_somos/mapa_norte1.svg";

/** Ordem dos `<path>` no SVG exportado do Figma. */
const PATH_STATE_BY_INDEX = [
  "acre",
  "amapá",
  "amazonas",
  "pará",
  "rondônia",
  "roraima",
  "pará",
  "amazonas",
] as const;

export type NorteStateId =
  | "acre"
  | "amapá"
  | "amazonas"
  | "pará"
  | "rondônia"
  | "roraima";

type NorteBrasilMapProps = {
  highlighted: NorteStateId;
  onHighlight: (state: NorteStateId | null) => void;
  className?: string;
  style?: React.CSSProperties;
};

function mapPathRole(pathIndex: number): "region" | "amazonas" | "label" {
  if (pathIndex === 2) return "amazonas";
  if (pathIndex === 7) return "label";
  return "region";
}

/** Remove máscara do Figma — o `<path>` interno quebrava a indexação dos estados. */
function prepareSvgSource(svgText: string, clipId: string): string {
  return svgText
    .replace(/<mask[\s\S]*?<\/mask>\s*/g, "")
    .replace(/\s*mask="[^"]*"/g, "")
    .replace(/id="clip0_1_111"/, `id="${clipId}"`)
    .replace(/url\(#clip0_1_111\)/g, `url(#${clipId})`);
}

function injectMapInteractivity(svgText: string, clipId: string): string {
  let pathIndex = 0;
  return prepareSvgSource(svgText, clipId).replace(/<path /g, () => {
    const state = PATH_STATE_BY_INDEX[pathIndex];
    const role = mapPathRole(pathIndex);
    pathIndex += 1;
    const isLabel = role === "label";
    return `<path data-state="${state}" data-map-role="${role}"${isLabel ? ' data-map-label="true"' : ""} class="norte-map-path" `;
  });
}

function applyHighlight(root: HTMLElement, highlighted: NorteStateId) {
  root.querySelectorAll<SVGPathElement>(".norte-map-path").forEach((path) => {
    const state = path.getAttribute("data-state") as NorteStateId | null;
    const role = path.getAttribute("data-map-role");
    const isLabel = role === "label" || path.hasAttribute("data-map-label");
    const active = state === highlighted;
    const strokeW = active ? "6" : "3";

    if (isLabel) {
      path.style.pointerEvents = "none";
      path.style.fill = active ? "#232332" : "transparent";
      return;
    }

    path.style.cursor = "pointer";
    path.style.pointerEvents = "all";
    path.style.stroke = "#FF5B00";
    path.style.transition = "fill 0.25s ease, stroke-width 0.25s ease";

    if (role === "amazonas") {
      path.style.fill = active ? "#FF5B00" : "transparent";
      path.style.strokeWidth = strokeW;
      path.style.strokeLinejoin = "round";
      path.style.paintOrder = "stroke fill";
      return;
    }

    path.style.fill = active ? "#FF5B00" : "transparent";
    path.style.strokeWidth = strokeW;
  });
}

export default function NorteBrasilMap({
  highlighted,
  onHighlight,
  className = "",
  style,
}: NorteBrasilMapProps) {
  const clipId = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgHtml, setSvgHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(MAP_SRC)
      .then((r) => r.text())
      .then((text) => {
        if (!cancelled) setSvgHtml(injectMapInteractivity(text, clipId));
      })
      .catch(() => {
        if (!cancelled) setSvgHtml(null);
      });
    return () => {
      cancelled = true;
    };
  }, [clipId]);

  const bindRegionEvents = useCallback(() => {
    const root = containerRef.current;
    if (!root) return;

    const paths = root.querySelectorAll<SVGPathElement>(".norte-map-path[data-state]");
    const cleanups: (() => void)[] = [];

    paths.forEach((path) => {
      if (path.hasAttribute("data-map-label")) return;

      const enter = () => {
        const state = path.getAttribute("data-state") as NorteStateId | null;
        if (state) onHighlight(state);
      };

      path.addEventListener("mouseenter", enter);
      cleanups.push(() => path.removeEventListener("mouseenter", enter));
    });

    return () => cleanups.forEach((fn) => fn());
  }, [onHighlight]);

  useEffect(() => {
    if (!svgHtml || !containerRef.current) return;

    applyHighlight(containerRef.current, highlighted);
    return bindRegionEvents();
  }, [svgHtml, bindRegionEvents]);

  useEffect(() => {
    if (!containerRef.current) return;
    applyHighlight(containerRef.current, highlighted);
  }, [highlighted]);

  if (!svgHtml) {
    return (
      <div
        className={`map-svg bg-[#232323]/40 ${className}`}
        style={{
          aspectRatio: figmaAspect(1227, 829),
          ...style,
        }}
        aria-hidden
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`map-svg [&_svg]:h-auto [&_svg]:w-full ${className}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: svgHtml }}
      role="img"
      aria-label="Mapa interativo da região Norte do Brasil"
    />
  );
}
