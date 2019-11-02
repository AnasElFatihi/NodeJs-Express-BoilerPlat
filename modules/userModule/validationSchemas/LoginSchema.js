const Joi = require('@hapi/joi')

const loginValidation = data => {
    const schema = Joi.object({
        email:Joi.string()
            .min(6)
            .required()
            .email()
            .error(() => 'Email is required'),
        password:Joi.string()
            .min(6)
            .required()
            .error(() => 'Password is required'),
    });
    
    return schema.validate(data,{abortEarly: false});
}

module.exports.loginValidation = loginValidation;
