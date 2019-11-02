const Joi = require('@hapi/joi')

const registerValidation = data => {
    const schema = Joi.object({
        name:Joi
            .string()
            .min(6)
            .required()
            .error(() => 'Name is required')
            ,
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

module.exports.registerValidation = registerValidation;
