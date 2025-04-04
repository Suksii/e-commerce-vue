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
