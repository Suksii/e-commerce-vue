import { Router } from "express";
import { addCart } from "../controllers/CartController.js";

const router = Router();

router.post("/add-cart/:id", addCart);
router.get("/get-carts", addCart);

export const cartRoute = router;
