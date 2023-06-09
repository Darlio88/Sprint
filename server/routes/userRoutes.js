import { Router } from "express";

//controller
import { loginController,signupController } from "../controllers/userContollers.js";

const route= Router()

//create a user
route.post("/signin",loginController)
//login a user
route.post("/signup",signupController)

export default route;