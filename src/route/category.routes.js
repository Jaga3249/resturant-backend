import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleWare.js";
import { upload } from "../middleware/multer.middleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/category.controllers.js";
export const categoryRoute = Router();
//create category
categoryRoute
  .route("/create")
  .post(verifyJwt, upload.single("image"), createCategory);
categoryRoute.route("/getAll-category").get(getAllCategory);
categoryRoute
  .route("/update/:id")
  .put(verifyJwt, upload.single("image"), updateCategory);
categoryRoute.route("/delete/:id").delete(verifyJwt, deleteCategory);
