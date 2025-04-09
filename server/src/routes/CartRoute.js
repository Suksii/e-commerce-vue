import { Router } from "express";
import {
  addCart,
  deleteCart,
  getCarts,
} from "../controllers/CartController.js";

const router = Router();

router.post("/add-cart/:id", addCart);
router.get("/carts", getCarts);
router.delete("/delete-cart/:id", deleteCart);

export const cartRoute = router;
