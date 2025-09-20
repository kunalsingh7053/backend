const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const chatController = require('../controllers/chat.controller')
const router = express.Router()
//post:/api/chat/
router.post('/',authMiddleware.authUser,chatController.createChat)


//get
router.get('/',authMiddleware.authUser,chatController.getChats)
module.exports = router  