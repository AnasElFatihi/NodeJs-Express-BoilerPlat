const router = require('express').Router();
const User = require('../../userModule/model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { checkRegisterSchemaValidation,checkEmailExist } = require('../middlewares/registerFilter');
const { checkLoginSchemaValidation,checkEmailNotExist,verifyPassword} = require ('../middlewares/loginFilter');

router.post('/register', [checkRegisterSchemaValidation,checkEmailExist],async (req, res) => {

    //hashing the password
    salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(req.body.password,salt);

    // saving the user
    try {
        const user = new User({
            name : req.body.name,
            email:req.body.email,
            password:hashedPassword
        });
        const userSaved = await user.save();
        return res.status(200).json({
            status:true,
            message:"User created",
            user:userSaved
        });
    } catch (e) {
        return res.status(500).json({
            status:false,
            message:"An error occured"
        });
    }
});


router.post('/login', [checkLoginSchemaValidation,checkEmailNotExist,verifyPassword],async (req, res) => {

    // creating a token 
    const token = jwt.sign({id:req.user._id}, process.env.JWT_SECRET || "SECRET");

    //add token yo the header
    res.header('token',token);

    // returning response
    return res.status(200).json({
        status:true,
        message : "Logged In"
    });
    
});

module.exports = router;
