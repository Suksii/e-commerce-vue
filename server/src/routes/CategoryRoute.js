import multer from "multer";
import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getNestedCategories,
  getParentCategories,
  updateCategory,
} from "../controllers/CategoryController.js";
import { uploadImage } from "../controllers/UploadController.js";

const router = Router();

const photoUpload = multer({ dest: "uploads/categories" });

router.post("/upload", photoUpload.single("photo"), uploadImage);
router.post("/add", addCategory);
router.get("/", getAllCategories);
router.get("/parent", getParentCategories);
router.get("/nested", getNestedCategories);
router.delete("/delete/:id", deleteCategory);
router.put("/update/:id", updateCategory);

export const categoryRoute = router;
