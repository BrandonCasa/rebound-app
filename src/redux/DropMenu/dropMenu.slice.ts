import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface DropMenuState {
  openedMenus: string[];
  closedMenus: string[];
  anchorElement: HTMLElement | null;
}

export const initialState: DropMenuState = {
  openedMenus: [],
  closedMenus: ["userDropMenu"],
  anchorElement: null,
};

export const dropMenuSlice = createSlice({
  name: "dropMenu",
  initialState,
  reducers: {
    addMenu: (state, { payload }: PayloadAction<any>) => {
      state.closedMenus.push(payload);
    },
    openMenu: (state, { payload }: PayloadAction<any>) => {
      state.anchorElement = payload.element;
      state.openedMenus.push(payload.menu);
      state.closedMenus = state.closedMenus.filter((menu) => menu !== payload.menu);
    },
    closeMenu: (state, { payload }: PayloadAction<any>) => {
      state.closedMenus.push(payload.menu);
      state.openedMenus = state.openedMenus.filter((menu) => menu !== payload.menu);
      state.anchorElement = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMenu, openMenu, closeMenu } = dropMenuSlice.actions;

export const dropMenuSelector = (state: RootState) => state.dropMenu;
export default dropMenuSlice.reducer;
