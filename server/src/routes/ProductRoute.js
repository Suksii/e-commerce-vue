import multer from "multer";
import { Router } from "express";
import {
  addProduct,
  getProducts,
  uploadImage,
} from "../controllers/ProductController.js";

const router = Router();

const photoUpload = multer({ dest: "uploads" });

router.post("/upload", photoUpload.array("photos", 100), uploadImage);
router.post("/add-product", addProduct);
router.get("/get-products", getProducts);

export const productRoute = router;
