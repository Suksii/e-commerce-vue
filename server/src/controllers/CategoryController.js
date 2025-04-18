import fs from "fs";
import { Category, seasonOptions, genderOptions } from "../models/Category.js";

export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  try {
    const { path, originalname } = req.file;
    const extension = originalname.split(".").pop();
    const newPath = path + "." + extension;

    fs.renameSync(path, newPath);
    res.status(200).send(newPath.split("\\").slice(1));
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

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
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getCategoryOptions = async (req, res) => {
  res.status(200).json({ gender: genderOptions, season: seasonOptions });
};
