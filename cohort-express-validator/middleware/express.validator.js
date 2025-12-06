const {body, validationResult} = require('express-validator');

function validate(req,res,next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();

}

const registerValidationRules = [
    body('name').optional().isLength({min:3}).withMessage('minimum 3 character name').notEmpty().isString().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
validate,
]

module.exports = {
    registerValidationRules
}