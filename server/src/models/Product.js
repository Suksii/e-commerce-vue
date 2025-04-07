import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number },
  category: { type: String, required: true },
  images: [{ type: String, required: true }],
});

export const Product = mongoose.model("Product", ProductSchema);
