const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const multer= require("multer");
//user models

const {Users} = require("../models/userModel.js")

 const loginController= async (req, res)=>{
    try {
        const {Email,Password}= req.body;
       
        const testUser = await Users.findOne({Email})
        
        if(!testUser) return res.status(404).json("user doesn't exist");
        console.log(testUser)
        const validPassword = bcrypt.compareSync(Password,testUser.Password)
        console.log( validPassword)
        if(!validPassword) return res.status(404).json("Email or Password is incorrect");
        const payload= {id:testUser._id, FullName:testUser.FullName}
        const secretKey="ILovePussyCats"
        const token = jwt.sign(payload,secretKey)
        return res.status(201).json({token})
    } catch (error) {
        res.status(500).json("server error")
    }
}

 const signupController= async (req, res)=>{
    try {
        const {Email,Password, FullName}= req.body;
        console.log(Email, Password, FullName)
        const testUser= await Users.findOne({Email});
        if(testUser) return res.status(409).json("User already exists")
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword= await bcrypt.hash(Password, salt);
        console.log({Email,hashedPassword,FullName})
        const newUser = new Users({Email,Password:hashedPassword,FullName})
        await newUser.save()
        const payload= {id:newUser._id, FullName:newUser.FullName}
        const secretKey="ILoveDogs"
        const token = jwt.sign(payload,secretKey)
        return res.status(200).json({token})
    } catch (error) {
        res.status(500).json("server error")
    }
}

module.exports={
    loginController,
    signupController
}