const mongoose = require("mongoose");






function connectToDB()
{
mongoose.connect("mongodb+srv://kunalsingh7053:hGrdvOWLuXyaSAYX@cluster0.mo75uyr.mongodb.net/cohort")

.then(()=>{
    console.log("connected to DB");
})
}





module.exports = connectToDB;





