import logger from "redux-logger";
// import { reducer as historyIndex } from "./modules/historyIndex/reducer";
import { currentStroke } from "./modules/currentStroke/slice";
import strokes from "./modules/strokes/slice";
import { configureStore } from "@reduxjs/toolkit";
import historyIndex from "./modules/historyIndex/slice";

export const store = configureStore({
  reducer: {
    historyIndex,
    strokes,
    currentStroke,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
