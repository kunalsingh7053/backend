const mongoose = require("mongoose");
require('dotenv').config();  




function connectToDB()
{
mongoose.connect(process.env.MONGODB_URI)

.then(()=>{
    console.log("connected to DB");
})
}





module.exports = connectToDB;





