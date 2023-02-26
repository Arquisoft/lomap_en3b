"use strict";
const mongoose =require("mongoose");

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        min:2,
        max:20,
        required:true //we could also make it non required, and just display the userid

    },
    surname:{
        type:String,
        min:2,
        max:40,

    },
    userid:{
        //not the pod id but the unique identifier of the user within the app.
        type:String,
        min:4,
        max:15,
        required:true

    },
    email:{
        //not the pod id but the unique identifier of the user within the app.
        type:String,
        min:4,
        max:15,
        required:true

    },
    //Any other way to store it?
    password:{
        type:String,
        required:true,
        min:8
    },

    podId:{
        type:String,//?
        required:true
    },
    //locations set?


});
module.exports=mongoose.model("User",UserSchema);