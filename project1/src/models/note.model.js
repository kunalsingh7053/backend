const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title:String,
    descripton:String,
})

const noteModel = mongoose.model("note",noteSchema);


module.exports = noteModel;