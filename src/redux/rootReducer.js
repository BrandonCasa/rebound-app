import { combineReducers } from "@reduxjs/toolkit";
import firestuffReducer from "./Firestuff/firestuff.slice";
import themeReducer from "./Theme/theme.slice";

const rootReducer = combineReducers({
  theme: themeReducer,
  firestuff: firestuffReducer,
});

export default rootReducer;
