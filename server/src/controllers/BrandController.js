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

export const getBrands = async (req, res) => {
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

export const deleteBrand = async (req, res) => {
  const { id } = req.params;
  try {
    await Brand.findByIdAndDelete(id);
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete brand", error });
  }
};

export const updateBrand = async (req, res) => {
  const { id } = req.params;
  const { image, name } = req.body;
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, { image, name });
    res
      .status(200)
      .json({ message: "Brand updated successfully", brand: updatedBrand });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
