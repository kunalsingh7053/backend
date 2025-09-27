const userModel = require('../models/user.model')
const bcrypt  = require("bcryptjs");
const jwt = require('jsonwebtoken');

async function registerUser(req,res){
    const {fullName:{firstName,lastName},email,password} = req.body;
    
    const isUserAlereadyExists = await userModel.findOne({email})

    if(isUserAlereadyExists)
    {
        return res.status(400).json({message:"👦User already registered! Please login."});

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
        return res.status(400).json({message:"Invalid Email "})
     }
     const isPasswordValid = await bcrypt.compare(password,user.password);

     if(!isPasswordValid){
        return res.status(400).json({message:"Invalid  Password"})
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
async function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({message:"Logout successful"});


}
async function profileUser(req,res){
      res.json(req.user);

}
async function removeProfileUser(req,res){
 try {
        // req.user comes from auth middleware (logged-in user)
  
         const detectUser = await userModel.findByIdAndDelete(req.user._id)

         if(!detectUser){

         return res.status(404).json({message:"User not found"});
         }
         // Clear token cookie
    res.clearCookie("token");

    res.status(200).json({ message: "User deleted successfully" });

 } catch (error) {
        console.error(err);
    res.status(500).json({ message: "Server error" });

 }

}
async function updateProfileUser(req, res) {
  try {
    const userId = req.user._id; // from auth middleware
    const user = await userModel.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { firstName, lastName, oldpassword, newpassword } = req.body;

    // Verify old password if new password is provided
    if (newpassword) {
      const isValid = await bcrypt.compare(oldpassword, user.password);
      if (!isValid) {
        return res.status(400).json({ message: "Invalid Old Password" });
      }
    }

    // Build update object
    const updateData = {};
    if (firstName) updateData['fullName.firstName'] = firstName;
    if (lastName) updateData['fullName.lastName'] = lastName;
    if (newpassword) updateData.password = await bcrypt.hash(newpassword, 10);

    // Update user
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated successfully!",
      user: {
        _id: updatedUser._id,
        email: updatedUser.email,
        fullName: `${updatedUser.fullName.firstName} ${updatedUser.fullName.lastName}`,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

 module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    profileUser,
    removeProfileUser,
    updateProfileUser
};

