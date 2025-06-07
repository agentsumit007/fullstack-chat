import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const authGuard = async (req, res, next) => {
  try {
    const authHeader = req.headers.accesstoken;

    if (!authHeader) {
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized: Token not provided" });
    }

    const decodedUser = jwt.verify(authHeader, process.env.JWT_SECRET);

    if (!decodedUser) {
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized: Invalid user token" });
    }

    const user = await User.findById(decodedUser.userId).select("-password");

    if (!user)
      return res
        .status(404)
        .json({ status: false, message: "404: User not found" });

    req.user = user;

    next();
  } catch (e) {
    return res
      .status(401)
      .json({ status: false, message: "Unauthorized: Invalid token" });
  }
};
