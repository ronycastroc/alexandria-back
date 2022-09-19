import {
  GetProducts,
  FeedDB,
  GetProductWithID,
  GetProductsWithCategory,
} from "../controllers/productControllers.js";
import express from "express";
import { validateCategory } from "../middlewares/joiMiddlewares.js";

const router = express.Router();

router.get("/products", GetProducts);

router.get("/products/:bookId", GetProductWithID);

router.get(
  "/products/categories/:category",
  validateCategory,
  GetProductsWithCategory
);

router.post("/feedb", FeedDB);

export default router;
