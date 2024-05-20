import { Food } from "../models/food.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";

//create food
export const createFood = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    foodTag,
    category,
    code,
    isAvailable,
    resturant,
    rating,
    ratingCount,
  } = req.body;

  //   console.log(title, description, price, resturant);
  if (!title || !description || !price || !resturant) {
    throw new ApiError(400, "All fields are required");
  }
  //image upload

  const imageLocalPath = req?.file && req.file.path;
  const image = await cloudinaryUpload(imageLocalPath);
  if (!image) {
    throw new ApiError(500, "image is missing");
  }
  const food = await Food.create({
    title,
    description,
    price,
    foodTag,
    category,
    code,
    isAvailable,
    resturant,
    rating,
    ratingCount,
    image: image.url,
  });
  const createdFood = await Food.findById(food._id);
  if (!createdFood) {
    throw new ApiError(500, "something went wrong while create food");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, createdFood, "food created sucessfully"));
  console.log(image);
});
//get all food
export const getAllFoods = asyncHandler(async (req, res) => {
  const availableFood = await Food.find({});
  if (!availableFood) {
    throw new ApiError(404, "foods are not available");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { foodCount: availableFood.length, availableFood },
        "food retrive sucessfully"
      )
    );
});
//get single food
export const getFood = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const food = await Food.findById(id);
  if (!food) {
    throw new ApiError(404, "food is not available");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, food, "food retrived sucessfully"));
});
//get food by resturant
export const getFoodByResturantId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const food = await Food.find({ resturant: id });
  if (!food) {
    throw new ApiError(404, "food is not available");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, food, "food retrived sucessfully"));
});
//update food
export const updateFood = asyncHandler(async (req, res) => {
  const foodId = req.params.id;

  const food = await Food.findById(foodId);
  if (!food) {
    throw new ApiError(404, "food is not available");
  }

  const {
    title,
    description,
    price,
    foodTag,
    category,
    code,
    isAvailable,
    resturant,
    rating,
    ratingCount,
  } = req.body;

  // Update only the fields provided in the request body
  const fieldsToUpdate = [
    "title",
    "description",
    "price",
    "foodTag",
    "category",
    "code",
    "isAvailable",
    "resturant",
    "rating",
    "ratingCount",
  ];
  fieldsToUpdate.forEach((field) => {
    if (req.body[field] !== undefined && req.body[field] !== "") {
      food[field] = req.body[field];
    }
  });

  const imageLocalPath = req.file && req.file.path;
  if (imageLocalPath) {
    const image = await cloudinaryUpload(imageLocalPath);
    food.image = image.url;
  }
  const updetdFood = await food.save();
  if (!updetdFood) {
    throw new ApiError(500, "something went wrong while updating food");
  }
  console.log(updetdFood);
  return res
    .status(200)
    .json(new ApiResponse(200, updateFood, "food updated sucessfully"));
});
//delete food
export const deleteFood = asyncHandler(async (req, res) => {
  const foodId = req.params.id;
  const food = await Food.findById(foodId);
  if (!food) {
    throw new ApiError(404, "food is not available");
  }
  await Food.findByIdAndDelete(foodId);
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "food deleted sucessfully"));
});
