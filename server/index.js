import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { connectDB } from "./database/connection.js";
import { userRoute } from "./src/routes/UserRoute.js";
import { productRoute } from "./src/routes/ProductRoute.js";
import { cartRoute } from "./src/routes/CartRoute.js";
import { categoryRoute } from "./src/routes/CategoryRoute.js";
import { brandRoute } from "./src/routes/BrandRoute.js";
import { featuredRoute } from "./src/routes/FeaturedRoute.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_ORIGIN;

const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => res.status(200).send("Hello World"));

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

connectDB();

app.listen(PORT, () => {
  try {
    console.log("Server is running on port:" + PORT);
  } catch (error) {
    console.error(error);
  }
});

export default app;
