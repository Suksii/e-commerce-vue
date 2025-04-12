import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  name: { type: String },
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  gender: {
    type: String,
    enum: ["Male", "Female", "Unisex"],
  },
  season: { type: String, enum: ["Summer", "Winter", "Autumn", "Spring"] },
  image: String,
});

export const Category = mongoose.model("Category", CategorySchema);
