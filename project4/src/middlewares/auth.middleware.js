const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

async function authMiddleware (req, res, next) {   
    const token = req.cookies.token;

    if (!token) { 
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try { 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findOne({ _id: decoded.id }).select("-password"); // optional: exclude password

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;   // attach user to request
        next();            // move to next middleware or route
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token Please Login Again' });
    }
}

module.exports = authMiddleware;
