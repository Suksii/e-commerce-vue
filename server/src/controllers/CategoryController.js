import { Category } from "../models/Category.js";

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

export const getNestedCategories = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      { $match: { parentCategory: null } },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "parentCategory",
          as: "subCategories",
        },
      },
    ]);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);

    if (category.parentCategory === null) {
      await Category.deleteMany({ parentCategory: category._id });
    }
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, image, slug, parentCategory } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, {
      name,
      slug,
      image,
      parentCategory: parentCategory || null,
    });
    res
      .status(200)
      .json({ message: "Category updated successfully", updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
