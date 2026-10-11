/** Lowercase, strip accents, collapse whitespace. No plural handling. */
export function normalizeBase(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Simple plural handling: only alphabetic tokens with 5+ letters that are not an
 * exact dictionary variant, ending in a single "s" (not "ss"), lose the "s".
 * Short tokens (js, ts, css, aws, ios) and exact variants (devops, kubernetes,
 * sass) are never touched.
 */
export function singularize(token: string, exempt: ReadonlySet<string>): string {
  if (token.length < 5) return token;
  if (!/^[a-z]+$/.test(token)) return token;
  if (exempt.has(token)) return token;
  if (token.endsWith("s") && !token.endsWith("ss")) return token.slice(0, -1);
  return token;
}

/**
 * Splits normalized text into tokens. Keeps symbols that belong to terms
 * (. # + /) and drops other punctuation. A token containing "/" is kept whole
 * only when it is a known term (e.g. ci/cd); otherwise it is split.
 */
export function tokenize(normalized: string, knownSlashTokens: ReadonlySet<string>): string[] {
  const raw = normalized.split(/[^a-z0-9.#+/]+/).filter(Boolean);
  const out: string[] = [];
  for (let t of raw) {
    // trailing sentence punctuation and stray slashes
    t = t.replace(/[./]+$/, "").replace(/^\/+/, "");
    // leading dot only for things like ".net"
    if (t.startsWith(".") && !/^\.[a-z]/.test(t)) t = t.replace(/^\.+/, "");
    if (!t) continue;
    if (t.includes("/") && !knownSlashTokens.has(t)) {
      for (const part of t.split("/")) if (part) out.push(part);
    } else {
      out.push(t);
    }
  }
  return out;
}
