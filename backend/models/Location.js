"use strict";
const mongoose=require("mongoose");
const locationSchema=new mongoose.Schema({
    latitude:{
        type:Number,
        required:true

    },
   longitude:{
        type:Number,
        required:true

    }
    ,altitude:{
        type:Number
    },
    user:{
        type:String,
        required:true
    },
    description:{//from google maps? Are we having a given description + the users review? or just the review?
        
        type:String
    }
});
    //list of reviews?
    module.exports=mongoose.model("Location",locationSchema);
//field of privacy level?