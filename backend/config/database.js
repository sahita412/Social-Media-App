import mongoose from "mongoose";

export function connectDatabase(){
    mongoose
    .connect(process.env.MONGO_URI)
    .then((con) => console.log(`db connected : ${con.connection.host}`))
    .catch((err) => console.log(err)); 
}
