const express = require('express');




const app = express();
app.use(express.json());


app.get('/',(req,res)=>{
    res.status(200).send('Hello World');
})

app.post('/api/auth/register',(req,res)=>{
    const {username,password,email} = req.body;

    if(!username || !password || !email){
        return  res.status(400).send('All fields are required');
    }
    res.status(201).send('User registered successfully');
    
})


module.exports = app;