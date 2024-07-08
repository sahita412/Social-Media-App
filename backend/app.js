import express from 'express'
const app = express();

import cookieParser from 'cookie-parser';

// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

import dotenv from "dotenv"
if (process.env.NODE_ENV !== "production"){
    dotenv.config({path:"config/config.env"});
}

//using middleware
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit:'50mb', extended: true}));
app.use(cookieParser())


//Importing routes
import post from './routes/post.js';
import user from './routes/user.js';

// Using Routes
app.use("/api/v1", post);
app.use("/api/v1", user);

// app.use(express.static(path.join(__dirname,"../frontend/build")));

// app.get("*", (req,res)=>{
//     res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
// })

export default app;