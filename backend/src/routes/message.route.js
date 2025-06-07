import express from "express";
import { authGuard } from "../middleware/auth.middleware.js";
import {
  getAllMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send-message", authGuard, sendMessage);
router.get("/get-chat-messages/:chatId", authGuard, getAllMessages);

export default router;
