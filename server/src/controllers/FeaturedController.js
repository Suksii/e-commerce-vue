import { Featured } from "../models/Featured.js";

export const addFeatured = async (req, res) => {
  const { title, image, description } = req.body;
  try {
    const newFeatured = await Featured.create({ title, image, description });
    res.status(200).json({
      message: "Featured created successfully",
      featured: newFeatured,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updateFeatured = async (req, res) => {
  const { id } = req.params;
  const { title, image, description } = req.body;

  try {
    const updatedFeatured = await Featured.findByIdAndUpdate(id, {
      title,
      image,
      description,
    });
    res.status(200).json({
      message: "Featured updated successfully",
      featured: updatedFeatured,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
