import { DICTIONARY_BY_ID } from "./dictionary";
import { extractIds } from "./matcher";

/** Competencies present in the adjusted resume but absent from the original. */
export function checkFidelity(original: string, adjusted: string): string[] {
  const orig = new Set(extractIds(original));
  return extractIds(adjusted)
    .filter((id) => !orig.has(id))
    .map((id) => DICTIONARY_BY_ID[id].canonical);
}
