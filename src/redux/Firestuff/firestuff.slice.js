// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

export const firestuffSlice = createSlice({
  name: "firestuff",
  initialState: {
    myServers: [],
    myActualServers: {},
  },
  reducers: {
    setMyServers: (state, action) => {
      state.myServers = action.payload;
    },
    setActualServer: (state, action) => {
      state.myActualServers[action.payload.serverId] = action.payload.serverData;
    },
    flushActualServers: (state, action) => {
      state.myActualServers = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMyServers, setActualServer, flushActualServers } = firestuffSlice.actions;

export default firestuffSlice.reducer;
