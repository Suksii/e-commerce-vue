import { Brand } from "../models/Brand.js";

export const addBrand = async (req, res) => {
  const { name, image } = req.body;
  try {
    const newBrand = await Brand.create({ name, image });
    res
      .status(200)
      .json({ message: "Brand added successfully", brand: newBrand });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getBrand = async (req, res) => {
  try {
    const brands = await Brand.find();
    if (!brands) {
      return res.status(404).json({ message: "No brands found!" });
    }
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
