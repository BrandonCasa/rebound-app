import { configureStore } from "@reduxjs/toolkit";
import firestuffReducer from "./Firestuff/firestuff.slice";
import themeReducer from "./Theme/theme.slice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    firestuff: firestuffReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
