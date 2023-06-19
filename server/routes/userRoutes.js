const { Router } = require("express");

//controller
const { loginController,signupController } = require("../controllers/userControllers.js");

const route= Router()

//create a user
route.post("/signin",loginController)
//login a user
route.post("/signup",signupController)

module.exports= route;