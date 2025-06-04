import { Router } from "express";
import {
  addFeatured,
  deleteFeatured,
  getFeatured,
  getSingleFeatured,
  updateFeatured,
} from "../controllers/FeaturedController.js";
import { uploadImage } from "../controllers/UploadController.js";
import { photoUpload } from "../middleware/multer.js";

const router = Router();

router.post("/upload", photoUpload.single("photo"), uploadImage);
router.post("/add", addFeatured);
router.get("/", getFeatured);
router.get("/:id", getSingleFeatured);
router.put("/update/:id", updateFeatured);
router.delete("/delete/:id", deleteFeatured);

export const featuredRoute = router;
