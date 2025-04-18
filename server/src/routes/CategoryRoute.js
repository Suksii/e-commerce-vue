import multer from "multer";
import { Router } from "express";
import {
  addCategory,
  getAllCategories,
  getCategoryOptions,
  uploadImage,
} from "../controllers/CategoryController.js";

const router = Router();

const photoUpload = multer({ dest: "uploads/categories" });

router.post("/upload", photoUpload.single("photo"), uploadImage);
router.post("/add", addCategory);
router.get("/options", getCategoryOptions);
router.get("/", getAllCategories);

export const categoryRoute = router;
