import { GetProducts, FeedDB, GetProductWithID, GetProductsWithCategory } from "../controllers/productControllers.js";
import express from "express";

const router = express.Router();

router.get("/products", GetProducts);

router.get("/products/:bookId", GetProductWithID);

router.get("/products/categories/:category", GetProductsWithCategory);

router.post("/feedb", FeedDB)

export default router;




