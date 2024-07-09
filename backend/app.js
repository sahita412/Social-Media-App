import express from 'express'
const app = express();

import cookieParser from 'cookie-parser';

import cors from 'cors';

import dotenv from "dotenv"
if (process.env.NODE_ENV !== "production"){
    dotenv.config({path:"config/config.env"});
}

//using middleware
const corsOptions = {
    origin: '*',
    credentials: true,
};
app.use(cors(corsOptions));
  
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit:'50mb', extended: true}));
app.use(cookieParser());


//Importing routes
import post from './routes/post.js';
import user from './routes/user.js';

// Using Routes
app.use("/api/v1", post);
app.use("/api/v1", user);


export default app;