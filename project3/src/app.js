const express = require("express");
const authRouter = require('./routes/auth.routes');
const cookieParser = require("cookie-parser");
const app = express();

/*
post/auth/register 
post/auth/login
get/auth/user 
get/auth/logout
*/
app.use(express.json());
app.use(cookieParser());//app level middleware jo middleware app mai use honge to pure apllication mai use hoga.
app.use('/auth', authRouter);

module.exports = app;