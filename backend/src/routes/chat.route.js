import express from "express";
import { authGuard } from "../middleware/auth.middleware.js";
import {
  accessChat,
  accessChatByEmail,
  createGroupChat,
  fetchChats,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/access-chat", authGuard, accessChat);
router.get("/fetch-chats", authGuard, fetchChats);
router.post("/create-group-chat", authGuard, createGroupChat);
router.post("/access-chat-by-email", authGuard, accessChatByEmail);

export default router;
