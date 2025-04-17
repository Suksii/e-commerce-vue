import { Router } from "express";
import {
  addCategory,
  getCategoryOptions,
} from "../controllers/CategoryController.js";

const router = Router();

router.post("/add", addCategory);
router.get("/options", getCategoryOptions);

export const categoryRoute = router;
