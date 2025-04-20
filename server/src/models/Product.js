import mongoose from "mongoose";
export const genderOptions = ["Male", "Female", "Unisex"];
export const seasonOptions = ["Summer", "Winter", "Autumn", "Spring"];

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  gender: {
    type: String,
    enum: genderOptions,
  },
  season: { type: String, enum: seasonOptions },
  discount: { type: Number },
  category: { type: String, required: true },
  images: [{ type: String, required: true }],
});

export const Product = mongoose.model("Product", ProductSchema);
