const express = require('express');
const router = express.Router();
const adminModel = require('../models/admin_model');
const { route } = require('./userApi');
const adminAuth = require('../auth/admin_auth');

router.post("/signup", async (req, res)=>{
    const {userName, email, password} = req.body;
    const adminId = "61bb0f38ed0b84f191524c23";
    try {
        if(!userName || !email || !password){
            res.status(422).json("Please fill input fields properly.");
        }else{
            const dbResponse = await adminModel.findOne({email});
            if(dbResponse){
                throw new Error(" This email address already exist.");
            }else{
                const newAdmin = new adminModel({_id: adminId, userName, email, password});
                const response = await newAdmin.save();
                if(response){
                    res.status(201).json(response);
                }else{
                    throw new Error();
                }
            }
        }
    } catch (error) {
        res.status(400).json("Admin registration failed: "+error.message);
    }
});

router.post("/signin", async (req, res)=>{
    const {email, password} = req.body;
    try {
        if(!email || !password){
            res.status(422).json("Please fill input fields properly.");
        }else{
            const dbResponse = await adminModel.findOne({email, password});
            if(dbResponse){
                const jwtToken = await dbResponse.createJWTToken();
                res.cookie("user_key", jwtToken, {httpOnly: true});
                res.status(200).json(dbResponse);
            }else{
                throw new Error();
            }
        }
    } catch (error) {
        res.status(400).json("Invalid login Creadentials");
    }
});

router.get("/all-customer-orders", adminAuth, async (req, res)=>{
    const userId = req.adminId;
    try {
        const dbResponse = await adminModel.findById(userId, {email: 0, password: 0, userType: 0, userName: 0, jwtToken: 0});
        if(dbResponse){
            const allCustomerOrders = dbResponse.customerOders.sort((obj1, obj2)=>{return obj2.timeStamp - obj1.timeStamp});
            res.status(200).json(allCustomerOrders);
        }else{
            throw new Error();
        }
    } catch (error) {
        res.status(400).json("Invalid user id");
    }
});


router.put("/add-customer-order/:adminId", async (req, res)=>{
    const adminId = req.params.adminId;
    const {customerId, productId, customerOrderId, price, quentity, delivaryAddress, pincode, contactNumber} = req.body;
    try {
        if(!customerId ||  !productId ||  !customerOrderId || !price ||  !quentity ||  !delivaryAddress || !pincode || !contactNumber){
            // console.log(req.body);
            res.status(422).json("Please fill input fields properly.");
        }else{
            const dbResponse = await adminModel.findByIdAndUpdate(adminId, {$push: {customerOders: req.body}});
            if(dbResponse){
                res.status(200).json(dbResponse);
            }else{
                throw new Error();
            }
        }
    } catch (error) {
        res.status(400).json("Add customer order failed. "+error.message);
    }
});

//Change customer delivery status
router.put("/update-delivary-status/:adminId", async (req, res)=>{
    const adminId = req.params.adminId;
    const {customerOrderId, delivaryStatus} = req.body;
    try {
        if(! delivaryStatus){
            res.status(422).json("Please fill input field properly.");
        }else{
            const dbResponse = await adminModel.findOneAndUpdate({_id: adminId, "customerOders.customerOrderId": customerOrderId}, {$set: {"customerOders.$.delivaryStatus": delivaryStatus}}, {new: true});
            if(dbResponse){
                res.status(200).json(dbResponse);
            }else{
                throw new Error();
            }
        }
    } catch (error) {
        res.status(400).json("Invalid User Id "+error.message);
    }
});

//Get all customer orders
router.get("/customer-orders", adminAuth, async (req, res)=>{
    const adminId = req.adminId;
    try {
        const dbResponse = await adminModel.findById(adminId, {userName: 0, email: 0, password: 0});
        if(dbResponse){
            res.status(200).json(dbResponse);
        }else{
            throw new Error();
        }
    } catch (error) {
        res.status(400).json("Invalid user");
    }

});

router.get("/profile", adminAuth, async (req, res)=>{
    const adminId = req.adminId;
    try {
        const dbResponse = await adminModel.findOne({_id: adminId});
        if(dbResponse){
            res.status(200).json(dbResponse);
        }else{
            throw new Error();
        }
    } catch (error) {
        res.status(400).json("Invalid user id");
    }
});

router.get("/logout", adminAuth, async (req, res)=>{
    try {
        res.clearCookie("user_key");
        res.status(200).json("Logout successfully.");
    } catch (error) {
        res.status(400).json("Invalid user.");
    }
});


module.exports = router;