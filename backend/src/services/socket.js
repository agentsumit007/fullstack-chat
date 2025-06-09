import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const allowedOrigins = ["http://localhost:5000", "http://192.168.1.7:5000"]; // example
const corsConfig = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
const app = express();
const server = http.createServer(app);

const io = new Server(server);
app.use(cors());

// const io = new Server(server, {
//   cors: corsConfig,
// });
// app.use(cors(corsConfig));

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
