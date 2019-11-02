const User = require('../../userModule/model/User');
const { loginValidation } = require('../../userModule/validationSchemas/LoginSchema');
const  bcrypt  = require ('bcryptjs');

const checkLoginSchemaValidation =async (req, res, next) => {

    const { error } = loginValidation(req.body)

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
const checkEmailNotExist = async (req, res,next) => {

    user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({
            status:false,
            message: "Email doesn't Exist"});
    } 
    next();
}

const verifyPassword = async (req, res,next) => {

    user = await User.findOne({ email: req.body.email });
    if(! await bcrypt.compare(req.body.password,user.password)  )
        {
            return res.status(400).json({
            status:false,
            message: "Wrong password"});
        }
    req.user = user;
    next();
}
module.exports.checkLoginSchemaValidation = checkLoginSchemaValidation;
module.exports.checkEmailNotExist=checkEmailNotExist;
module.exports.verifyPassword=verifyPassword;