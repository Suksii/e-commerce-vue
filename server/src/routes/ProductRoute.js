import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProductOptions,
  getProducts,
  getSearchedProduct,
  getSingleProduct,
  updateProduct,
} from "../controllers/ProductController.js";
import { uploadImages } from "../controllers/UploadController.js";
import { photoUpload } from "../middleware/multer.js";

const router = Router();

router.post("/upload", photoUpload.array("photos", 5), uploadImages);
router.post("/add", addProduct);
router.get("/", getProducts);
router.get("/search", getSearchedProduct);
router.get("/options", getProductOptions);
router.delete("/delete/:id", deleteProduct);
router.get("/:id", getSingleProduct);
router.put("/update/:id", updateProduct);

export const productRoute = router;
