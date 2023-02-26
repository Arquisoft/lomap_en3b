"use strict";
//user endpoints=this file will be responsible for user related queries.
const router=require("express").Router();
const bcrypt=require("bcrypt")
const User=require(".../models/User");

//create a Location & storing it
router.post("/register", async(req, res)=>{
    const user=new User(req.body);
    try {
        //password generation
        const salt=await bcrypt.genSalt(10);
        const cyrptedpasswd=bcrypt.hash(req.payload.password, salt);
        //Creating the actual user object
        const user=new User({
            username :req.body.username,
            email:req.body.email,
            password:cyrptedpasswd,
        })
        const savedUser=await user.save();

        res.status(200).json(savedUser._id);

    }catch(err){
        console.log("\x1b[31m","[FAILED] The user could not be registered. ");
        res.status(500).json(err);
    }
})


//Get all users stored
router.get("/users", async(req, res)=>{

    try {
        const users = await User.find();
        res.status(200).json(users);//to send the retrieved  users using json format.
        console.log("\x1b[32m", "[SUCCESS] Location saved successfully!");
    }catch(err){
        console.log("\x1b[31m","[FAILED] There was a problem retrieving the users from the database. ");
        res.status(500).json(err);
    }
})

