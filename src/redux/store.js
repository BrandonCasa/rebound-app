import { configureStore } from "@reduxjs/toolkit";
import dialogsReducer from "./Dialogs/dialogs.slice";
import firestuffReducer from "./Firestuff/firestuff.slice";
import themeReducer from "./Theme/theme.slice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    firestuff: firestuffReducer,
    dialogs: dialogsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
