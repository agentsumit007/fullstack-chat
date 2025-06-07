import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import selectedChatReducer from "./features/selectedChatSlice";
import settingsReducer from "./features/settingsSlice";
console.log("Redux store created");
export const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    selectedChat: selectedChatReducer,
    settings: settingsReducer,
  }),
});
