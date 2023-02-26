"use strict";
//Location endpoints=this file will be responsible for Location related queries.
const router=require("express").Router();

const Location=require(".../models/Location");

//create a Location & storing it
router.post("/locations", async(req, res)=>{
        const location=new Location(req.body);
        try {
            const savedLoc = await location.save();
            res.status(200).json(savedLoc);
            console.log("\x1b[32m", "[SUCCESS] Location saved successfully!");
        }catch(err){
            console.log("\x1b[31m","[FAILED] The location could not be inserted. ");
            res.status(500).json(err);
        }
})


//Get all locations stored
router.get("/locations", async(req, res)=>{
    const location=new Location(req.body);
    try {
        const allLocations = await location.find();
        res.status(200).json(allLocations);//to send the retrieved locations using json format.
        console.log("\x1b[32m", "[SUCCESS] The set of Locations was retrieved successfully!");
    }catch(err){
        console.log("\x1b[31m","[FAILED] There was a problem retrieving the files from the database. ");
        res.status(500).json(err);
    }
})


