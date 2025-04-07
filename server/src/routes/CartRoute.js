import { Router } from "express";
import { addCart } from "../controllers/CartController.js";

const router = Router();

router.post("/add-cart/:id", addCart);

export const cartRoute = router;
