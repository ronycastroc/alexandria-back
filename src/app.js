import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { PORT } from './configs/constants.js';
import productsRouters from "./routers/productRouter.js"

const app = express();
app.use(cors());
app.use(express.json());

app.use(productsRouters);


app.listen(PORT, () => console.log(`Listening on ${PORT}`));