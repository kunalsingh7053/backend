const express = require('express');
const multer = require('multer');
const router = express.Router();
const uploadFile = require('../service/storage.service');
const songModel = require('../models/song.model');

const upload = multer({storage:multer.memoryStorage()});
router.post('/songs',upload.single("audio"),async (req,res)=>{

    console.log(req.body);
    console.log(req.file);
    const filedata = await uploadFile(req.file);
    const song = await songModel({
        title:req.body.title,
        artist:req.body.artist,
        audio:filedata.url,
        mood:req.body.mood
    })
      await song.save();
    res.status(201).json({ 
        message: 'Song created successfully',
        song: song,
            
    });
})

router.get('/songs',async(req,res)=>{
    const {mood} = req.query;

   const songs = await songModel.find({
    mood:mood
   })
   res.status(200).json({
    message:"Song Fetched Successfully",
    songs
   })
})




module.exports = router;