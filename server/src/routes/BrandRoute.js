import { Router } from "express";
import { addBrand } from "../controllers/BrandController";
import { uploadImage } from "../controllers/UploadController";
import multer from "multer";

const router = Router();

const photoUpload = multer({ dest: "uploads/brands" });

router.post("/add", addBrand);
router.post("/upload", photoUpload.single("photo"), uploadImage);

export const BrandRoute = router;
