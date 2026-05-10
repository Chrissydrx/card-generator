import { describe, expect, it } from "vitest";
import {
  A4_H_MM,
  A4_W_MM,
  CARD_H_MM,
  CARD_W_MM,
  COLS,
  GAP_MM,
  GRID_H,
  GRID_W,
  MARGIN_X,
  MARGIN_Y,
  ROWS,
  cardPositionMm,
  mirroredCol,
} from "./pdf-layout";

describe("pdf-layout", () => {
  it("centers the grid with symmetric margins on A4", () => {
    expect(GRID_W).toBe(COLS * CARD_W_MM + (COLS - 1) * GAP_MM);
    expect(GRID_H).toBe(ROWS * CARD_H_MM + (ROWS - 1) * GAP_MM);
    expect(MARGIN_X).toBe((A4_W_MM - GRID_W) / 2);
    expect(MARGIN_Y).toBe((A4_H_MM - GRID_H) / 2);
    expect(MARGIN_X).toBe(7.5);
    expect(MARGIN_Y).toBe(13.5);
  });

  it("returns front-card top-left coordinates in mm for a sample cell", () => {
    const col = 1;
    const row = 2;
    expect(cardPositionMm(col, row)).toEqual({
      x: MARGIN_X + col * (CARD_W_MM + GAP_MM),
      y: MARGIN_Y + row * (CARD_H_MM + GAP_MM),
    });
    expect(cardPositionMm(0, 0)).toEqual({ x: MARGIN_X, y: MARGIN_Y });
  });

  it("mirrors column index for the back sheet", () => {
    expect(mirroredCol(0)).toBe(COLS - 1);
    expect(mirroredCol(1)).toBe(1);
    expect(mirroredCol(2)).toBe(0);
  });
});
