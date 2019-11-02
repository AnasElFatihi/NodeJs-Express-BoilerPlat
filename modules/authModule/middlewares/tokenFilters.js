const jwt = require('jsonwebtoken');
const User = require('../../userModule/model/User');

const verifyToken = async (req,res,next) => {

    const token = req.header('token');
    if( ! token )
        return res.status(401).json({
            status : false,
            message : "ACCESS DENIED"
        });

    try{
        //verify the token
        const verified = jwt.verify(token,process.env.JWT_SECRET || "SECRET");
        //retrieve the user making the request
        const user = await User.findOne({ _id :verified.id})
        //put the user object in the req so it will be available for the other middlewears :)
        req.user=user;
        next(); 
    }catch(e){
        // bad token :(
        return res.status(401).json({
            status :false,
            message:"Invalid token :)"
        });
    }
}
module.exports.verifyToken = verifyToken;