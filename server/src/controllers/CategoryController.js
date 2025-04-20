import fs from "fs";
import { Category } from "../models/Category.js";

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
    const { name, image, parentCategory, slug } = req.body;
    const newCategory = await Category.create({
      name,
      image,
      parentCategory: parentCategory || null,
      slug,
    });
    res
      .status(200)
      .json({ message: "Category Successfully added", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json({ message: "No categories found" });
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
export const getParentCategories = async (req, res) => {
  try {
    const parentCategories = await Category.find({ parentCategory: null });
    if (!parentCategories) {
      return res.status(404).json({ message: "No parent categories found" });
    }
    res.status(200).json(parentCategories);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
