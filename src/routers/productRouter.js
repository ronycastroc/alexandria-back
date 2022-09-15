import { GetProducts, FeedDB } from "../controllers/productControllers.js";
import express from "express";

const router = express.Router();

router.get("/products", GetProducts);

router.post("/feedb", FeedDB)

export default router;




