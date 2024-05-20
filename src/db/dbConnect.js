import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

export const DbConnect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("Db connected");
  } catch (error) {
    console.log("MongoDb Connection error !!", error.message);
    process.exit(1);
  }
};
