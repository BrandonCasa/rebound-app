import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UserstuffState {
  bio: string;
  displayName: string;
}

export const initialState: UserstuffState = {
  bio: "",
  displayName: "",
};

export const userstuffSlice = createSlice({
  name: "userstuff",
  initialState,
  reducers: {
    setBio: (state, { payload }: PayloadAction<any>) => {
      state.bio = payload;
    },
    setDisplayName: (state, { payload }: PayloadAction<any>) => {
      state.displayName = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBio, setDisplayName } = userstuffSlice.actions;

export const userstuffSelector = (state: RootState) => state.userstuff;
export default userstuffSlice.reducer;
