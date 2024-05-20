import mongoose, { Schema } from "mongoose";
const foodSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "food title is required"],
    },
    description: {
      type: String,
      required: [true, "food description is required"],
    },
    price: {
      type: Number,
      required: [true, "food price is required"],
    },
    image: {
      type: String,
      required: [true, "food image is required"],
    },
    foodTag: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: false,
    },
    resturant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resturant",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: Number,
    },
  },
  { timestamps: true }
);
export const Food = mongoose.model("Food", foodSchema);
