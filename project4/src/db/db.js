const mongoose = require('mongoose');





function connectDB() {

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log('Database connected successfully');
})
.catch((err)=>{
    console.error('Database connection failed:', err);
})

}

module.exports = connectDB;