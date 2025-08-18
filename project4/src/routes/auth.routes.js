const express = require('express');

const router = express.Router();
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

//1.post/register
router.post('/register',async(req,res)=>{
    const {username,password} = req.body;
     const existingUser = await userModel.findOne({
        username
     })
     if(existingUser){
        return res.status(409).json({
            message:"User already exists"
        })
     }
       const user = await userModel.create(
        {username,password}
    );
    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)

    res.cookie('token',token,{
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    })
    res.status(201).json({
        message:"User registered successfully",
        user

    })
})


//2.post/login



//3.get/user[protected]



//4.get/logout





module.exports = router;