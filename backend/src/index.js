import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import chatRoutes from "./routes/chat.route.js";
import storageRoutes from "./routes/storage.route.js";
import dotenv from "dotenv";
import { connectDB } from "./services/db.js";
import { app, server } from "./services/socket.js";
import express from "express";
import path from "path";

const __dirname = path.resolve();
dotenv.config();

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/storage", storageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT}....`);
  connectDB();
});
