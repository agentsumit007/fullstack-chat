import twilio from "twilio";
import cloudinary from "../services/cloudinary.js";

export const uploadToStorage = async (req, res) => {
  try {
    const file = req.file;
    const uploadResponse = await cloudinary.uploader.upload(file.path);
    const requiredKeys = [
      "asset_id",
      "public_id",
      "width",
      "height",
      "format",
      "resource_type",
      "created_at",
      "url",
      "secure_url",
    ];
    let data = {};
    requiredKeys.forEach((key) => {
      data[key] = uploadResponse[key];
    });
    res.status(201).json({
      status: true,
      message: "File uploaded successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: `Internal server error ${error.message}`,
    });
  }
};
