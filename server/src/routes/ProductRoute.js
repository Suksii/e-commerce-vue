import { Router } from "express";
import { addProduct } from "../controllers/ProductController.js";

const router = Router();

router.post("/add-product", addProduct);

export const productRoute = router;
