import { DICTIONARY, type Competency } from "./dictionary";
import { normalizeBase, singularize, tokenize } from "./normalize";

interface Pattern {
  id: string;
  tokens: string[];
}

interface Index {
  exempt: Set<string>;
  slashTokens: Set<string>;
  patterns: Pattern[];
}

function buildIndex(dict: Competency[]): Index {
  const exempt = new Set<string>();
  const slashTokens = new Set<string>();
  for (const c of dict) {
    for (const v of c.variants) {
      const n = normalizeBase(v);
      if (!n.includes(" ")) exempt.add(n);
      if (n.includes("/") && !n.includes(" ")) slashTokens.add(n);
    }
  }
  const patterns: Pattern[] = [];
  const seen = new Set<string>();
  for (const c of dict) {
    for (const v of c.variants) {
      const tokens = tokenize(normalizeBase(v), slashTokens).map((t) => singularize(t, exempt));
      if (tokens.length === 0) continue;
      const key = `${c.id}|${tokens.join(" ")}`;
      if (seen.has(key)) continue;
      seen.add(key);
      patterns.push({ id: c.id, tokens });
    }
  }
  // Compound terms first, then longer strings; stable tie-break by key.
  patterns.sort(
    (a, b) =>
      b.tokens.length - a.tokens.length ||
      b.tokens.join(" ").length - a.tokens.join(" ").length ||
      (a.tokens.join(" ") + a.id).localeCompare(b.tokens.join(" ") + b.id),
  );
  return { exempt, slashTokens, patterns };
}

const INDEX = buildIndex(DICTIONARY);

export function textToTokens(text: string): string[] {
  return tokenize(normalizeBase(text), INDEX.slashTokens).map((t) => singularize(t, INDEX.exempt));
}

/** Returns dictionary ids found in the text, in order of first appearance. */
export function extractIds(text: string): string[] {
  const tokens = textToTokens(text);
  const consumed = new Array<boolean>(tokens.length).fill(false);
  const found: string[] = [];
  const foundSet = new Set<string>();
  for (let i = 0; i < tokens.length; i++) {
    if (consumed[i]) continue;
    for (const p of INDEX.patterns) {
      const n = p.tokens.length;
      if (i + n > tokens.length) continue;
      let ok = true;
      for (let k = 0; k < n; k++) {
        if (consumed[i + k] || tokens[i + k] !== p.tokens[k]) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;
      for (let k = 0; k < n; k++) consumed[i + k] = true;
      if (!foundSet.has(p.id)) {
        foundSet.add(p.id);
        found.push(p.id);
      }
      break;
    }
  }
  return found;
}
