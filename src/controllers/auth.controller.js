import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import { cloudinaryUpload } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//reguster
export const userRegistation = asyncHandler(async (req, res) => {
  const { userName, email, password, address, phone } = req.body;

  if (!userName || !email || !password || !address || !phone) {
    throw new ApiError(400, "All fields are required");
  }
  const existUser = await User.findOne({
    $or: [{ userName }, { email }],
  });
  if (existUser) {
    throw new ApiError(
      500,
      "user is already exist with given mail or username"
    );
  }

  // upload file
  const profilePictureLocalPath = req.file && req.file.path;
  if (!profilePictureLocalPath) {
    throw new ApiError(400, "profilePicture is missing");
  }
  let profulePicture = await cloudinaryUpload(profilePictureLocalPath);
  if (!profulePicture) {
    throw new ApiError(
      500,
      "something went wrong while uploading image in cloudinary"
    );
  }

  let hashedPassword = await bcrypt.hash(password, 10);
  // create user
  const user = await User.create({
    userName,
    email,
    password: hashedPassword,
    address,
    phone,
    profilePicture: profulePicture.url,
  });
  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering user");
  }
  res
    .status(200)
    .json(new ApiResponse(201, createdUser, "user registered sucessfully"));
});
//login
export const userLogin = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if ((!userName && !email) || !password) {
    throw new ApiError(400, "username or email is not found");
  }
  const existUser = await User.findOne({
    $or: [{ email }, { userName }],
  });
  if (!existUser) {
    throw new ApiError(404, "user is not found");
  }
  const isCorrectPassword = await bcrypt.compare(password, existUser.password);
  if (!isCorrectPassword) {
    throw new ApiError(401, "Invalid password");
  }
  const acessToken = await existUser.generateAcessToken(existUser);
  const refreshToken = await existUser.generateRefreshToken(existUser);
  existUser.refreshToken = refreshToken;
  await existUser.save({ validateBeforeSave: false });

  const logginUser = await User.findById(existUser._id).select(
    "-password -refreshToken"
  );
  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, option)
    .cookie("acessToken", acessToken, option)
    .json(
      new ApiResponse(
        201,
        {
          user: logginUser,
          refreshToken,
          acessToken,
        },
        "User logged in successfully"
      )
    );
});
//logout
export const userLogout = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    throw new ApiError(404, "user is not found");
  }
  await User.findByIdAndUpdate(user._id, {
    $unset: { refreshToken: 1 },
  });
  const option = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("refreshToken", option)
    .clearCookie("acessToken", option)
    .json(new ApiResponse(201, {}, "user logged out sucessfully"));
});
