const express = require('express');
const userModel = require('../models/user.models');
const jwt = require("jsonwebtoken");
const router = express.Router();


//1.
router.post('/register',async (req,res)=>{
  const {username,password} = req.body;
  const checkuser = await userModel.findOne({
    username
  })
  if(checkuser)
  {
    return res.status(409).json({
      message:"username aleready in use."
    })
  }
const user = await userModel.create({
    username,password
})
const token = jwt.sign({
  id:user._id
},process.env.JWT_SECRET)
res.cookie("token",token,{
  expires:new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
});
res.status(201).json({
    message:"user registered successfully",
    user,
    
})

})

//2.
router.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    const user = await userModel.findOne({
        username:username
    })
    if(!user)
    {
        return res.status(401).json({
            message:"invalid username "
        })
    }
  const isPassworddValid = password == user.password;
  if(!isPassworddValid)
  {
    return res.status(401).json({
        message:"invalid  password"
    })
  }
  const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
  res.cookie("token",token,{
    expires:new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
  })
  res.status(200).json({
    message:"user login successfully",
    user:user,
  })
})

//3.
router.get("/user",async(req,res)=>{
 const {token} = req.cookies;
 if(!token){
  return res.status(401).json({
    message:"Unauthorized"
  })
 }
 try{

   const decoded = jwt.verify(token,process.env.JWT_SECRET);
   const user = await userModel.findOne({
    _id:decoded.id
   }).select("-password -__v").lean();
   res.status(200).json({
    message:"user data fetched successfully",
    user:user
   }) 
 }
 catch(err)
 {
  return res.status(401).json({message:"Unauthorized"})
 }

})

router.get('/logout',async(req,res)=>{
  res.clearCookie("token");
  res.status(200).json({
    message:"user logged out successfully"
  })
})




module.exports = router;