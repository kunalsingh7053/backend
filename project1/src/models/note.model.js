const mongoose = require("mongoose");

//title & description
/*
title & description =>type=>string 

*/

const noteSchema = new mongoose.Schema({
title:String,
description:String,

})

const noteModel = mongoose.model("note",noteSchema);

module.exports = noteModel;