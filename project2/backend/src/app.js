const express = require('express');

const songRoutes = require("./routes/song.routes");
const cors = require('cors')
const app = express();

app.use(cors());//middleware for CORS
app.use(express.json());//middleware to parse JSON bodies

app.use('/', songRoutes);




module.exports = app; 