const mongoose = require("mongoose");
require('dotenv').config();




function connectToDB()
{
    mongoose.connect(process.env.mongodb_url)
    .then(()=>{
        console.log("connected to db");
    })
}

module.exports = connectToDB;