const express = require('express');
const cookieParser = require('cookie-parser');
const authroutes = require('./routes/auth.routes');
const postroutes = require('./routes/post.routes');
const app = express();


app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authroutes)
app.use('/api/posts',postroutes);

module.exports = app; 