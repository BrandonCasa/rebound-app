// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

export const dialogsSlice = createSlice({
  name: "dialogs",
  initialState: {
    openedDialogs: [],
    closedDialogs: ["serverDialog", "createServerDialog", "joinServerDialog"],
  },
  reducers: {
    initDialog: (state, action) => {
      state.closedDialogs.push(action.payload);
    },
    openDialog: (state, action) => {
      state.openedDialogs.push(action.payload);
      state.closedDialogs = state.closedDialogs.filter((dialog) => dialog !== action.payload);
    },
    closeDialog: (state, action) => {
      state.closedDialogs.push(action.payload);
      state.openedDialogs = state.openedDialogs.filter((dialog) => dialog !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { initDialog, openDialog, closeDialog } = dialogsSlice.actions;

export default dialogsSlice.reducer;
