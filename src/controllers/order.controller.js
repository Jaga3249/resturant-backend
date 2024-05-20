import { Order } from "../models/order.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const placeOrder = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  if (!cart) {
    throw new ApiError(400, "cart or payment required");
  }
  let total = 0;
  cart.map((i) => {
    total = total + i.price;
  });
  console.log(cart);
  const newOrder = new Order({
    foods: cart,
    payment: total,
    buyer: req.body.userId,
  });
  await newOrder.save();

  if (!newOrder) {
    throw new ApiError(500, "something went wrong while create a ordrer");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, newOrder, "order placed sucessfully"));
});
export const changeOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const orderId = req.params.id;

  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError(404, "order is not found");
  }

  const updatedOrderStatus = await Order.findByIdAndUpdate(orderId, { status });
  if (!updatedOrderStatus) {
    throw new ApiError(500, "something went wrong while updating order");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        201,
        updatedOrderStatus,
        "order status updated sucessfully"
      )
    );
});
