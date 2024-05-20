import { app } from "../app.js";
import { Category } from "../models/category.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";

//create category
export const createCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) {
    throw new ApiError(400, "category title is required");
  }
  //upload iamge
  const imageLocalPath = req.file && req.file.path;
  const image = await cloudinaryUpload(imageLocalPath);

  if (!image) {
    throw new ApiError(400, "category image is required");
  }
  const category = await Category.create({
    title,
    image: image?.url,
  });
  if (!category) {
    throw new ApiError(500, "something went wrong while cerate category");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, category, "category created sucessfully"));
});
//get all category
export const getAllCategory = asyncHandler(async (req, res) => {
  const category = await Category.find({});
  if (!category) {
    throw new ApiError(404, "category is not found");
  }
  console.log(category);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { category, categoryCount: category.length },
        "Categories retrieval successful."
      )
    );
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { title } = req.body;

  if (!title) {
    throw new ApiError(400, "category title is required");
  }

  //image
  const imageLocalPath = req.file && req.file.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "image is missing");
  }
  const image = await cloudinaryUpload(imageLocalPath);
  if (!image) {
    throw new ApiError(
      500,
      "something went wrong while uploading image in cloudinary"
    );
  }
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { $set: { title, image: image.url } },
    { new: true }
  );
  if (!updatedCategory) {
    throw new ApiError(500, "something went wrong while updating category");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedCategory, "category updated sucessfully")
    );
});
export const deleteCategory = asyncHandler(async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const availableCategory = await Category.findById(id);
  if (!availableCategory) {
    throw new ApiError(500, "category is not available");
  }
  await Category.findByIdAndDelete(availableCategory._id);
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "category deleted sucessfully"));
});
