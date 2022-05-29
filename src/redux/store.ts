// @ts-nocheck
import { Action, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import logger from "redux-logger";
import { ThunkAction } from "redux-thunk";
import dialogsReducer from "./Dialogs/dialogs.slice";
import firestuffReducer from "./Firestuff/firestuff.slice";
import themeReducer from "./Theme/theme.slice";
import userstuffReducer from "./Userstuff/userstuff.slice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    firestuff: firestuffReducer,
    dialogs: dialogsReducer,
    userstuff: userstuffReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;

export default store;
