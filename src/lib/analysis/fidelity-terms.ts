import { DICTIONARY_BY_ID } from "./dictionary";
import { extractIds } from "./matcher";

const NUMBER_RE = /(?<![\p{L}\p{N}_])\d+(?:[.,/]\d+)*%?(?![\p{L}\p{N}_])/gu;

function extractNumbers(text: string): string[] {
  return text.match(NUMBER_RE) ?? [];
}

/**
 * Technical dictionary terms and numbers (years, percentages, quantities, dates)
 * present in `text` but absent from `original` (the original resume only).
 */
export function newTechnicalTerms(original: string, text: string): string[] {
  const orig = new Set(extractIds(original));
  const out: string[] = [];
  for (const id of extractIds(text)) {
    if (orig.has(id)) continue;
    const c = DICTIONARY_BY_ID[id];
    if (c && c.type === "tecnica" && !out.includes(c.canonical)) out.push(c.canonical);
  }

  const origNumbers = new Set(extractNumbers(original));
  for (const year of original.match(/\b\d{4}\b/g) ?? []) {
    origNumbers.add(year);
  }
  for (const num of extractNumbers(text)) {
    if (!origNumbers.has(num) && !out.includes(num)) out.push(num);
  }

  return out;
}
