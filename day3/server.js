const express = require("express");

const app = express();//create server
app.get('/home',(req,res)=>{
res.send("welcome to a home page");
})

app.get('/about',(req,res)=>{
    res.send("welcome to a about page");
})

app.listen(3000,()=>{
    console.log("Server start at 3000 port");
})