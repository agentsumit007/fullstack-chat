import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";

export const accessChat = async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res
      .status(400)
      .json({ status: false, message: "E-mail param not sent" });

  let chat = await Chat.findOne({
    isGroupChat: false,
    users: { $all: [req.user.email, email], $size: 2 },
  })
    .populate("users", "-password")
    .populate("latestMessage");

  if (chat) {
    chat = await User.populate(chat, {
      path: "latestMessage.sender",
      select: "fullName email",
    });
    return res.status(200).json({ status: true, chat: chat });
  }

  const newChat = await Chat.create({
    chatName: "",
    isGroupChat: false,
    users: [req.user._id, userId],
  });

  const fullChat = await Chat.findById(newChat._id).populate(
    "users",
    "-password"
  );
  res.status(200).json({ status: true, chat: fullChat });
};

export const createGroupChat = async (req, res) => {
  const { users, name } = req.body;

  if (!users || !name) {
    return res
      .status(400)
      .json({ status: false, message: "Please provide name and users" });
  }

  const userList = JSON.parse(users);
  if (userList.length < 2) {
    return res.status(400).json({
      status: false,
      message: "At least 2 users required for group chat",
    });
  }

  userList.push(req.user._id);

  const groupChat = await Chat.create({
    chatName: name,
    users: userList,
    isGroupChat: true,
    groupAdmin: req.user._id,
  });

  const fullGroupChat = await Chat.findById(groupChat._id)
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(200).json({ status: true, chat: fullGroupChat });
};

export const fetchChats = async (req, res) => {
  try {
    let chats = await Chat.find({ users: req.user._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    chats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "fullName email",
    });

    res
      .status(200)
      .json({ status: true, message: "All chats for user", chats: chats });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const accessChatByEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ status: false, message: "Email is required" });
  }

  try {
    // 1. Find the user by email
    const targetUser = await User.findOne({ email });

    if (!targetUser) {
      return res
        .status(404)
        .json({ status: false, message: "No account found with this email on our platform." });
    }

    // 2. Check if a chat already exists between the requester and target user
    let chat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [req.user._id, targetUser._id], $size: 2 },
    })
      .populate("users", "-password")
      .populate("latestMessage");

    // 3. If chat exists, send it
    if (chat) {
      chat = await User.populate(chat, {
        path: "latestMessage.sender",
        select: "fullName email",
      });
      return res.status(200).json({
        status: true,
        message: "Chat already exists",
        newChat: false,
        chat: chat,
      });
    }

    // 4. If no chat, create a new one
    const newChatData = {
      chatName: "",
      isGroupChat: false,
      users: [req.user._id, targetUser._id],
    };

    const newChat = await Chat.create(newChatData);

    const fullChat = await Chat.findById(newChat._id).populate(
      "users",
      "-password"
    );

    res.status(201).json({
      status: true,
      message: "New conversation started",
      newChat: true,
      chat: fullChat,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
