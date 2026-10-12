import { normalizeBase } from "./normalize";

export type Level = "obrigatoria" | "desejavel";

const DESEJAVEL = /^(diferencia|desejave|desejado|sera um plus|e um plus|plus|nice to have|bonus|seria legal)/;
const OBRIGATORIA = /^(requisito|obrigatori|o que esperamos|qualificac|pre-requisito|pre requisito|exigencia|must have|o que voce precisa)/;

function classify(heading: string): Level | null {
  const h = normalizeBase(heading).replace(/^[#*\-•\s]+/, "").replace(/[:*\s]+$/, "");
  if (DESEJAVEL.test(h)) return "desejavel";
  if (OBRIGATORIA.test(h)) return "obrigatoria";
  return null;
}

/**
 * Splits a job description into blocks tagged by level, based on headings such
 * as "Requisitos" or "Diferenciais". Text before any heading, or a description
 * with no recognizable headings, is treated as required.
 */
export function splitSections(job: string): { level: Level; text: string }[] {
  const blocks: { level: Level; text: string }[] = [];
  let current: Level = "obrigatoria";
  let buf: string[] = [];
  const flush = () => {
    if (buf.length) blocks.push({ level: current, text: buf.join("\n") });
    buf = [];
  };
  for (const line of job.split(/\r?\n/)) {
    const trimmed = line.trim();
    // "Desejável: Docker e AWS" — heading with inline content
    const inline = trimmed.match(/^([^:]{1,40}):(.*)$/);
    if (inline) {
      const lvl = classify(inline[1] ?? "");
      if (lvl) {
        flush();
        current = lvl;
        const rest = inline[2] ?? "";
        if (rest.trim()) buf.push(rest);
        continue;
      }
    }
    if (trimmed.length > 0 && trimmed.length <= 60) {
      const lvl = classify(trimmed);
      if (lvl) {
        flush();
        current = lvl;
        continue;
      }
    }
    buf.push(line);
  }
  flush();
  return blocks;
}
