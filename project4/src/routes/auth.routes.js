//routes kon-kon se hain.
const express = require('express');

const router = express.Router();
const {
    registerController,
    loginController
} = require('../controllers/auth.controller');

//1.post/register/login
router.post('/register',registerController)


//2.post/login
router.post('/login',loginController)



//3.get/user[protected]



//4.get/logout





module.exports = router;