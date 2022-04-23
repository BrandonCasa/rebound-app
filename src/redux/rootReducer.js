import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./Theme/theme.slice";

const rootReducer = combineReducers({
  theme: themeReducer,
});

export default rootReducer;
