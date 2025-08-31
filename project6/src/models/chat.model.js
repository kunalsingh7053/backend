const mongoose = require("mongoose")

const chatSchema =  new mongoose.Schema({
user:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    require:true
},
title:{
    type:String,
    required:true
},

},{
    timestamps: true
})
const chatModel = mongoose.model("Chat", chatSchema)