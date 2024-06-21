import express from 'express'
import userRoute from './routes/userRoute.js'
import cors from "cors";
import cookieParser from 'cookie-parser';
import { errorHandler, notFound } from './middleware/ErrorMidddleware.js';

export const app = express()

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json())


app.use('/user', userRoute)


app.use(notFound)
app.use(errorHandler)