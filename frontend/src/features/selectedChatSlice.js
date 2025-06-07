import { createSlice } from "@reduxjs/toolkit";
import { getSocket } from "../utils/socket";
export const selectedChatSlice = createSlice({
  name: "chat",
  initialState: {
    _id: "",
    chatName: "",
    isGroupChat: false,
    users: "",
    latestMessage: "",
    groupAdmin: "",
  },
  reducers: {
    setSelectedChat: (state, action) => {
      state._id = action.payload._id;
      state.chatName = action.payload.chatName;
      state.isGroupChat = action.payload.isGroupChat;
      state.users = action.payload.users;

      const socket = getSocket();
      socket.emit("join-chat", action.payload._id);
    },
    unselectChat: (state, action) => {
      state._id = "";
      state.chatName = "";
      state.isGroupChat = false;
      state.users = "";
    },
  },
});

export const { setSelectedChat, unselectChat } = selectedChatSlice.actions;

export default selectedChatSlice.reducer;
