import multer from "multer";
import { Router } from "express";
import {
  addCategory,
  getCategoryOptions,
} from "../controllers/CategoryController.js";
import { uploadImage } from "../controllers/ProductController.js";

const router = Router();

const photoUpload = multer({ dest: "uploads/categories" });

router.post("/add", addCategory);
router.get("/options", getCategoryOptions);
router.post("/upload", photoUpload.single("photo"), uploadImage);

export const categoryRoute = router;
