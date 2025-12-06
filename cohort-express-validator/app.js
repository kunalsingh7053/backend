const express = require('express');
const validations = require('./middleware/express.validator');
const app = express();


app.use(express.json());

app.post("/register",validations.registerValidationRules,(req,res)=>{
    const {name,email,password} = req.body;

})


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})

