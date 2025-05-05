import mongoose from "mongoose";

const FeaturedSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String },
});

export const Featured = mongoose.model("Featured", FeaturedSchema);
