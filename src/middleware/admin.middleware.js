import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const adminMiddleWare = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user.userType != "admin") {
      throw new ApiError(401, "unAuthorized user");
    }
    next();
  } catch (error) {
    throw new ApiError(401, error.message || "unAuthorized user");
  }
});
