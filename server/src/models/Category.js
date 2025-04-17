import mongoose, { Schema } from "mongoose";
export const genderOptions = ["Male", "Female", "Unisex"];
export const seasonOptions = ["Summer", "Winter", "Autumn", "Spring"];

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  gender: {
    type: String,
    enum: genderOptions,
  },
  season: { type: String, enum: seasonOptions },
  image: String,
  parentCategory: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
});

export const Category = mongoose.model("Category", CategorySchema);
