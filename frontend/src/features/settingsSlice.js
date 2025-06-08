import { createSlice } from "@reduxjs/toolkit";
import { themes } from "../../config";

export const settingsSlice = createSlice({
  name: "setting",
  initialState: {
    visibleScreen: "users",
    onlineUsers: [],
    theme: localStorage.getItem("theme-var") || themes[1],
  },
  reducers: {
    setVisibleScreen: (state, action) => {
      state.visibleScreen = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setVisibleScreen, setOnlineUsers, setTheme } =
  settingsSlice.actions;

export default settingsSlice.reducer;
