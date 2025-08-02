const express = require("express");
const connectToDB = require("./src/db/db.js");
connectToDB();
const app = express();


app.use(express.json());//middleware

const notes = [];

app.get('/',(req,res)=>{
    res.send('hellow cohort')
})
app.post('/notes',(req,res)=>{
    notes.push(req.body);
    res.json({
        message:"note added successfuly",
    })
})
app.get('/notes',(req,res)=>{
    res.json(notes);

})
app.delete('/notes/:id',(req,res)=>{
    const id = req.params.id;
    delete notes[id];
    res.json({
        message:"note delete successfuly"
    })
})
app.patch('/notes/:id',(req,res)=>{
    const id = req.params.id;
    const {title} = req.body;
    const {description} = req.body;
    notes[id].title = title;
    notes[id].description = description;
      res.json({
        message:"note update successfuly"
    })
})


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})