import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./route/Auth.routes.js";
import { userRouter } from "./route/user.route.js";
import { resturantRouter } from "./route/resturant.routes.js";
import { categoryRoute } from "./route/category.routes.js";
import { foodRouter } from "./route/food.routes.js";
import { orderRouter } from "./route/order.routes.js";

export const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(
  express.urlencoded({
    limit: "16kb",
    extended: true,
  })
);
app.use(cookieParser());

//route import
//auth route
app.use("/api/v1/auth", router);
//user route
app.use("/api/v1/user", userRouter);
//resturant route
app.use("/api/v1/resturant", resturantRouter);
//category route
app.use("/api/v1/category", categoryRoute);
//food route
app.use("/api/v1/food", foodRouter);
//order route
app.use("/api/v1/order", orderRouter);
