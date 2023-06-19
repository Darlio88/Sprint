const { Router } = require("express");
const multer= require("multer");
const sharp= require("sharp");
//controllers
const {getAllRestaurants,
    createRestaurant,
    deleteRestaurant,
     updateRestaurant,
     getOneRestaurant} = require("../controllers/restaurantControllers.js")

const route = Router()

const upload= multer({

})
//all restaurants
route.get("/",getAllRestaurants)

//get one
route.get("/:id",getOneRestaurant)
//create a new restaurant
route.post("/create",upload.single("image"),createRestaurant)

//delete a restaurant
route.delete("/:id",deleteRestaurant)

//update a restaurant
route.patch("/:id",upload.single("image"),updateRestaurant)

module.exports= route