import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
  name: { type: String },
});

export const SubCategory = mongoose.model("SubCategory", SubCategorySchema);
