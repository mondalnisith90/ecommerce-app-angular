const jwt = require('jsonwebtoken');
const adminModel = require('../models/admin_model');

const adminAuth = async (req, res, next)=>{
    try {
        const jwtToken = req.cookies.user_key;
        const tokenPaylod = await jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        const adminId = tokenPaylod._id;
        const dbResponse = await adminModel.findOne({_id: adminId, jwtToken: jwtToken});
        if(dbResponse){
            req.adminId = adminId;
            next();
        }else{
            throw new Error();
        }
    } catch (error) {
        res.status(401).json("unauthorized user. First Signup or SignIn.");
    }
}

module.exports = adminAuth;





