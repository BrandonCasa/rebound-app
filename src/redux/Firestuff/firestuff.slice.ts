import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface FirestuffState {
  myActualServers: any;
}

export const initialState: FirestuffState = {
  myActualServers: {},
};

export const firestuffSlice = createSlice({
  name: "firestuff",
  initialState,
  reducers: {
    setActualServer: (state, { payload }: PayloadAction<any>) => {
      state.myActualServers[payload.serverId] = payload.serverData;
    },
    flushActualServers: (state) => {
      state.myActualServers = {};
    },
    removeOldServers: (state, { payload }: PayloadAction<any>) => {
      const oldServers = Object.keys(state.myActualServers);
      const newServers = payload.new;
      for (const oldServer of oldServers) {
        if (!newServers.includes(oldServer)) {
          payload.subs[oldServer]();
          delete state.myActualServers[oldServer];
          console.log(`Server ${oldServer} removed.`);
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setActualServer, flushActualServers, removeOldServers } = firestuffSlice.actions;

export const firestuffSelector = (state: RootState) => state.firestuff;
export default firestuffSlice.reducer;
