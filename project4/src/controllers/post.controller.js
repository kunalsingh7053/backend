const postModel = require('../models/post.model.js');
const generateCaption = require('../service/ai.service.js');
async function  createPostController(req,res){
    const file = req.file;
        console.log(file);
    const base64ImageFile =  Buffer.from(file.buffer).toString('base64');
    console.log(base64ImageFile);

    const caption = await generateCaption(base64ImageFile);

    res.json({
        caption
    })
}
module.exports = {
    createPostController

};