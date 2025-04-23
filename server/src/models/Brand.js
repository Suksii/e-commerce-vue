import mongoose from "mongoose";

const BrandModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: [String, null],
});

export const Brand = mongoose.model("Brand", BrandModel);
