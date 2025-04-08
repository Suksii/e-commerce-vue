import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Product } from "../models/Product.js";
import { Cart } from "../models/Cart.js";

export const addCart = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.status(401).json({ message: "Unauthorized - No token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await User.findById(decoded.id);
    const productData = await Product.findById(req.params.id);
    const discountedPrice = productData.discount
      ? productData.price - (productData.price * productData.discount) / 100
      : productData.price;
    const newCart = await Cart.create({
      user: userData,
      products: {
        product: productData,
        quantity: 1,
        price: discountedPrice,
      },
    });
    res.json({ cart: newCart, message: "Product successfully added to cart" });
  } catch (error) {
    res.json({ message: "Internal Server Error" });
  }
};

export const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    req.json(error);
  }
};
