import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Product } from "../models/Product.js";
import { Cart } from "../models/Cart.js";

export const addCart = async (req, res) => {
  try {
    const { token } = req.cookies;
    const { quantity } = req.body;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await User.findById(decoded.id);
    const productData = await Product.findById(req.params.id);

    const discountedPrice = productData.discount
      ? productData.price - (productData.price * productData.discount) / 100
      : productData.price;
    const totalPrice = (discountedPrice * quantity).toFixed(2);

    const cartExists = await Cart.findOne({
      user: userData._id,
      product: productData._id,
    });

    let newCart;

    if (cartExists) {
      cartExists.quantity += quantity;
      cartExists.totalPrice = (cartExists.quantity * discountedPrice).toFixed(
        2
      );
      newCart = await cartExists.save();
    } else {
      newCart = await Cart.create({
        user: userData,
        product: productData,
        quantity: quantity || 1,
        price: discountedPrice,
        totalPrice: totalPrice,
      });
    }
    // const newCart = await Cart.create({
    //   user: userData,
    //   product: productData,
    //   quantity: quantity || 1,
    //   price: discountedPrice,
    //   totalPrice: totalPrice,
    // });
    res.json({
      cart: newCart,
      message: "Product successfully added to cart",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Internal Server Error", error });
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

export const updateCartQuantity = async (req, res) => {
  const id = req.params.id;
  const type = req.body.type;
  try {
    const cart = await Cart.findById(id).populate("product");
    if (!cart) {
      res.status(404).json({ message: "Cart product not found" });
    }
    const updatedQuantity =
      type === "increase" ? cart.quantity + 1 : Math.max(1, cart.quantity - 1);
    const discountedPrice = cart.product.discount
      ? cart.product.price - (cart.product.price * cart.product.discount) / 100
      : cart.product.price;
    const updatedTotalPrice = updatedQuantity * discountedPrice;
    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      {
        $set: { quantity: updatedQuantity, totalPrice: updatedTotalPrice },
      },
      { new: true }
    );

    res.json({ message: "Cart quantity updated", cart: updatedCart });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart quantity:", error });
  }
};
