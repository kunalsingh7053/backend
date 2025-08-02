const express = require("express");
const connectToDB = require("./src/db/db.js");
const noteModel = require("./src/models/note.model.js")

const app = express();
connectToDB();


app.use(express.json());//middleware



app.post('/notes',async (req,res)=>{
    const {title,description} = req.body
    await noteModel.create({
        title,description
    })
    res.json({
        message:"note added successfuly",
    })
})
app.get('/notes',async (req,res)=>{
    const notes = await noteModel.find();
    res.json({
        message:"Notes fetch successfully",
        notes
    })
})
app.delete("/notes/:id",async (req,res)=>{
    const noteid = req.params.id;
    await noteModel.findOneAndDelete({
        _id : noteid
    })
    res.json({
        message:"note deleted successfully"
    })
})
app.patch("/notes/:id",async (req,res)=>{
    const noteid = req.params.id;
    const {title} = req.body;
    const {description} = req.body;
      
   await noteModel.findOneAndUpdate({
    _id:noteid
   },{
    title:title,
    description:description
   })
    res.json({
        message:"note update successfully"
    })
})


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})