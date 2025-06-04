import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getChildCategories,
  getNestedCategories,
  getParentCategories,
  getSingleCategory,
  updateCategory,
} from "../controllers/CategoryController.js";
import { uploadImage } from "../controllers/UploadController.js";
import { photoUpload } from "../middleware/multer.js";

const router = Router();

router.post("/upload", photoUpload.single("photo"), uploadImage);
router.post("/add", addCategory);
router.get("/", getAllCategories);
router.get("/parent", getParentCategories);
router.get("/child", getChildCategories);
router.get("/nested", getNestedCategories);
router.get("/:id", getSingleCategory);
router.delete("/delete/:id", deleteCategory);
router.put("/update/:id", updateCategory);

export const categoryRoute = router;
