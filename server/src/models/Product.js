import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  discount: { type: Number },
  category: { type: String, required: true },
  image: { type: String, required: true },
});

export const Product = mongoose.model("Product", ProductSchema);
