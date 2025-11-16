const express = require("express");
const productRoutes = require('./routes/product.routes');
const cors = require('cors');
const app = express();
const paymentRoutes = require('./routes/payment.route');

//middleware
app.use(cors());
app.use(express.json());
app.use('/api/products',productRoutes);
app.use('/api/payments',paymentRoutes);

module.exports = app; 