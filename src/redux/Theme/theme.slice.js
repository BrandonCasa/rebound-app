// @ts-nocheck
import { createTheme } from "@mui/material/styles";
import { createSlice } from "@reduxjs/toolkit";
import getDesignTokens from "../../helpers/designTokens";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: "system",
    actualMode: "dark",
    actualTheme: createTheme(getDesignTokens("dark")),
  },
  reducers: {
    setMode: (state, action) => {
      state.value = action.payload;
      if (action.payload === "system") {
        const newMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        state.actualMode = newMode;
        state.actualTheme = createTheme(getDesignTokens(newMode));
      } else {
        state.actualMode = action.payload;
        state.actualTheme = createTheme(getDesignTokens(action.payload));
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMode } = themeSlice.actions;

export default themeSlice.reducer;
