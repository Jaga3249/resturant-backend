import mongoose, { Schema } from "mongoose";

const resturantSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "resturant title is required"],
    },
    desc: {
      type: String,
    },
    image: {
      type: String,
      required: [true, "resturant image is required"],
    },
    foods: { type: [] },
    time: { type: String },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    logo: {
      type: String,
      required: [true, "logo is required"],
    },
    code: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 1,
    },
    ratingCount: {
      type: String,
    },
    coords: {
      id: { type: String },
      latitude: { type: String },
      latitudeDelta: { type: String },
      longitude: { type: String },
      longitudeDelta: { type: String },
      address: { type: String },
      title: { type: String },
    },
  },
  { timestampsL: true }
);
export const Resturant = mongoose.model("Resturant", resturantSchema);
