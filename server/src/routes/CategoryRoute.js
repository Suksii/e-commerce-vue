import { Router } from "express";
import { addCategory } from "../controllers/CategoryController.js";

const router = Router();

router.post("/add-category", addCategory);

export const categoryRoute = router;
