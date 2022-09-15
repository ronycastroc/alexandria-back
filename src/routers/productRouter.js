import { GetProducts, FeedDB, GetProductWithID } from "../controllers/productControllers.js";
import express from "express";

const router = express.Router();

router.get("/products", GetProducts);

router.get("/products/:bookId", GetProductWithID);

router.post("/feedb", FeedDB)

export default router;




