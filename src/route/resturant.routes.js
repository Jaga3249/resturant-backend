import { Router } from "express";
import {
  createResturant,
  deleteResturant,
  getAllResturants,
  getResturantById,
} from "../controllers/resturant.controller.js";
import { verifyJwt } from "../middleware/auth.middleWare.js";
import { upload } from "../middleware/multer.middleware.js";
export const resturantRouter = Router();
resturantRouter.route("/create").post(
  verifyJwt,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  createResturant
);
resturantRouter.route("/getAll-resturants").get(getAllResturants);
resturantRouter.route("/get-resturant").get(getResturantById);
resturantRouter.route("/delete-resturant").delete(verifyJwt, deleteResturant);
