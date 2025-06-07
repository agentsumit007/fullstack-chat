import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getSocket } from "./socket";
import { useDispatch } from "react-redux";
import { setOnlineUsers } from "../features/settingsSlice";

export function useChatSocket(selectedChat) {
  const socket = getSocket(); // Make sure this always gives the same instance
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket || !selectedChat?._id) return;

    const handleNewMessage = (message) => {
      if (message.chat._id === selectedChat._id) {
        queryClient.invalidateQueries(["messages", selectedChat._id]);
      }
    };

    socket.on("new-message", handleNewMessage);

    return () => {
      socket.off("new-message", handleNewMessage);
    };
  }, [socket, selectedChat?._id]);
}


export function useOnlineUsersListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = getSocket();

    const handleOnlineUsers = (userIds) => {
      dispatch(setOnlineUsers(userIds));
    };

    socket.on("online-users", handleOnlineUsers);

    return () => {
      socket.off("online-users", handleOnlineUsers);
    };
  }, [dispatch]);
}

