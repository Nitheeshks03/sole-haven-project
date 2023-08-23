import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const port = process.env.PORT || 5000;
dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(
    "/upload",
    express.static(path.join(__dirname, "/Frontend/dist/images"))
  );
  app.use(express.static(path.join(__dirname, "/Frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  app.use(
    "/uploads",
    express.static(path.join(__dirname, "/Frontend/public/images"))
  );
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
