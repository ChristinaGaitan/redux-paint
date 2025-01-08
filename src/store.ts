import { rootReducer } from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
// TODO: replace this import
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger)),
);
