import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import chatRoutes from "./routes/chat.route.js";
import storageRoutes from "./routes/storage.route.js";
import dotenv from "dotenv";
import { connectDB } from "./services/db.js";
import { app, server } from "./services/socket.js";
import express from "express";
import path from "path";

dotenv.config({path: "backend/.env"});

const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/storage", storageRoutes);

if (process.env.NODE_ENV === "production") {
  // Path to frontend build
  const distPath = path.join(__dirname, "/frontend/dist");

  // Serve static files
  app.use(express.static(distPath));

  // Handle all other routes by serving index.html
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

server.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT}....`);
  connectDB();
});
