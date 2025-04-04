import { Router } from "express";
import { addProduct, getProducts } from "../controllers/ProductController.js";

const router = Router();

router.post("/add-product", addProduct);
router.get("/get-products", getProducts);

export const productRoute = router;
