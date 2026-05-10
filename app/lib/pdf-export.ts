import { jsPDF } from "jspdf";
import html2canvas from "html2canvas-pro";
import {
  CARD_H_MM,
  CARD_W_MM,
  CARDS_PER_PAGE,
  COLS,
  cardPositionMm,
  mirroredCol,
} from "./pdf-layout";

const RENDER_SCALE = 3;

async function captureElement(el: HTMLElement): Promise<string> {
  const canvas = await html2canvas(el, {
    scale: RENDER_SCALE,
    backgroundColor: null,
    useCORS: true,
    logging: false,
  });
  return canvas.toDataURL("image/png");
}

function buildPages(
  pdf: jsPDF,
  frontImages: string[],
  backImage: string,
  isFirstPage: boolean
): boolean {
  const pageCount = Math.ceil(frontImages.length / CARDS_PER_PAGE);

  for (let page = 0; page < pageCount; page++) {
    const startIdx = page * CARDS_PER_PAGE;
    const endIdx = Math.min(startIdx + CARDS_PER_PAGE, frontImages.length);
    const pageCards = endIdx - startIdx;

    if (!isFirstPage) pdf.addPage();
    isFirstPage = false;

    for (let i = 0; i < pageCards; i++) {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const { x, y } = cardPositionMm(col, row);
      pdf.addImage(
        frontImages[startIdx + i],
        "PNG",
        x,
        y,
        CARD_W_MM,
        CARD_H_MM
      );
    }

    pdf.addPage();

    for (let i = 0; i < pageCards; i++) {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const { x, y } = cardPositionMm(mirroredCol(col), row);
      pdf.addImage(
        backImage,
        "PNG",
        x,
        y,
        CARD_W_MM,
        CARD_H_MM
      );
    }
  }

  return false;
}

export async function exportToPdf(
  renderContainer: HTMLElement,
  onProgress?: (current: number, total: number) => void
): Promise<void> {
  const roleFronts = renderContainer.querySelectorAll<HTMLElement>(
    '[data-card-front][data-card-type="role"]'
  );
  const ruleFronts = renderContainer.querySelectorAll<HTMLElement>(
    '[data-card-front][data-card-type="rule"]'
  );
  const roleBackEl = renderContainer.querySelector<HTMLElement>(
    '[data-card-back][data-card-type="role"]'
  );
  const ruleBackEl = renderContainer.querySelector<HTMLElement>(
    '[data-card-back][data-card-type="rule"]'
  );

  const totalCaptures = roleFronts.length + ruleFronts.length + 2;
  let done = 0;

  const roleBackImg = roleBackEl
    ? await captureElement(roleBackEl)
    : "";
  done++;
  onProgress?.(done, totalCaptures);

  const ruleBackImg = ruleBackEl
    ? await captureElement(ruleBackEl)
    : "";
  done++;
  onProgress?.(done, totalCaptures);

  const roleFrontImages: string[] = [];
  for (const el of Array.from(roleFronts)) {
    roleFrontImages.push(await captureElement(el));
    done++;
    onProgress?.(done, totalCaptures);
  }

  const ruleFrontImages: string[] = [];
  for (const el of Array.from(ruleFronts)) {
    ruleFrontImages.push(await captureElement(el));
    done++;
    onProgress?.(done, totalCaptures);
  }

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  let isFirst = true;

  if (roleFrontImages.length > 0) {
    isFirst = buildPages(pdf, roleFrontImages, roleBackImg, isFirst);
  }

  if (ruleFrontImages.length > 0) {
    buildPages(pdf, ruleFrontImages, ruleBackImg, isFirst);
  }

  pdf.save("trinkspiel-karten.pdf");
}
