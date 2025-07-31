const express = require("express");
const app = express();
app.use(express.json());//middlewear
//notes => title & description
let notes = []
app.post('/notes',(req,res)=>{
    console.log(req.body)
    notes.push(req.body);
    res.json({
        message:"Note added successfully",
        notes:notes
    })
})

app.listen(3000,(req,res)=>{
    console.log("Server is running on 3000 port");
})