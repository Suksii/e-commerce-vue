import multer from "multer";
import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  uploadImage,
} from "../controllers/ProductController.js";

const router = Router();

const photoUpload = multer({ dest: "uploads/products" });

router.post("/upload", photoUpload.array("photos", 5), uploadImage);
router.post("/add-product", addProduct);
router.get("/", getProducts);
router.delete("/delete-product/:id", deleteProduct);
router.get("/:id", getSingleProduct);
router.put("/update-product/:id", updateProduct);

export const productRoute = router;
