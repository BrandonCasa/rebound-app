import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./Theme/theme.slice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
