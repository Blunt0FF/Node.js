import mongoose from "mongoose";
import "dotenv/config";

const connectionString = process.env.MONGO_URI;

const connectDB = async () => {
  if (!connectionString) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  try {
    await mongoose.connect(connectionString);
    console.log("Database is connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;