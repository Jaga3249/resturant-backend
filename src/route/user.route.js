import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleWare.js";
import {
  deleteUser,
  forgotPassword,
  getUser,
  resetPassword,
  updateUser,
} from "../controllers/user.controllers.js";
export const userRouter = Router();

//route
userRouter.route("/getuser").get(verifyJwt, getUser);
userRouter.route("/update-user").post(verifyJwt, updateUser);
userRouter.route("/reset-password").post(verifyJwt, resetPassword);
userRouter.route("/forgot-password").post(forgotPassword);
userRouter.route("/delete-user").post(verifyJwt, deleteUser);
