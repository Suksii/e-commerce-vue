import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Product } from "../models/Product.js";
import { Cart } from "../models/Cart.js";

export const addCart = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await User.findById(decoded.id);
    const productData = await Product.findById(req.params.id);

    const discountedPrice = productData.discount
      ? productData.price - (productData.price * productData.discount) / 100
      : productData.price;
    const newCart = await Cart.create({
      user: userData,
      product: productData,
      quantity: 1,
      price: discountedPrice,
    });
    res.json({
      cart: newCart,
      message: "Product successfully added to cart",
    });
  } catch (error) {
    res.json({ message: "Internal Server Error" });
  }
};

export const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find().populate("product");
    res.status(200).json(carts);
  } catch (error) {
    req.json(error);
  }
};

export const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Product successfully removed from cart" });
  } catch (error) {
    res.status(422).json({ message: "Error while removing the cart:", error });
  }
};
