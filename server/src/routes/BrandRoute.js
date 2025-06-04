import { Router } from "express";
import {
  addBrand,
  deleteBrand,
  getBrands,
  getSingleBrand,
  updateBrand,
} from "../controllers/BrandController.js";
import { uploadImage } from "../controllers/UploadController.js";
import { photoUpload } from "../middleware/multer.js";

const router = Router();

router.post("/upload", photoUpload.single("photo"), uploadImage);
router.post("/add", addBrand);
router.get("/", getBrands);
router.delete("/delete/:id", deleteBrand);
router.put("/update/:id", updateBrand);
router.get("/:id", getSingleBrand);

export const brandRoute = router;
