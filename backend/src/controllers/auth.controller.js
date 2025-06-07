import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateJWT } from "../services/generateJWT.js";
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password)
      return res
        .status(400)
        .json({ status: false, message: "Please fill all details" });
    if (password.length < 6) {
      return res.status(400).json({
        status: false,
        message: "Password should be at least 6 characters",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        status: false,
        message: "User already exists with provided credentials",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(10)
    );

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const token = generateJWT(newUser._id);
      res.cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSize: "strict",
        secure: process.env.NODE_ENV !== "development",
      });

      newUser.save();
      return res.status(201).json({
        status: true,
        data: {
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          profilePicture: newUser.profilePicture,
          data: newUser.data,
        },
        token: token,
      });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Invalid User Data" });
    }
  } catch (e) {
    return res
      .status(501)
      .json({ status: false, message: `Internal Server Error ${e.message}` });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }

    const isPassCorrect = await bcrypt.compare(password, user.password);

    if (isPassCorrect) {
      const token = generateJWT(user?._id);
      res.cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSize: "strict",
        secure: process.env.NODE_ENV !== "development",
      });

      return res.status(201).json({
        status: true,
        message: "User logged in successfully.",
        data: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          profilePicture: user.profilePicture,
          data: user.data,
        },
        token: token,
      });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }
  } catch (e) {
    return res
      .status(501)
      .json({ status: false, message: `Internal Server Error ${e.message}` });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ status: true, message: "Logged out successfully" });
  } catch (e) {
    return res
      .status(501)
      .json({ status: false, message: `Internal Server Error ${e.message}` });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, profilePicture, data } = req.body;
    let updateData = {};
    if (fullName) updateData["fullName"] = fullName;
    if (profilePicture) updateData["profilePicture"] = profilePicture;
    if (data) updateData["data"] = data;

    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "No data provided" });
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
    }).select("-password");

    res.status(201).json({
      status: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (e) {
    return res
      .status(501)
      .json({ status: false, message: `Internal Server Error ${e.message}` });
  }
};

// 400 bad request
