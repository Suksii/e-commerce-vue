import multer from "multer";
import { Router } from "express";
import { addBrand, getBrands } from "../controllers/BrandController.js";
import { uploadImage } from "../controllers/UploadController.js";

const router = Router();

const photoUpload = multer({ dest: "uploads/brands" });

router.post("/upload", photoUpload.single("photo"), uploadImage);
router.post("/add", addBrand);
router.get("/", getBrands);

export const brandRoute = router;
