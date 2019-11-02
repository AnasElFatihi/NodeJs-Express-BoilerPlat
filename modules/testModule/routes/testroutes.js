const router = require('express').Router();


const { verifyToken} = require ('../../authModule/middlewares/tokenFilters');


router.get('/test', [verifyToken],async (req, res) => {

    return res.json({
        message:"Middleware passed ! "
    })
});

module.exports= router;