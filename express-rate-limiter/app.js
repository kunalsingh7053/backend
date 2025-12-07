const express = require('express');

const app = express();
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 15 minutes
    max:10, // Limit each IP to 1 request per windowMs
    message: "Too many requests, please try again later."
})
app.use(express.json());
app.use(limiter);// Apply the rate limiting middleware to all requests

app.post("/api/auth/register",(req,res)=>{

const { username, password } = req.body;
if (!username || !password) {
    return res.status(400).json({
        message: "Username and password are required",
    });
}

    res.status(200).json({
        message: "User registered successfully",
    })
})



app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
