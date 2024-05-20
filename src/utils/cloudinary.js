import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: "dhyhmggr4",
  api_key: "187777896178985",
  api_secret: "pkIJ0yv5r8S8_UsQ8lbJnF7KfXM",
});
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// console.log(process.env.CLOUDINARY_API_KEY);
export const cloudinaryUpload = async (localfilepath) => {
  // console.log("localfilepath: ", localfilepath);
  try {
    if (!localfilepath) return null;
    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });
    // console.log("response", response);
    fs.unlinkSync(localfilepath);
    return response;
  } catch (error) {
    // console.log(error.message);
    fs.unlinkSync(localfilepath);
  }
};
