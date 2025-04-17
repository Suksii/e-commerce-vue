import mongoose, { Schema } from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  gender: {
    type: String,
    enum: ["Male", "Female", "Unisex"],
  },
  season: { type: String, enum: ["Summer", "Winter", "Autumn", "Spring"] },
  image: String,
  parentCategory: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
});

export const Category = mongoose.model("Category", CategorySchema);
