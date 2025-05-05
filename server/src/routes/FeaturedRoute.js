import { Router } from "express";
import { addFeatured } from "../controllers/FeaturedController.js";

const router = Router();

router.post("/add", addFeatured);

export const featuredRoute = router;
