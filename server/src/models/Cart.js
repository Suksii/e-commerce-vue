import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  price: { type: Number, required: true },
  totalPrice: {
    type: Number,
    default: 0,
  },
});

export const Cart = mongoose.model("Cart", CartSchema);
