import express from "express";
import {
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/UserController.js";
import { authenticateUser, getCurrentUser } from "../middleware/userProfile.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", authenticateUser, getCurrentUser);
router.get("/get-users", getUsers);

export const userRoute = router;
