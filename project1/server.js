const express = require("express");
const app = express();
const connectToDB = require("./src/db/db");
const noteModel = require("./src/models/note.model");
connectToDB();

app.use(express.json()); //middlewear
app.post('/notes',async (req,res)=>{
    const {title} = req.body;
    const {description} = req.body;

   await noteModel.create({
        title:title,
        descripton:description
    })
    res.json({
        message:"note created successfuly"
    })
})
app.get('/notes',async (req,res)=>{
 
    const notes = await noteModel.find();
    res.json(notes);

})
app.delete('/notes/:id',async(req,res)=>{
    const id = req.params.id;
    await noteModel.findOneAndDelete({
        _id:id
    })
    res.json({
        message:"note deleted successfuly"
    })
})
app.patch('/notes/:id',async (req,res)=>{
    const id = req.params.id;
    const {title}  = req.body;
    const {description}  = req.body;
await noteModel.findOneAndUpdate({
    _id:id
},{
    title:title,
    descripton:description
})
res.json({
    message:"note update successfuly"
})

})


app.listen(3000,()=>{
    console.log("server is running on port 3000")
})