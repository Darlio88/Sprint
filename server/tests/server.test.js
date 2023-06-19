const request= require("supertest")
const mongoose = require("mongoose");
//models
const {Users}= require("../models/userModel")
const {Restaurant} = require("../models/restaurantModel")



//server
const app = require("../server")
const decoder = require("../utils/jwtDecoder")


const PORT = process.env.PORT || 4500;

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

let userId=""
  describe('User API Tests', () => {
    it('should create a new user', async () => {
      const user = { FullName: 'John Doe', Email: 'john@example.com', Password:"0785124779DAN*"};
      const response = await request(app).post('/users/signup').send(user);
      let regex=/[A-Za-z0-9]+/
      userId=decoder(response.body.token)
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
    
    //   it('should create a new restaurant', async () => {
    //     const restaurant = {Name:'Fresh Hot', AvgPrice:100,};
    //     // let form = new FormData()
    //     // form.append("Name","Fresh Hot");
    //     // form.append("Location","Wandegeya");
    //     // form.append("AvgPrice",100);
    //     // form.append("CreatedBy",userId);
    //     // form.append("Cuisine","American");

    //     const filePath = "../images/digital-art.png"; 

    
    //     const response = await request(app).post('/restaurants/create').field("Name","Fresh Hot").field("Location","Wandegeya").field("CreatedBy",userId).field("AvgPrice",100).field("Cuisine","American").attach("image",filePath);        
    //     expect(response.status).toBe(201);
    //     expect(response.body).toEqual("restaurant successfully created");
    //   });
    
})