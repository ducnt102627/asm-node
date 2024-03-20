import express from 'express';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors'
import productRouter from './routers/product.router';
import mongoose from 'mongoose';
import authRouter from './routers/auth';



dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
//connect
mongoose.connect("mongodb://localhost:27017/ASM_WEB503");

//router
app.use('/api', productRouter);
app.use('/api', authRouter)

export const viteNodeApp = app;