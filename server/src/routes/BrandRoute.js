import multer from "multer";
import { Router } from "express";
import {
  addBrand,
  deleteBrand,
  getBrands,
} from "../controllers/BrandController.js";
import { uploadImage } from "../controllers/UploadController.js";

const router = Router();

const photoUpload = multer({ dest: "uploads/brands" });

router.post("/upload", photoUpload.single("photo"), uploadImage);
router.post("/add", addBrand);
router.get("/", getBrands);
router.delete("/delete/:id", deleteBrand);

export const brandRoute = router;
