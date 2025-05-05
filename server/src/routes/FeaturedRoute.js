import { Router } from "express";
import {
  addFeatured,
  deleteFeatured,
  getFeatured,
  updateFeatured,
} from "../controllers/FeaturedController.js";

const router = Router();

router.post("/add", addFeatured);
router.put("/update/:id", updateFeatured);
router.delete("/delete/:id", deleteFeatured);
router.get("/", getFeatured);

export const featuredRoute = router;
