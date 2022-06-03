import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UserstuffState {
  bio: string;
  displayName: string;
  color: string;
  banner: string | undefined;
}

export const initialState: UserstuffState = {
  bio: "",
  displayName: "",
  color: "#ffffff",
  banner: process.env.PUBLIC_URL + "/images/defaultBanner.gif",
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
    setBanner: (state, { payload }: PayloadAction<any>) => {
      state.banner = payload;
    },
    refreshBanner: (state) => {
      const oldBanner = state.banner?.split("randgarb");
      if (oldBanner) {
        state.banner = `${oldBanner[0]}randgarb${Math.floor(Math.random() * 10000)}`;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBio, setDisplayName, setMyColor, setBanner, refreshBanner } = userstuffSlice.actions;

export const userstuffSelector = (state: RootState) => state.userstuff;
export default userstuffSlice.reducer;
