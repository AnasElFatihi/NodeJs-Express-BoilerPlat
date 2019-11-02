
const User = require('../../userModule/model/User');
const { registerValidation } = require('../../userModule/validationSchemas/RegisterSchema');

const checkRegisterSchemaValidation = async (req, res, next) => {

    const { error } = registerValidation(req.body)

    if (error) {

        errorMessages = new Array();
        error.details.forEach(element => {
            errorMessages.push(element.message)
        });
        return res.status(400).json({
            status:false,
            errors:  errorMessages
        });
    }
    next();
}

const checkEmailExist = async (req, res,next) => {

    user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({
            status:false,
            message: "Email already Exist"});
    }
    next();
}



module.exports.checkRegisterSchemaValidation = checkRegisterSchemaValidation;
module.exports.checkEmailExist = checkEmailExist;
