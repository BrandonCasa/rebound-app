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
      const newServers = action.payload.new;
      for (const oldServer of oldServers) {
        if (!newServers.includes(oldServer)) {
          action.payload.subs[oldServer]();
          delete state.myActualServers[oldServer];
          console.log(`Server ${oldServer} removed.`);
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setActualServer, flushActualServers, removeOldServers } = firestuffSlice.actions;

export default firestuffSlice.reducer;
