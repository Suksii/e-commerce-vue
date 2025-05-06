import { Router } from "express";
import {
  addFeatured,
  deleteFeatured,
  getFeatured,
  updateFeatured,
} from "../controllers/FeaturedController.js";
import multer from "multer";
import { uploadImage } from "../controllers/UploadController.js";

const router = Router();

const photoUpload = multer({ dest: "uploads/featured" });

router.post("/upload", photoUpload.single("photo"), uploadImage);
router.post("/add", addFeatured);
router.put("/update/:id", updateFeatured);
router.delete("/delete/:id", deleteFeatured);
router.get("/", getFeatured);

export const featuredRoute = router;
