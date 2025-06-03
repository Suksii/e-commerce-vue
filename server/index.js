import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { userRoute } from "./src/routes/UserRoute.js";
import { productRoute } from "./src/routes/ProductRoute.js";
import { cartRoute } from "./src/routes/CartRoute.js";
import { categoryRoute } from "./src/routes/CategoryRoute.js";
import { brandRoute } from "./src/routes/BrandRoute.js";
import { featuredRoute } from "./src/routes/FeaturedRoute.js";

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
    origin: ["https://e-commerce-vue.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(
  "/uploads",
  express.static(path.join(import.meta.dirname, "./uploads"))
);
app.use("/api/users", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/category", categoryRoute);
app.use("/api/brand", brandRoute);
app.use("/api/products", productRoute);
app.use("/api/featured", featuredRoute);
