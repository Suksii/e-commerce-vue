import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Product } from "../models/Product.js";

export const addCart = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.status(401).json({ message: "Unauthorized - No token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await User.findById(decoded.id);
    const productData = await Product.findById(req.params.id);
    console.log(userData, productData);
    res.json(decoded);
  } catch (error) {
    res.json({ message: "Internal Server Error" });
  }
};
