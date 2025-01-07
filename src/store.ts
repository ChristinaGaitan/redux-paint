import { rootReducer } from "./rootReducer"
import { composeWithDevTools } from "redux-devtools-extension"
// TODO: replace this import
import { applyMiddleware, createStore } from "redux"
import logger from "redux-logger";

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));
