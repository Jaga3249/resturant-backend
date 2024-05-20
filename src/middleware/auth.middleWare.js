import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.acessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
      throw new ApiError(401, "unAuthorized user");
    }
    const decodeValue = jwt.verify(token, process.env.ACESS_TOKEN_SECRET);
    req.userId = decodeValue._id;
    next();
  } catch (error) {
    throw new ApiError(401, error.message || "token is invalid");
  }
});
