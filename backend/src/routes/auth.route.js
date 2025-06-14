import express from "express";
import { login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { authGuard } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", authGuard, updateProfile);

export default router;
