import { RootState, Stroke } from "../../utils/types";
import {
  Action,
  BEGIN_STROKE,
  END_STROKE,
  SET_STROKE_COLOR,
  UPDATE_STROKE,
} from "./actions";

const initialState: RootState["currentStroke"] = {
  points: [],
  color: "#000",
};

export const currentStrokeSelector = (state: RootState) => state.currentStroke;

export const reducer = (
  state: RootState["currentStroke"] = initialState,
  action: Action,
): Stroke => {
  switch (action.type) {
    case BEGIN_STROKE: {
      return { ...state, points: [action.payload] };
    }
    case UPDATE_STROKE: {
      return { ...state, points: [...state.points, action.payload] };
    }
    case SET_STROKE_COLOR: {
      return { ...state, color: action.payload };
    }
    case END_STROKE: {
      return { ...state, points: [] };
    }
    default:
      return state;
  }
};
