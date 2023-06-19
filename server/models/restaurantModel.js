const mongoose = require("mongoose")


//user model
const { Users } = require("./userModel.js")

const foodSchema= new mongoose.Schema({
    Break:Number,
    Lunch:Number,
    Snacks:Number
})


const restaurantSchema = new mongoose.Schema({
    Name: String,
    ImageLocation:String,
    CreatedBy:{
    type:mongoose.Schema.Types.ObjectId,
     ref:"Users",
     required:true
    },
    CreatedAt:{
        type:Date,
        default:Date.now()
    },
    Location:String,
    Cuisine:String,
    AvgPrice:String,
    Likes:{
        type:[String]
    }
})

 const Restaurant= mongoose.model("Restaurants", restaurantSchema);
 module.exports={
    Restaurant
 }