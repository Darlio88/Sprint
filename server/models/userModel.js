import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        FullName:String,
        Password:String,
        Email:{
            type:String,
            unique:true
        }
    
    }
)

export const Users= mongoose.model("Users", userSchema)