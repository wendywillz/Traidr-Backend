import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import DB from './database/database.config';
import dotenv from 'dotenv';
import otpRoute from './routes/otpRoute'
import cors from 'cors'
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import checkAndVerifyUserToken from './routes/verifyToken'
dotenv.config();

DB.sync()
.then(() => {
   console.log("Database has been connected")
}).catch((error) => {
   console.log("Error synching the database")
   throw error;
})
const FRONTEND_URL = process.env.FRONTEND_URL
const app = express();

app.use(cors({
   origin: FRONTEND_URL,
   credentials: true
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../", 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/verify-token', checkAndVerifyUserToken);
app.use('/users-otp', otpRoute);


export default app;
