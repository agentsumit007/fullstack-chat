import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { io } from "../services/socket.js";

// Message Controller
export const sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;
    if (!content || !chatId)
      return res
        .status(400)
        .json({ status: false, message: "Unable to send message" });

    let message = await Message.create({
      sender: req.user._id,
      content,
      chat: chatId,
    });

    message = await message.populate("sender", "fullName profilePicture");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "fullName profilePicture email",
    });

    // Update latestMessage in Chat
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });

    //emitting new message to chat room
    io.to(chatId).emit("new-message", message);

    res.status(200).json({
      status: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: `Internal server error ${error.message}`,
    });
  }
};

export const getAllMessages = async (req, res) => {
  if (!req.params.chatId)
    res.status(400).json({
      status: false,
      message: `Chat ID is required ${req.params.chatId}`,
    });
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "fullName profilePicture email")
      .populate("chat");

    res
      .status(200)
      .json({ status: true, message: "All message fetched", data: messages });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
