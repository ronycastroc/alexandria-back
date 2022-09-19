import express from "express";
import { createPurchase } from "../controllers/checkoutControllers.js";
import { validatePurcharse } from "../middlewares/joiMiddlewares.js";
import { AuthValidation } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/checkout", validatePurcharse, AuthValidation, createPurchase);

export default router;
