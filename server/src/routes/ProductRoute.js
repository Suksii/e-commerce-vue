import multer from "multer";
import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProductOptions,
  getProducts,
  getSearchedProduct,
  getSingleProduct,
  updateProduct,
  uploadImages,
} from "../controllers/ProductController.js";

const router = Router();

const photoUpload = multer({ dest: "uploads/products" });

router.post("/upload", photoUpload.array("photos", 5), uploadImages);
router.post("/add-product", addProduct);
router.get("/", getProducts);
router.get("/options", getProductOptions);
router.delete("/delete-product/:id", deleteProduct);
router.get("/:id", getSingleProduct);
router.put("/update-product/:id", updateProduct);
router.get("/search", getSearchedProduct);

export const productRoute = router;
