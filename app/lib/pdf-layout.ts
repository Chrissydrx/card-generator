export const CARD_W_MM = 63;
export const CARD_H_MM = 88;
export const GAP_MM = 3;
export const A4_W_MM = 210;
export const A4_H_MM = 297;
export const COLS = 3;
export const ROWS = 3;
export const CARDS_PER_PAGE = COLS * ROWS;

export const GRID_W = COLS * CARD_W_MM + (COLS - 1) * GAP_MM;
export const GRID_H = ROWS * CARD_H_MM + (ROWS - 1) * GAP_MM;
export const MARGIN_X = (A4_W_MM - GRID_W) / 2;
export const MARGIN_Y = (A4_H_MM - GRID_H) / 2;

export function cardPositionMm(col: number, row: number): { x: number; y: number } {
  return {
    x: MARGIN_X + col * (CARD_W_MM + GAP_MM),
    y: MARGIN_Y + row * (CARD_H_MM + GAP_MM),
  };
}

export function mirroredCol(col: number): number {
  return COLS - 1 - col;
}
