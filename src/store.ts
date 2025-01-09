import logger from "redux-logger";
import { currentStroke } from "./modules/currentStroke/slice";
import strokes from "./modules/strokes/slice";
import { configureStore } from "@reduxjs/toolkit";
import historyIndex from "./modules/historyIndex/slice";
import { modalVisible } from "./modules/modals/slice";

export const store = configureStore({
  reducer: {
    historyIndex,
    strokes,
    currentStroke,
    modalVisible,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
