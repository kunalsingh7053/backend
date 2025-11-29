const postModel = require('../models/post.model.js');
const generateCaption = require('../service/ai.service.js');
const uploadFile = require('../service/store.service.js');
const {v4:uuidv4} = require('uuid');
async function  createPostController(req,res){
    const file = req.file;
        console.log(file);
    const base64ImageFile =  Buffer.from(file.buffer).toString('base64');
    console.log(base64ImageFile);
 
    const caption = await generateCaption(base64ImageFile);
   const result = await uploadFile(file.buffer,`${uuidv4()}`);
   const post = await postModel.create({
       image:result.url,
    caption:caption,
    user:req.user._id
    
   })
    res.status(201).json({
        message:"post created successfully",
        post:post
    })
}
module.exports = {
    createPostController

};