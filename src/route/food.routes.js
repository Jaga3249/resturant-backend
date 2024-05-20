import { Router } from "express";
import {
  createFood,
  deleteFood,
  getAllFoods,
  getFood,
  getFoodByResturantId,
  updateFood,
} from "../controllers/food.controller.js";
import { verifyJwt } from "../middleware/auth.middleWare.js";
import { upload } from "../middleware/multer.middleware.js";
export const foodRouter = Router();
//create
foodRouter.route("/create").post(verifyJwt, upload.single("image"), createFood);
foodRouter.route("/getAll").get(getAllFoods);
foodRouter.route("/get/:id").get(getFood);
foodRouter.route("/getByResturant/:id").get(getFoodByResturantId);
foodRouter
  .route("/update/:id")
  .post(verifyJwt, upload.single("image"), updateFood);
foodRouter.route("/delete/:id").post(verifyJwt, deleteFood);
