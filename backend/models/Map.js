"use strict";
const mongoose = require("mongoose");

import { Location } from ".";

const MapSchema = new mongoose.Schema({
    locations: {
        type: [Location],
        required: false
    },
    podId: {
        type: String,//?
        required: true
    },
    //locations set?


});
module.exports = mongoose.model("Map", MapSchema);