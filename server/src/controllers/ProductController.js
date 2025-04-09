import fs from "fs";
import { Product } from "../models/Product.js";

export const addProduct = async (req, res) => {
  const { name, description, category, images, price, discount } = req.body;
  try {
    const newProduct = await Product.create({
      name,
      description,
      category,
      price,
      discount,
      images,
    });

    res.status(200).json({ newProduct, message: "Product added successfully" });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: "No products found" });
  }
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    const { path, originalname } = req.files[0];
    const extension = originalname.split(".").pop();
    const newPath = path + "." + extension;

    fs.renameSync(path, newPath);
    res.status(200).send(newPath.split("\\").slice(1));
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product successfully deleted" });
  } catch (error) {
    res.json({ message: "Failed to delete product" });
  }
};

export const getSingleProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOne(id);
    res.json(product);
  } catch (error) {
    res.json({ message: "Cannot find specific product:", error });
  }
};
