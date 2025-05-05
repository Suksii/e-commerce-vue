import { Featured } from "../models/Featured";

export const addFeature = async (req, res) => {
  const { title, image, description } = req.body;
  try {
    const newFeature = await Featured.create({ title, image, description });
    res
      .status(200)
      .json({ message: "Feature created successfully", feature: newFeature });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
