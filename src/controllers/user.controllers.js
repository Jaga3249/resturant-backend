import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";

//getuser detail
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new ApiError(404, "user is not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(201, user, "user get sucessfully"));
});
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new ApiError(404, "user is not found");
  }
  const { userName, address, phone } = req.body;
  if (userName) {
    user.userName = userName;
  } else if (address) {
    user.address = address;
  } else if (phone) {
    user.phone = phone;
  }
  const updateUser = await user.save({ validateBeforeSave: false });

  if (!updateUser) {
    throw new ApiError(500, "something went wrong while updating user");
  }
  return res
    .status(200)
    .json(new ApiResponse(201, user, "user updated sucessfully"));
});
export const resetPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new ApiError(404, "Invalid credential");
  }
  const user = await User.findById(req.userId);
  console.log(first);
  if (!user) {
    throw new ApiError(401, "user is not found");
  }
  let passwordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!passwordMatch) {
    throw new ApiError(400, "Invalid password");
  }
  let hashedPassword = await bcrypt.hash(newPassword, 10);
  const updateUser = await User.findByIdAndUpdate(user._id, {
    $set: { password: hashedPassword },
  });
  if (!updateUser) {
    throw new ApiError(500, "something went wrong while reset the password");
  }
  return res
    .status(200)
    .json(new ApiResponse(201, {}, "password reset sucessfully"));
});
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "user is not found");
  }
  let hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  const updateduser = await user.save({ validateBeforeSave: false });
  if (!updateduser) {
    throw new ApiError(500, "something went wrong while update password");
  }
  return res
    .status(200)
    .json(new ApiResponse(201, {}, "password reset sucessfully"));
});
export const deleteUser = asyncHandler(async (req, res) => {
  const deleteUser = await User.findByIdAndDelete(req.userId);
  if (!deleteUser) {
    throw new ApiError(500, "something went wrong while delete a user");
  }
  const option = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("refreshToken", option)
    .clearCookie("acessToken", option)
    .json(new ApiResponse(201, {}, "user deleted sucessfully"));
});
