import { createTheme } from "@mui/material/styles";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getDesignTokens from "../../helpers/designTokens";
import { RootState } from "../store";

export interface ThemeState {
  mode: "light" | "dark" | "system";
  currentTheme: "light" | "dark";
  themeObject: any;
}

export const initialState: ThemeState = {
  mode: "system",
  currentTheme: "dark",
  themeObject: createTheme(getDesignTokens("dark")),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setMode: (state, { payload }: PayloadAction<any>) => {
      state.mode = payload;

      const systemMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

      state.currentTheme = payload === "system" ? systemMode : payload;
      state.themeObject = createTheme(getDesignTokens(payload === "system" ? systemMode : payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMode } = themeSlice.actions;

export const themeSelector = (state: RootState) => state.theme;
export default themeSlice.reducer;
