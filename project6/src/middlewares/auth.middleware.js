const userModel = require('../models/user.model');
const jwt = require("jsonwebtoken")


async function authUser(req,res,next)
{
    const {token} = req.cookies;

    if(!token)
    {
       return res.status(401).send({message: "Not authorized"})

    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const user = await userModel.findById(decoded.id)
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({message: "Not authorized"})
    }
}

module.exports = {
    authUser
}