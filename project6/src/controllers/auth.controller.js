const userModel = require('../models/user.model')
const bcrypt  = require("bcryptjs");
const jwt = require('jsonwebtoken');

async function registerUser(req,res){
    const {fullName:{firstName,lastName},email,password} = req.body;
    
    const isUserAlereadyExists = await userModel.findOne({email})

    if(isUserAlereadyExists)
    {
        return res.status(400).json({message:"user already exists"});

    }
    const user = await userModel.create({
        fullName:{
            firstName,lastName
        },
        email,
        password:await bcrypt.hash(password,10)
    })
   const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(201).json({
        message:"User registered successfully",
        user:{
            email:user.email,
            _id:user._id,
fullName: `${user.fullName.firstName} ${user.fullName.lastName}`


        }
    })
}
async function loginUser(req,res){
    const {email,password} = req.body;
    const user = await userModel.findOne({email})

     if(!user)
     {
        return res.status(400).json({message:"Invalid email or password"})
     }
     const isPasswordValid = await bcrypt.compare(password,user.password);

     if(!isPasswordValid){
        return res.status(400).json({message:"Invalid email or password"})
     }
     const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
     res.cookie("token",token)
     res.status(200).json({
        message:"Login successful",
         user:{
            email:user.email,
            _id:user._id,
fullName: `${user.fullName.firstName} ${user.fullName.lastName}`

        }
        
     })
}
 module.exports = {
    registerUser,
    loginUser
};

