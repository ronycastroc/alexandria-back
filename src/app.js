import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { PORT } from './configs/constants.js';
import authRouter from './routers/auth.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);

app.listen(PORT, () => console.log(`Listen on ${PORT}`));