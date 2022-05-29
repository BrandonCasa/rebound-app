import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface DialogsState {
  openedDialogs: string[];
  closedDialogs: string[];
}

export const initialState: DialogsState = {
  openedDialogs: [],
  closedDialogs: ["serverDialog", "createServerDialog", "joinServerDialog", "changeBioDialog"],
};

export const dialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    addDialog: (state, { payload }: PayloadAction<any>) => {
      state.closedDialogs.push(payload);
    },
    openDialog: (state, { payload }: PayloadAction<any>) => {
      state.openedDialogs.push(payload);
      state.closedDialogs = state.closedDialogs.filter((dialog) => dialog !== payload);
    },
    closeDialog: (state, { payload }: PayloadAction<any>) => {
      state.closedDialogs.push(payload);
      state.openedDialogs = state.openedDialogs.filter((dialog) => dialog !== payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addDialog, openDialog, closeDialog } = dialogsSlice.actions;

export const dialogsSelector = (state: RootState) => state.dialogs;
export default dialogsSlice.reducer;
