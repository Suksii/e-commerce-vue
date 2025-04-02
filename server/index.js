import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRoute } from "./src/routes/UserRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Connection failed:", err));

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
