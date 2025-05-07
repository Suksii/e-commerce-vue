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

export const deleteFeatured = async (req, res) => {
  const { id } = req.params;
  try {
    await Featured.findByIdAndDelete(id);
    res.status(200).json({ message: "Featured deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getFeatured = async (req, res) => {
  try {
    const featured = await Featured.find();
    res.status(200).json(featured);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getSingleFeatured = async (req, res) => {
  const { id } = req.params;
  try {
    const singleFeatured = await Featured.findById(id);
    res.status(200).json(singleFeatured);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
