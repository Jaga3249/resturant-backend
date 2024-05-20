import { Resturant } from "../models/resturant.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";

//create resturant
export const createResturant = asyncHandler(async (req, res) => {
  const {
    title,
    desc,
    foods,
    pickup,
    delivery,
    isOpen,
    code,
    coords,
    ratingCount,
  } = req.body;
  if (!title || !coords) {
    throw new ApiError(400, "resturant title and address are  required");
  }
  //upload image

  const imageLocalPath =
    req.files && Array.isArray(req.files.image) && req.files.image.length > 0
      ? req.files.image[0].path
      : null;
  const logoLocalPath =
    req.files && Array.isArray(req.files.logo) && req.files.logo.length > 0
      ? req.files.logo[0].path
      : null;

  if (!logoLocalPath || !imageLocalPath) {
    throw new ApiError(400, "resturant image and logo is required");
  }

  const [image, logo] = await Promise.all([
    cloudinaryUpload(imageLocalPath),
    cloudinaryUpload(logoLocalPath),
  ]);

  const registerResturant = await Resturant.create({
    title,
    desc,
    foods,
    pickup,
    delivery,
    isOpen,
    code,
    coords,
    image: image?.url,
    logo: logo?.url,
    ratingCount: ratingCount,
  });
  if (!registerResturant) {
    throw new ApiError(500, "something went wrong while registering resturant");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, registerResturant, "resturant register sucessfully")
    );
});

//get all resturants
export const getAllResturants = asyncHandler(async (req, res) => {
  const resturants = await Resturant.find({});
  if (!resturants) {
    throw new ApiError(500, "resturant is not available");
  }
  return res.status(200).json(
    new ApiResponse(200, {
      totalCount: resturants.length,
      resturants,
    })
  );
});
//get resturant by id
export const getResturantById = asyncHandler(async (req, res) => {
  const resturantId = req.query.id;
  if (!resturantId) {
    throw new ApiError(400, "Please provide a valid resturant id");
  }
  const resturant = await Resturant.findById(resturantId);
  if (!resturant) {
    throw new ApiError(401, "resturant is not available");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, resturant, "resturant detail fetch sucessfully")
    );
});

//delete resturant
export const deleteResturant = asyncHandler(async (req, res) => {
  const resturantId = req.query.id;
  if (!resturantId) {
    throw new ApiError(400, "PLease provide resturant id");
  }
  const deleteResturant = await Resturant.findByIdAndDelete(resturantId);
  if (!deleteResturant) {
    throw new ApiError(500, "Something went wrong while deleting resturant");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "resturant delete sucessfully"));
});
