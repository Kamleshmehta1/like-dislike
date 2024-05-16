import express from 'express';
import dotenv from 'dotenv';
import { connectMongoDb } from './connection.js';
import userRouter from './routes/user.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import recepieRoutes from './routes/recepie.js';

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectMongoDb(process.env.MONGO_URI); //connect to mongodb

app.use('/', userRouter); // user routes

app.use('/recepie', recepieRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
