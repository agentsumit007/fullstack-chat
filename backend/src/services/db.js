import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionObj = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      "Mongodb connected successfully",
      connectionObj.connection.host
    );
  } catch (e) {
    console.log("Mongodb connection failed", e.message);
  }
};
