const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');



const uri = 'mongodb+srv://Omnific:Omnific@carsdata.h3p5q2a.mongodb.net/carData?retryWrites=true&w=majority';


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(uri);
  console.log("database Connected");
}

const carDataSchema = new mongoose.Schema({
    name: String,
    engine: String,
    Price: String,
    mileage: String,
    maxSpeed: String,
    time: String, 
    img: String,
    category: String
  });


const carsData = mongoose.model('cars', carDataSchema);

const server = express();
server.use(cors());
server.use(bodyParser.json());



server.post("/carData", (req, res)=>{

    let data = new carsData();
    data.name = req.body.name
    data.engine = req.body.engine
    data.Price = req.body.Price
    data.mileage = req.body.mileage
    data.maxSpeed = req.body.maxSpeed
    data.time = req.body.time
    data.img = req.body.img
    data.category = req.body.category
    data.save();

    res.send(req.body);
    console.log(req.body);
})


server.get("/carData", async (req, res)=>{
  try{

    const allCars = await carsData.find({});
    res.json({status: "ok", data: allCars})
  }catch(error){
    console.log(error);
  }
})

server.listen("8080", (req, res) => {
  console.log(" Server Started ");
});
