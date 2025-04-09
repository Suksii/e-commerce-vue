import { Router } from "express";
import {
  addCart,
  deleteCart,
  getCarts,
  updateCartQuantity,
} from "../controllers/CartController.js";

const router = Router();

router.post("/add-cart/:id", addCart);
router.get("/carts", getCarts);
router.delete("/delete-cart/:id", deleteCart);
router.patch("/update-cart/:id", updateCartQuantity);

export const cartRoute = router;
