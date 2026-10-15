import { z } from "zod";

export const RewriteSchema = z.object({
  secoes: z
    .array(z.object({ titulo: z.string().min(1), itens: z.array(z.string()) }))
    .min(1),
  avisos: z.array(z.string()),
});
export type Rewrite = z.infer<typeof RewriteSchema>;

export type RewriteResult =
  | { ok: true; data: Rewrite }
  | { ok: false; reason: "limit" | "invalid" | "error"; message: string };

export const INVALID_MESSAGE =
  "A IA devolveu uma resposta em formato inesperado. Tente gerar novamente.";

/** Parses raw model text into a validated Rewrite, or a friendly error. */
export function parseRewrite(raw: string): RewriteResult {
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return { ok: false, reason: "invalid", message: INVALID_MESSAGE };
  }
  const parsed = RewriteSchema.safeParse(json);
  if (!parsed.success) return { ok: false, reason: "invalid", message: INVALID_MESSAGE };
  return { ok: true, data: parsed.data };
}
