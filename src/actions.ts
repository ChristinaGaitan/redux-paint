import { Point } from "./utils/types";

export const END_STROKE = "END_STROKE";

export type Action = {
  type: typeof END_STROKE;
  payload: Point;
};

export const endStroke = () => {
  return { type: END_STROKE };
};
