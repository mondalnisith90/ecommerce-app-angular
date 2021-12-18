const jwt = require('jsonwebtoken');
const userModel = require('../models/user_models');


const userAuth = async (req, res, next)=>{
    try {
        const jwtToken = req.cookies.user_key;
        const tokenPaylod = await jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        const userId = tokenPaylod._id;
        const dbResponse = await userModel.findOne({_id: userId, jwtToken: jwtToken});
        if(dbResponse){
            req.userId = userId;
            next();
        }else{
            throw new Error();
        }
    } catch (error) {
        res.status(401).json("unauthorized user. First Signup or SignIn.");
    }
}

module.exports = userAuth;