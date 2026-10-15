import { describe, expect, it } from "vitest";
import { newTechnicalTerms } from "./analysis/fidelity-terms";
import { INVALID_MESSAGE, parseRewrite } from "./rewrite.schema";

describe("fidelidade da reescrita", () => {
  it("sinaliza termo técnico novo", () => {
    expect(newTechnicalTerms("Experiência com React.", "Desenvolvi com React e Docker.")).toContain(
      "Docker",
    );
  });
  it("não sinaliza termo que já estava no currículo", () => {
    expect(newTechnicalTerms("Experiência com React.", "Desenvolvi interfaces em React.")).toEqual(
      [],
    );
  });
});

describe("schema da resposta da IA", () => {
  it("resposta inválida vira erro amigável", () => {
    expect(parseRewrite('{"secoes":"x"}')).toEqual({
      ok: false,
      reason: "invalid",
      message: INVALID_MESSAGE,
    });
    expect(parseRewrite("não é json")).toMatchObject({ ok: false, reason: "invalid" });
  });
  it("resposta válida é aceita", () => {
    const r = parseRewrite('{"secoes":[{"titulo":"Resumo","itens":["Atuei"]}],"avisos":[]}');
    expect(r.ok).toBe(true);
  });
});
