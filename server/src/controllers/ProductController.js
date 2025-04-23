import fs from "fs";
import { Product, genderOptions, seasonOptions } from "../models/Product.js";

export const addProduct = async (req, res) => {
  const {
    name,
    description,
    category,
    images,
    price,
    discount,
    season,
    gender,
  } = req.body;
  try {
    const newProduct = await Product.create({
      name,
      description,
      category,
      gender,
      season,
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
    const sortField = req.query.sortBy || "name";
    const sortOrder = req.query.order === "desc" ? -1 : 1;
    const products = await Product.find().sort({ [sortField]: sortOrder });
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: "No products found" });
  }
};

export const getProductOptions = async (req, res) => {
  res.status(200).json({ gender: genderOptions, season: seasonOptions });
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
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.json({ message: "Cannot find specific product:", error });
  }
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const {
    name,
    description,
    category,
    images,
    price,
    discount,
    season,
    gender,
  } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      name,
      description,
      category,
      gender,
      season,
      images,
      price,
      discount,
    });
    res.json({ message: "Product edited successfuly", updatedProduct });
  } catch (error) {
    res.json({ message: "Internal Server Error", error });
  }
};

export const getSearchedProduct = async (req, res) => {
  const { name, gender, season, category } = req.query;
  try {
    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }
    if (gender) {
      filter.gender = gender;
    }
    if (season) {
      filter.season = season;
    }

    const products = await Product.find(filter);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
