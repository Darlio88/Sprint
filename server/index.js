import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const app= express()


//routes
import userRoutes from "./routes/userRoutes.js"
import restaurantRoutes from "./routes/restaurantRoutes.js"

//middleware
app.use(cors())
app.use(express.urlencoded({extended:true, limit:"10mb"}))
app.use(express.json({limit:"10mb"}))
app.use("/users",userRoutes)
app.use("/restaurants", restaurantRoutes);


const PORT = process.env.PORT || 4000;
// const MONGODB_URI="mongodb+srv://Omoding:hM1YjWC0QAvstB1e@cluster0.d7tyc.mongodb.net/?retryWrites=true&w=majority"
const MONGODB_URI=process.env.MONGO_DB_URI
mongoose.connect(MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(4000,()=>{
        console.log("app running on port 4000")
    })
  }).catch((err) => {
    console.error('Error connecting to MongoDB', err);
  })
