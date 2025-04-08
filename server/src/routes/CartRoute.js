import { Router } from "express";
import { addCart, getCarts } from "../controllers/CartController.js";

const router = Router();

router.post("/add-cart/:id", addCart);
router.get("/carts", getCarts);

export const cartRoute = router;
