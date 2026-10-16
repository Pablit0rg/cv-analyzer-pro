import { createElement } from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { jsPDF } from "jspdf";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AdjustedResumeTab } from "@/components/crivo/AdjustedResumeTab";
import { ATS_PDF_FILENAME, buildAtsPdf } from "./pdf";

vi.mock("@tanstack/react-start", () => ({
  createServerFn: () => {
    let validate: ((input: unknown) => unknown) | undefined;
    const setValidator = <T>(fn: (input: unknown) => T) => {
      validate = fn;
      return {
        handler: <R>(handlerFn: (ctx: { data: T }) => Promise<R>) => {
          return async (opts: { data: unknown }): Promise<R> => {
            const parsed = validate ? (validate(opts.data) as T) : (opts.data as T);
            return handlerFn({ data: parsed });
          };
        },
      };
    };
    return {
      validator: setValidator,
      inputValidator: setValidator,
    };
  },
  useServerFn: <T>(fn: T): T => fn,
}));

const originalApiKey = process.env["LOVABLE_API_KEY"];

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  delete (jsPDF.API as unknown as { save?: unknown }).save;
  if (originalApiKey === undefined) {
    delete process.env["LOVABLE_API_KEY"];
  } else {
    process.env["LOVABLE_API_KEY"] = originalApiKey;
  }
});

describe("buildAtsPdf — montagem do PDF do currículo ajustado", () => {
  it("contém o texto real das seções (selecionável, sem imagem)", () => {
    const doc = buildAtsPdf([
      {
        titulo: "Resumo",
        itens: ["Desenvolvedor front-end focado em React e TypeScript."],
      },
      {
        titulo: "Habilidades",
        itens: ["React, TypeScript, Git e PostgreSQL."],
      },
    ]);

    const rawPdf = doc.output();

    expect(rawPdf).toContain("(RESUMO) Tj");
    expect(rawPdf).toContain("(HABILIDADES) Tj");
    expect(rawPdf).toContain("(- Desenvolvedor front-end focado em React e TypeScript.) Tj");
    expect(rawPdf).toContain("(- React, TypeScript, Git e PostgreSQL.) Tj");
    expect(rawPdf).not.toContain("/Subtype /Image");
  });

  it("preserva palavras acentuadas do português (incluindo entrada em NFD e NFC)", () => {
    const nfdWord = "integra\u0063\u0327\u0061\u0303o"; // "integração" em NFD
    const doc = buildAtsPdf([
      {
        titulo: "Experiência e Formação Acadêmica",
        itens: [
          `Atuação em São Paulo com ${nfdWord} contínua, manutenção e resolução de problemas em produção.`,
        ],
      },
    ]);

    const rawPdf = doc.output();

    expect(rawPdf).toContain("(EXPERIÊNCIA E FORMAÇÃO ACADÊMICA) Tj");
    expect(rawPdf).toContain("Atuação em São Paulo com integração contínua");
    expect(rawPdf).toContain("manutenção e resolução de problemas em produção.");
  });

  it("quebra automaticamente para mais de uma página quando o conteúdo é longo", () => {
    const itensLongos = Array.from(
      { length: 45 },
      (_, i) =>
        `Implementei melhorias contínuas no módulo ${i + 1} utilizando React, TypeScript, Node.js e testes automatizados em ambiente de integração contínua.`,
    );

    const doc = buildAtsPdf([
      {
        titulo: "Experiência Profissional",
        itens: itensLongos,
      },
    ]);

    expect(doc.getNumberOfPages()).toBeGreaterThan(1);
  });

  it("não inclui avisos de fidelidade nem avisos da IA no documento e exibe botão só após gerar", async () => {
    process.env["LOVABLE_API_KEY"] = "test-key";
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: JSON.stringify({
                  secoes: [
                    {
                      titulo: "Experiência",
                      itens: ["Desenvolvi aplicações com React e Docker."],
                    },
                  ],
                  avisos: ["Verifique as datas de início e término da experiência."],
                }),
              },
            },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );

    let savedDocOutput = "";
    let savedFilename = "";
    (jsPDF.API as unknown as { save?: (filename?: string) => jsPDF }).save = function (
      this: jsPDF,
      filename?: string,
    ) {
      savedFilename = filename ?? "";
      savedDocOutput = this.output();
      return this;
    };

    render(
      createElement(AdjustedResumeTab, {
        job: "Requisitos: React e Docker.",
        resume: "Experiência de 2 anos com React.",
      }),
    );

    expect(screen.queryByRole("button", { name: "Exportar PDF" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Gerar versão ATS" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Exportar PDF" })).toBeInTheDocument();
    });

    expect(
      screen.getByText(/Confira: este termo não estava no seu currículo \(Docker\)/),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Verifique as datas de início e término da experiência."),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Exportar PDF" }));

    expect(savedFilename).toBe(ATS_PDF_FILENAME);
    expect(savedDocOutput).toContain("(- Desenvolvi aplicações com React e Docker.) Tj");
    expect(savedDocOutput).not.toContain("Confira: este termo não estava no seu currículo");
    expect(savedDocOutput).not.toContain("Avisos da IA");
    expect(savedDocOutput).not.toContain("Verifique as datas de início e término da experiência.");
  });
});
