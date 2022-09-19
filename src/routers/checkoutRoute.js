import express from "express";
import { createPurchase } from "../controllers/checkoutControllers.js";

const router = express.Router();

router.post("/checkout", createPurchase);

export default router;