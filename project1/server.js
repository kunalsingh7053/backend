const express = require("express");
const app = express();

let notes = [];
app.use(express.json());//middleware
app.get('/',(req,res)=>{
    res.json({
        message:"Hellow Cohort"
    })
})
app.post('/notes',(req,res)=>{
    notes.push(req.body);
    res.json({
        message:"Note Create Successfully"
    })
})
app.get('/notes',(req,res)=>{
   res.json(notes);
})
app.delete('/notes/:index',(req,res)=>{
    const index = req.params.index;
    delete notes[index];
    res.json({
        message:"Note Deleted Successfully"
    })
})
app.patch('/notes/:index',(req,res)=>{
    const index = req.params.index;
    const {title} = req.body;
    const {description} = req.body;
    notes[index].title = title;
    notes[index].description = description;
    res.json({
        message:"Note Update Successfully"
    })


})


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})