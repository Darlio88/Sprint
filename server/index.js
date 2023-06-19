const mongoose = require("mongoose");



//server
const app = require("./server")


const PORT = process.env.PORT || 4000;
// const MONGODB_URI="mongodb+srv://Omoding:hM1YjWC0QAvstB1e@cluster0.d7tyc.mongodb.net/?retryWrites=true&w=majority"
// const MONGODB_URI=process.env.MONGO_DB_URI
const MONGODB_URI='mongodb://localhost:27017/localDB';
mongoose.connect('mongodb://127.0.0.1:27017/localDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(4000,()=>{
        console.log("app running on port 4000")
    })
  }).catch((err) => {
    console.error('Error connecting to MongoDB', err);
  })
