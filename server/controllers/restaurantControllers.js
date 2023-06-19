const { Restaurant } = require("../models/restaurantModel.js")
const multer= require("multer");
const sharp= require("sharp");
const fs= require("fs");


const getAllRestaurants = async(req, res)=>{
    try {
         await Restaurant.find({}).then(restaurants=>{
            const withImageStr= restaurants.map(restaurant=>{
               const {Name, Location,Cuisine, AvgPrice,ImageLocation,CreatedBy,_id}= restaurant
               // Read the image file as a buffer
               console.log(Name, Location,Cuisine, AvgPrice,ImageLocation,CreatedBy,_id)
                const imageBuffer = fs.readFileSync(ImageLocation);
                // Convert the image buffer to a Base64 string
                const base64Image = imageBuffer.toString('base64');
               return ({
                 Name,Location,Cuisine,AvgPrice,CreatedBy,_id,ImageStr:base64Image
               })
            })
            res.status(200).send(withImageStr) 
         })
             
    } catch (error) {
        res.status(500).json("Server error")
    }
}

 const createRestaurant = async(req, res)=>{
    try {
        const file=req.file
      //name, location, meals, cuisine, avgprice,image_location, 
      console.log(req.body) 
      console.log(file) 
      const image = sharp(file.buffer);
      const filePath= `./images/${Date.now().toString()+file.originalname}`
      // Apply image manipulations
      image.resize(800, 600).toFile(filePath, (err, info) => {
               if (err) {
                   console.error(err);
               } else {
                   console.log('Image processing complete');
               }
           });
      const {Name, Location, Cuisine, AvgPrice,CreatedBy}= req.body;
      console.log(Name, Location, Cuisine, AvgPrice,CreatedBy)
    await Restaurant.create({Name, Location,Cuisine, AvgPrice,ImageLocation:filePath,CreatedBy}).then(()=>{
       
        res.status(201).send("restaurant successfully created")
    })
    } catch (error) {
        res.status(501).json("failed to create user")
    }
}

 const deleteRestaurant= async(req, res)=>{
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

 const  updateRestaurant = async(req, res)=>{
    const {id} = req.params;  
    const body=req.body;
    const {Name, Location, Cuisine, AvgPrice,CreatedBy}= req.body;
    try {
        if(req.file){
            const image = sharp(req.file.buffer);
            const filePath= `./images/${Date.now().toString()+req.file.originalname}`
            // Apply image manipulations
            image.resize(800, 600).toFile(filePath, (err, info) => {
                     if (err) {
                         console.error(err);
                     } else {
                         console.log('Image processing complete');
                     }
                 });
          await Restaurant.updateOne({_id:id},{...body,ImageLocation:filePath}).then(()=>{
              return res.status(201).send("Restaurant successfully created")
          }).catch(err=>{
            console.log(err)
          })
        }  else{
            const restaurant = await Restaurant.updateOne({_id:id},{...body})
            console.log(restaurant)
           res.status(201).json("Restaurant Successfully Updated")
        }

    } catch (error) {
        res.status(200).json("Server Error")
    }
}



 const getOneRestaurant = async (req, res)=>{
    try {
       const {id}= req.params; 
       console.log(id)
       const restaurant= await Restaurant.findById(id)
       if(!restaurant) return res.status(401).json("Restaurant does not exist")
       const {Name, Location,Cuisine, AvgPrice,ImageLocation,CreatedBy,_id}= restaurant
       // Read the image file as a buffer
        const imageBuffer = fs.readFileSync(ImageLocation);
        // Convert the image buffer to a Base64 string
        const base64Image = imageBuffer.toString('base64');
       res.status(200).json({Name, Location,Cuisine, AvgPrice,ImageStr:`${base64Image}`,CreatedBy,_id})
    } catch (error) {
        res.status(500).json("server error")
    }
}


module.exports={
    getAllRestaurants,
    getOneRestaurant,
    updateRestaurant,
    deleteRestaurant,
    createRestaurant
}