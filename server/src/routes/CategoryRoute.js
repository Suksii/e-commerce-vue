import multer from "multer";
import { Router } from "express";
import {
  addCategory,
  getAllCategories,
  getParentCategories,
} from "../controllers/CategoryController.js";
import { uploadImages } from "../controllers/UploadController.js";

const router = Router();

const photoUpload = multer({ dest: "uploads/categories" });

router.post("/upload", photoUpload.single("photo"), uploadImages);
router.post("/add", addCategory);
router.get("/", getAllCategories);
router.get("/parent", getParentCategories);

export const categoryRoute = router;
