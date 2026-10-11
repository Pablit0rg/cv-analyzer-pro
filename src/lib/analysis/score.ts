import { DICTIONARY_BY_ID, type CompetencyType } from "./dictionary";
import { extractIds } from "./matcher";
import { splitSections, type Level } from "./sections";

export interface KeywordResult {
  id: string;
  canonical: string;
  type: CompetencyType;
  level: Level;
  found: boolean;
  suggestion: string;
}

export interface AnalysisResult {
  keywords: KeywordResult[];
  /** null when the job has no recognized keyword. */
  match: number | null;
}

export const WEIGHTS: Record<Level, number> = { obrigatoria: 2, desejavel: 1 };

export function analyze(job: string, resume: string): AnalysisResult {
  const levels = new Map<string, Level>();
  for (const block of splitSections(job)) {
    for (const id of extractIds(block.text)) {
      const prev = levels.get(id);
      if (prev === "obrigatoria") continue;
      levels.set(id, block.level);
    }
  }
  const inResume = new Set(extractIds(resume));
  const keywords: KeywordResult[] = Array.from(levels.entries()).map(([id, level]) => {
    const c = DICTIONARY_BY_ID[id];
    return {
      id,
      canonical: c.canonical,
      type: c.type,
      level,
      found: inResume.has(id),
      suggestion: c.suggestion,
    };
  });
  keywords.sort(
    (a, b) =>
      (a.level === b.level ? 0 : a.level === "obrigatoria" ? -1 : 1) ||
      a.canonical.localeCompare(b.canonical, "pt-BR"),
  );
  const total = keywords.reduce((s, k) => s + WEIGHTS[k.level], 0);
  if (total === 0) return { keywords, match: null };
  const got = keywords.filter((k) => k.found).reduce((s, k) => s + WEIGHTS[k.level], 0);
  return { keywords, match: Math.round((got / total) * 100) };
}
