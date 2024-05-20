import { Router } from "express";
import {
  changeOrderStatus,
  placeOrder,
} from "../controllers/order.controller.js";
import { verifyJwt } from "../middleware/auth.middleWare.js";
import { adminMiddleWare } from "../middleware/admin.middleware.js";
export const orderRouter = Router();
//place order
orderRouter.route("/place-order").post(verifyJwt, placeOrder);
orderRouter
  .route("/order-status/:id")
  .post(verifyJwt, adminMiddleWare, changeOrderStatus);
