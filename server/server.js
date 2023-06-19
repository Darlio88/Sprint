const express = require("express") 
const cors = require("cors") 
const dotenv = require("dotenv") 





dotenv.config()

const app= express()


//routes
const userRoutes = require("./routes/userRoutes.js") 
const restaurantRoutes = require("./routes/restaurantRoutes.js") 


//middleware
app.use(cors())
app.use(express.urlencoded({extended:true, limit:"10mb"}))
app.use(express.json({limit:"10mb"}))
app.use("/users",userRoutes)
app.use("/restaurants", restaurantRoutes);


module.exports=app;