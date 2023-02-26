"use strict";
const express=require("express");
const mongoose=require("mongoose");
const env= require("dotenv");

const application=express();
application.use(express.json())//For our LoMap's api to be able to use json.


env.config();

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(()=>{
            console.log("\x1b[32m", "[SUCCESS] Connected to the MongoDb cluster successfully!");
    }).catch((err)=>console.log("\x1b[31m","[FAILED] Connection to MongoDb")


);

application.listen(7800,()=>{console.log("\x1b[32m", "[SUCCESS] Backend works :) ")})