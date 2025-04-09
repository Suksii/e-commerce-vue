import multer from "multer";
import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  uploadImage,
} from "../controllers/ProductController.js";

const router = Router();

const photoUpload = multer({ dest: "uploads" });

router.post("/upload", photoUpload.array("photos", 100), uploadImage);
router.post("/add-product", addProduct);
router.get("/", getProducts);
router.delete("/delete-product/:id", deleteProduct);
router.get("/product/:id", getSingleProduct);

export const productRoute = router;
