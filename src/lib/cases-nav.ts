import { CASES, type CaseStudy } from "@/data/cases";

export function getCaseIndex(slug: string): number {
  return CASES.findIndex((c) => c.slug === slug);
}

export function getAdjacentCases(slug: string): {
  prev: CaseStudy | null;
  next: CaseStudy | null;
} {
  const i = getCaseIndex(slug);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? CASES[i - 1]! : null,
    next: i < CASES.length - 1 ? CASES[i + 1]! : null,
  };
}

export function getCaseGallery(item: CaseStudy): [string, string, string] {
  const g = item.gallery;
  if (g && g.length >= 3) return [g[0]!, g[1]!, g[2]!];
  return [item.image, item.image, item.image];
}
