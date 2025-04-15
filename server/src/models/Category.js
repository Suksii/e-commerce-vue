import mongoose, { Schema } from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  gender: {
    type: String,
    enum: ["Male", "Female", "Unisex"],
  },
  season: { type: String, enum: ["Summer", "Winter", "Autumn", "Spring"] },
  image: String,
  subCategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  ],
});

export const Category = mongoose.model("Category", CategorySchema);
