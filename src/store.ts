import logger from "redux-logger";
import { currentStroke } from "./modules/currentStroke/slice";
import strokes from "./modules/strokes/slice";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import historyIndex from "./modules/historyIndex/slice";
import { modalVisible } from "./modules/modals/slice";
import { RootState } from "./utils/types";

export const store = configureStore({
  reducer: {
    historyIndex,
    strokes,
    currentStroke,
    modalVisible,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;
