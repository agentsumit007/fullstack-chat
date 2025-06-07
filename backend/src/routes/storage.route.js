import express from "express";
import { uploadToStorage } from "../controllers/storage.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadToStorage);

export default router;
