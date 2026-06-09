"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { figmaAspect } from "@/lib/figma-scale";

const MAP_SRC = "/assets/quem_somos/mapa_norte1.svg";

/** Ordem confirmada via debug-map.html */
const PATH_STATE_BY_INDEX = [
  "acre",      // 0
  "amapá",     // 1
  "pará",      // 2
  "roraima",   // 3
  "rondônia",  // 4
  "amazonas",  // 5 — contorno principal
  "amazonas",  // 6 — label "AM"
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
  style?: CSSProperties;
};

function mapPathRole(pathIndex: number): "region" | "amazonas" | "label" {
  if (pathIndex === 5) return "amazonas";
  if (pathIndex === 6) return "label";
  return "region";
}

function prepareSvgSource(svgText: string, clipId: string): string {
  return svgText
    .replace(/<mask[\s\S]*?<\/mask>\s*/g, "")
    .replace(/\s*mask="[^"]*"/g, "")
    .replace(/id="clip0_1_111"/, `id="${clipId}"`)
    .replace(/url\(#clip0_1_111\)/g, `url(#${clipId})`);
}

/**
 * Injeta atributos data-* e classe `norte-map-path` em cada <path>.
 * O estado inicial (amazonas) recebe `is-active` direto no HTML.
 * `pointer-events="all"` como atributo SVG garante que toda a área geométrica
 * do path (inclusive interior transparente) aciona eventos de mouse — CSS
 * pointer-events sozinho não é suficiente quando o fill é transparente.
 */
function injectMapInteractivity(svgText: string, clipId: string): string {
  let pathIndex = 0;
  return prepareSvgSource(svgText, clipId).replace(/<path /g, () => {
    const state = PATH_STATE_BY_INDEX[pathIndex];
    const role = mapPathRole(pathIndex);
    const isLabel = role === "label";
    const isActive = state === "amazonas"; // sede sempre ativa no carregamento
    pathIndex += 1;
    const pe = isLabel ? 'pointer-events="none"' : 'pointer-events="all"';
    return `<path ${pe} data-state="${state}" data-map-role="${role}"${isLabel ? ' data-map-label="true"' : ""} class="norte-map-path${isActive ? " is-active" : ""}" `;
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

  // Fetch único — estado default baked no HTML (sem animação de entrada)
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

  // Delegação via mouseover no container — mais confiável que mouseenter por path
  // porque o evento borbulha e captura qualquer target dentro do SVG.
  const bindEvents = useCallback(() => {
    const root = containerRef.current;
    if (!root) return;
    const handleOver = (e: Event) => {
      const target = (e as MouseEvent).target as Element | null;
      if (!target) return;
      const path = target.closest<SVGPathElement>(".norte-map-path");
      if (!path || path.hasAttribute("data-map-label")) return;
      const state = path.getAttribute("data-state") as NorteStateId | null;
      if (state) onHighlight(state);
    };
    root.addEventListener("mouseover", handleOver);
    return () => root.removeEventListener("mouseover", handleOver);
  }, [onHighlight]);

  useEffect(() => {
    if (!svgHtml) return;
    return bindEvents();
  }, [svgHtml, bindEvents]);

  // Sincroniza is-active → CSS transition anima automaticamente
  useEffect(() => {
    const root = containerRef.current;
    if (!root || !svgHtml) return;
    root.querySelectorAll<SVGPathElement>(".norte-map-path").forEach((path) => {
      path.classList.toggle("is-active", path.getAttribute("data-state") === highlighted);
    });
  }, [svgHtml, highlighted]);

  if (!svgHtml) {
    return (
      <div
        className={`map-svg bg-[#232323]/40 ${className}`}
        style={{ aspectRatio: figmaAspect(1227, 829), ...style }}
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
