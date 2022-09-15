import { GetProducts } from "../controllers/productControllers.js";
import express from "express";

const router = express.Router();

router.get("/products", GetProducts);

export default router;




