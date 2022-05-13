// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

export const firestuffSlice = createSlice({
  name: "firestuff",
  initialState: {
    myActualServers: {},
  },
  reducers: {
    setActualServer: (state, action) => {
      state.myActualServers[action.payload.serverId] = action.payload.serverData;
    },
    flushActualServers: (state, action) => {
      state.myActualServers = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { setActualServer, flushActualServers } = firestuffSlice.actions;

export default firestuffSlice.reducer;
