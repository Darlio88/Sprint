const request= require("supertest")
const mongoose = require("mongoose");
const fs= require("fs")
//models
const {Users}= require("../models/userModel")
const {Restaurant} = require("../models/restaurantModel")



//server
const app = require("../server")
const decodeToken = require("../utils/jwtDecoder")

let userId;
let restaurantId;
const PORT = process.env.PORT || 8888;

//before starting the tests
beforeAll(()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/testDB',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT,()=>{
            console.log("app running on port 4000")
        })
      }).catch((err) => {
        console.log('Error connecting to MongoDB', err);
      })
})



//close the database connection after the tests
afterAll( async ()=>{
    await mongoose.connection.close()
})

  describe('User API Tests', () => {
    it('should create a new user', async () => {
      const user = { FullName: 'John Doe', Email: 'john@example.com', Password:"0785124779DAN*"};
      const response = await request(app).post('/users/signup').send(user);
      let regex=/[A-Za-z0-9]+/
      let decoded=decodeToken(response.body.token,"ILoveDogs")
      console.log("the decoded",decoded)
      userId=decoded?.id;
      console.log("the id is",userId)
      expect(response.status).toBe(200);
      expect(regex.test(response.body.token)).toEqual(regex.test("hghjhgf"));
    });
    
    it("new user should exist in database",async()=>{
        const existUser= await Users.findOne({Email:"john@example.com"})
        expect(existUser.FullName).toBe("John Doe")
      })

    it('should login a user', async () => {
        const user = {Email: 'john@example.com', Password:"0785124779DAN*"};
        const response = await request(app).post('/users/signin').send(user);
        let regex=/[A-Za-z0-9]+/
        
        expect(response.status).toBe(201);
        expect(regex.test(response.body.token)).toEqual(regex.test("hghjhgf"));
      });
    
      it('should create a new restaurant', async () => {
        
        const filePath = `images/digital-art.png`;
        
        if (fs.existsSync(filePath)) {
          console.log('File exists');
        }  
        const response = await request(app).post('/restaurants/create').field("Name","Fresh Hot").field("Location","Wandegeya").field("CreatedBy",userId).field("AvgPrice",100).field("Cuisine","American").attach("image",filePath);   
        expect(response.status).toBe(201);
      });
    


      it("new restaurant should exist in the database", async ()=>{
        const newRestaurant= await Restaurant.findOne({Name:"Fresh Hot"})
        restaurantId= newRestaurant._id;
        console.log(restaurantId)
        expect(newRestaurant).toBeTruthy()
      })

      it('should delete the new restaurant', async () => {
      const response = await request(app).delete(`/restaurants/${restaurantId}`)
        expect(response.status).toBe(200);
      });


      it("deleted restaurant should not exist in the database", async ()=>{
        const newRestaurant= await Restaurant.findOne({Name:"Fresh Hot"})
        console.log(newRestaurant)
        expect(newRestaurant).toBe(null)
      })
})



