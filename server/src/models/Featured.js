import mongoose from "mongoose";

const FeaturedSchema = new mongoose.Schema({
  title: { type: String },
  image: { type: String, required: true },
  description: { type: String },
});

export const Featured = mongoose.model("Featured", FeaturedSchema);
