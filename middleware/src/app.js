const express = require('express');
const app = express();
const indexRoutes = require("./routes/index.routes")

app.use(express.json());
app.use((req,res,next)=>{
    console.log("This middleware is between app and route");
    next();
})
app.use('/',indexRoutes);

module.exports = app;


