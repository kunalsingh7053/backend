//routes kon-kon se hain.
const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const {
    registerController,
    loginController
} = require('../controllers/auth.controller');

//1.post/register
router.post('/register',registerController)
router.post('/login',loginController)


//2.post/login



//3.get/user[protected]



//4.get/logout





module.exports = router;