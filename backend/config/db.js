import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://harshguptaclj:jQqn7XFIndOYM6aG@cluster0.doejczi.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}


