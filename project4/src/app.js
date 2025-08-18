const express = require('express');
const authroutes = require('./routes/auth.routes');
const app = express();

app.use(express.json());
app.use('/auth',authroutes)

module.exports = app;