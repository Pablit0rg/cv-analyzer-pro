import { jsPDF } from "jspdf";
import type { Rewrite } from "./rewrite.schema";

export const ATS_PDF_FILENAME = "curriculo-ats.pdf";

const MARGIN_X = 20;
const MARGIN_TOP = 20;
const MARGIN_BOTTOM = 20;
const TITLE_FONT_SIZE = 11;
const BODY_FONT_SIZE = 10;
const TITLE_LINE_HEIGHT = 6;
const BODY_LINE_HEIGHT = 5;
const SECTION_SPACING = 4;
const ITEM_SPACING = 1.5;

/**
 * Monta o documento PDF ATS-friendly em coluna única com texto selecionável.
 * Recebe apenas as seções do currículo ajustado; avisos da IA e alertas de
 * fidelidade nunca entram no documento.
 */
export function buildAtsPdf(secoes: Rewrite["secoes"]): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = pageWidth - MARGIN_X * 2;
  const maxY = pageHeight - MARGIN_BOTTOM;

  let cursorY = MARGIN_TOP;

  for (const [sIndex, secao] of secoes.entries()) {
    const titleText = secao.titulo.trim().toUpperCase().normalize("NFC");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(TITLE_FONT_SIZE);
    const titleLines = doc.splitTextToSize(titleText, maxWidth) as string[];
    const titleHeight = titleLines.length * TITLE_LINE_HEIGHT;

    if (cursorY > MARGIN_TOP && cursorY + titleHeight + BODY_LINE_HEIGHT > maxY) {
      doc.addPage();
      cursorY = MARGIN_TOP;
    }

    for (const line of titleLines) {
      if (cursorY + TITLE_LINE_HEIGHT > maxY) {
        doc.addPage();
        cursorY = MARGIN_TOP;
      }
      doc.text(line, MARGIN_X, cursorY);
      cursorY += TITLE_LINE_HEIGHT;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(BODY_FONT_SIZE);

    for (const item of secao.itens) {
      const normalizedItem = `- ${item.trim().normalize("NFC")}`;
      const itemLines = doc.splitTextToSize(normalizedItem, maxWidth) as string[];

      for (const line of itemLines) {
        if (cursorY + BODY_LINE_HEIGHT > maxY) {
          doc.addPage();
          cursorY = MARGIN_TOP;
        }
        doc.text(line, MARGIN_X, cursorY);
        cursorY += BODY_LINE_HEIGHT;
      }

      cursorY += ITEM_SPACING;
    }

    if (sIndex < secoes.length - 1) {
      cursorY += SECTION_SPACING;
    }
  }

  return doc;
}
