import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UserstuffState {
  bio: string;
}

export const initialState: UserstuffState = {
  bio: "",
};

export const userstuffSlice = createSlice({
  name: "userstuff",
  initialState,
  reducers: {
    setBio: (state, { payload }: PayloadAction<any>) => {
      state.bio = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBio } = userstuffSlice.actions;

export const userstuffSelector = (state: RootState) => state.userstuff;
export default userstuffSlice.reducer;
