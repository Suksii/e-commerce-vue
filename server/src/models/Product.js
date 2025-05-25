import mongoose from "mongoose";
export const genderOptions = ["Male", "Female", "Kids", "Unisex"];
export const seasonOptions = ["Summer", "Winter", "Autumn", "Spring"];

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  gender: {
    type: String,
    enum: genderOptions,
  },
  season: { type: String, enum: seasonOptions, default: undefined },
  discount: { type: Number },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
  images: [{ type: String, required: true }],
});

export const Product = mongoose.model("Product", ProductSchema);
