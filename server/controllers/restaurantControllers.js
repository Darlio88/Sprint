import { Restaurant } from "../models/restaurantModel.js";
import {nanoid} from "nanoid"

import fs from "fs"


export const getAllRestaurants = async(req, res)=>{
    try {
         const restaurants = await Restaurant.find({})
        //  const restaurantsWithImageStr= restaurants.map((restaurant)=>{
        //     const homedir=process.cwd();
        //     const ImagePath= `${homedir}/images/${restaurant.ImageLocation}.png`
        //     const imageBuffer = fs.readFileSync(ImagePath);
        //     // Convert Buffer to base64 encoded string
        //     const base64Image = imageBuffer.toString('base64');
        //     //  restaurant["ImageStr"]=base64Image;
        //      const {CreatedBy,id:_id,Meals,Location, Name,AvgPrice}= restaurant;
        //     return {CreatedBy,id:_id,Meals,Location,AvgPrice, Name,ImageStr:base64Image};
        //  })
         res.status(200).send(restaurants)
        
        //  res.status(200).json(restaurantsWithImageStr)       
    } catch (error) {
        res.status(500).json("Server error")
    }
}

export const createRestaurant = async(req, res)=>{
    try {
      //name, location, meals, cuisine, avgprice,image_location, 
      console.log(req.body)   
      const {Name, Location,Meals, Cuisine, AvgPrice,ImageStr,CreatedBy}= req.body;
    //   console.log(Name, Location,Meals, Cuisine, AvgPrice,ImageStr,CreatedBy)
      
      //convert base64 to image
      //save it to file system
      //save image_location to database
      const imageBuffer = Buffer.from(ImageStr.slice(21), 'base64');
      const uniqueStr= nanoid()
      fs.writeFile(`./images/${uniqueStr}.png`, imageBuffer, async function(err) {
        if (err) throw err;
        console.log('Image saved successfully', );
        let newRestaurant = new Restaurant({Name,ImageLocation:uniqueStr,ImageStr,Location,AvgPrice,Cuisine,CreatedBy,Meals})    
        await newRestaurant.save()
        res.status(200).json("Restaurant Successfully created")
      });
      
    } catch (error) {
        res.status(501).json("failed to create user")
    }
}

export const deleteRestaurant= async(req, res)=>{
    try {
       const {id} = req.params;
       console.log(id, "deleting session")
       const target = await Restaurant.findById(id)
       console.log(target)
       await target.deleteOne()
        console.log("done")
       res.status(200).send("Restaurant successfully deleted")
    } catch (error) {
        res.status(500).json("Server error")
    }
}

export const  updateRestaurant = async(req, res)=>{
    try {
        const {id} = req.params;  
        const {Name, Location,Meals, Cuisine, AvgPrice,ImageStr,CreatedBy}= req.body;
        const imageBuffer = Buffer.from(ImageStr.slice(22), 'base64');
        const uniqueStr= nanoid()
        fs.writeFile(`./images/${uniqueStr}.png`, imageBuffer, async function(err) {
          if (err) throw err;
          console.log('Image saved successfully', );
        const restaurant = await Restaurant.updateOne({_id:id},{Name,ImageStr,ImageLocation:uniqueStr,Location,AvgPrice,Cuisine,CreatedBy,Meals})
           console.log(restaurant)
          res.status(200).json("Restaurant Successfully Updated")
        });
    } catch (error) {
        res.status(200).json("Server Error")
    }
}



export const getOneRestaurant = async (req, res)=>{
    try {
       const {id}= req.params; 
       console.log(id)
       const restaurant= await Restaurant.findById(id)
       if(!restaurant) return res.status(401).json("Restaurant does not exist")
       res.status(200).json(restaurant)
    } catch (error) {
        res.status(500).json("server error")
    }
}