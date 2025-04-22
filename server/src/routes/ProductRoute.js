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
router.post("/add", addProduct);
router.get("/", getProducts);
router.get("/search", getSearchedProduct);
router.get("/options", getProductOptions);
router.delete("/delete/:id", deleteProduct);
router.get("/:id", getSingleProduct);
router.put("/update/:id", updateProduct);

export const productRoute = router;
