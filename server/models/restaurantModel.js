import mongoose from "mongoose"

//user model
import { Users } from "./userModel.js"

const foodSchema= new mongoose.Schema({
    Break:Number,
    Lunch:Number,
    Snacks:Number
})


const restaurantSchema = new mongoose.Schema({
    Name: String,
    ImageStr:String,
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
    Meals:{
        type:foodSchema,
    }

})


export const Restaurant= mongoose.model("Restaurants", restaurantSchema);