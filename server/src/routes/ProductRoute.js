import multer from "multer";
import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  uploadImage,
} from "../controllers/ProductController.js";

const router = Router();

const photoUpload = multer({ dest: "uploads" });

router.post("/upload", photoUpload.array("photos", 100), uploadImage);
router.post("/add-product", addProduct);
router.get("/get-products", getProducts);
router.get("/delete-product/:id", deleteProduct);

export const productRoute = router;
