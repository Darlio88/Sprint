const mongoose = require("mongoose")

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

 const Users= mongoose.model("Users", userSchema)

 module.exports={
    Users,
 }