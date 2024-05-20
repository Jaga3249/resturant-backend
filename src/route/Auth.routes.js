import { Router } from "express";

import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleWare.js";
import {
  userLogin,
  userLogout,
  userRegistation,
} from "../controllers/auth.controller.js";
export const router = Router();

//routes
router
  .route("/register")
  .post(upload.single("profilePicture"), userRegistation);
router.route("/login").post(userLogin);
router.route("/logout").post(verifyJwt, userLogout);
