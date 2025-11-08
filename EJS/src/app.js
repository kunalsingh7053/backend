const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.set("view engine","ejs");

app.post("/api/auth/register",(req,res)=>{
    res.send("Register Endpoint");
})

app.get("/",(req,res)=>{
res.render("index",{messages:[
"Welcome to the Home Page",
"Enjoy your stay!",
"Feel free to explore the site.",
"Contact us for more information."
]});
})

module.exports = app;