import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();
const server = http.createServer(app);
 

const io = new Server(server);
app.use(cors());
app.use(express.json());

const onlineUsers = new Map();

io.on("connection", (socket) => {
  const connectedUserId = socket.handshake.query.userId;
  if (connectedUserId) {
    onlineUsers.set(connectedUserId, socket.id);
    console.log(
      connectedUserId,
      " has connected",
      Array.from(onlineUsers.keys())
    );
  }

  // io.emit("online-users", Array.from(onlineUsers.keys()));
  socket.on("request-online-users", () => {
    io.emit("online-users", Array.from(onlineUsers.keys()));
  });

  socket.on("join-chat", (chatId) => {
    socket.join(chatId);
  });

  socket.on("disconnect", () => {
    onlineUsers.delete(connectedUserId);
    io.emit("online-users", Array.from(onlineUsers.keys()));
  });
});

export { io, app, server };
