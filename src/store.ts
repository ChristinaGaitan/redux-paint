import { rootReducer } from "./rootReducer"
import { devToolsEnhancer } from "redux-devtools-extension"
// TODO: replace this import
import { createStore } from "redux"

export const store = createStore(rootReducer, devToolsEnhancer({}));