import express, { application } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { PORT } from './configs/constants.js';
import authRouter from './routers/authRoutes.js';
import productsRouters from "./routers/productRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter)
app.use(productsRouters);

//app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});
