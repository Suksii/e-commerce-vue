import mongoose from "mongoose";

const BrandModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: null,
  },
});

export const Brand = mongoose.model("Brand", BrandModel);
