import { DICTIONARY_BY_ID } from "./dictionary";
import { extractIds } from "./matcher";

/** Technical dictionary terms present in `text` but absent from `original`. */
export function newTechnicalTerms(original: string, text: string): string[] {
  const orig = new Set(extractIds(original));
  const out: string[] = [];
  for (const id of extractIds(text)) {
    if (orig.has(id)) continue;
    const c = DICTIONARY_BY_ID[id];
    if (c && c.type === "tecnica" && !out.includes(c.canonical)) out.push(c.canonical);
  }
  return out;
}
