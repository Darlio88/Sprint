import { Router } from "express";

//controllers
import {getAllRestaurants,createRestaurant,deleteRestaurant, updateRestaurant,getOneRestaurant} from "../controllers/restaurantControllers.js"

const route = Router()

//all restaurants
route.get("/",getAllRestaurants)

//get one
route.get("/:id",getOneRestaurant)
//create a new restaurant
route.post("/create",createRestaurant)

//delete a restaurant
route.delete("/:id",deleteRestaurant)

//update a restaurant
route.patch("/:id",updateRestaurant)

export default route