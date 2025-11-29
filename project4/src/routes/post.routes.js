const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');
const {createPostController} = require('../controllers/post.controller');
const upload = multer({storage:multer.memoryStorage()});
//1.protected routes
router.post('/',authMiddleware,upload.single('image'),createPostController)


module.exports = router;
