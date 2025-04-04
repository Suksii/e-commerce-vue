import { Product } from "../models/Product.js";

export const addProduct = async (req, res) => {
  const { name, description, category, image, price, discount } = req.body;
  try {
    const newProduct = await Product.create({
      name,
      description,
      category,
      price,
      discount,
      image,
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
