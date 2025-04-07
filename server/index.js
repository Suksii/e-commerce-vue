import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRoute } from "./src/routes/UserRoute.js";
import { productRoute } from "./src/routes/ProductRoute.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Connection failed:", err));

const app = express();

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(
  "/uploads",
  express.static(path.join(import.meta.dirname, "../uploads"))
);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
