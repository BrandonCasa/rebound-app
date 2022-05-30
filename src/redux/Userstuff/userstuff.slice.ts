import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UserstuffState {
  bio: string;
  displayName: string;
  color: string;
}

export const initialState: UserstuffState = {
  bio: "",
  displayName: "",
  color: "#ffffff",
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
    setMyColor: (state, { payload }: PayloadAction<any>) => {
      state.color = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBio, setDisplayName, setMyColor } = userstuffSlice.actions;

export const userstuffSelector = (state: RootState) => state.userstuff;
export default userstuffSlice.reducer;
