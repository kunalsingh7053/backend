const express = require("express");

const app = express() //server created.

app.get('/home',(req,res)=>{
    res.send("Welcome To The Home Page")
})
app.get('/about',(req,res)=>{
res.send('Welcome To The About Page');
})
app.listen(3000,()=>{
    console.log("Server is Running on Port 3000");
})

