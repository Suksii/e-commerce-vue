import { Category, seasonOptions, genderOptions } from "../models/Category.js";

export const addCategory = async (req, res) => {
  try {
    const { name, image, parentCategory, slug, gender, season } = req.body;
    const newCategory = await Category.create({
      name,
      image,
      parentCategory,
      slug,
      gender,
      season,
    });
    res
      .status(200)
      .json({ message: "Category Successfully added", category: newCategory });
  } catch (error) {
    res.json({ message: "Internal Server Error" });
  }
};

export const getCategoryOptions = async (req, res) => {
  res.status(200).json({ genderOptions, seasonOptions });
};
