import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5200" : "/";

let socket = null;

export const initSocket = (userId) => {
  if (!socket) {
    socket = io(BASE_URL, { query: { userId } });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
