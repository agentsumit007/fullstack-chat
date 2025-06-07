import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "setting",
  initialState: {
    visibleScreen: "users",
    onlineUsers: [],
  },
  reducers: {
    setVisibleScreen: (state, action) => {
      state.visibleScreen = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setVisibleScreen, setOnlineUsers } = settingsSlice.actions;

export default settingsSlice.reducer;
