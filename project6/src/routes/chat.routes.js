const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router()
//post:/api/chat/
router.post('/',authMiddleware.authUser,)
module.exports = 
{
    router
}