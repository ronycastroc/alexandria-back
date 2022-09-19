import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRouters from "./routers/authRoutes.js";
import productsRouters from "./routers/productRouter.js";
import checkOutRouters from "./routers/checkoutRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouters);
app.use(productsRouters);
app.use(checkOutRouters);

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
