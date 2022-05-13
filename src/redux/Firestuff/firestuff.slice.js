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
    removeOldServers: (state, action) => {
      const oldServers = Object.keys(state.myActualServers);
      const newServers = action.payload;
      for (const oldServer of oldServers) {
        if (!newServers.includes(oldServer)) {
          console.log(`Server ${oldServer} removed.`);
          delete state.myActualServers[oldServer];
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setActualServer, flushActualServers, removeOldServers } = firestuffSlice.actions;

export default firestuffSlice.reducer;
