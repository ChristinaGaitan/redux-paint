import { RootState } from "../../utils/types";
import { endStroke } from "../sharedActions";
import { Action, undo, redo } from "./actions";

export const historyIndexSelector = (state: RootState) => state.historyIndex;

export const reducer = (
  state: RootState["historyIndex"] = 0,
  action: Action,
) => {
  switch (action.type) {
    case endStroke.toString(): {
      return 0;
    }
    case undo.toString(): {
      return Math.min(state + 1, action.payload);
    }
    case redo.toString(): {
      return Math.max(state - 1, 0);
    }
    default:
      return state;
  }
};
