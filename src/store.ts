import logger from "redux-logger";
import { reducer as historyIndex } from "./modules/historyIndex/reducer";
import { reducer as currentStroke } from "./modules/currentStroke/reducer";
import { reducer as strokes } from "./modules/strokes/reducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    historyIndex,
    strokes,
    currentStroke,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
