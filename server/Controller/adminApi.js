const express = require('express');
const router = express.Router();
const adminModel = require('../models/admin_model');
const { route } = require('./userApi');

router.post("/signup", async (req, res)=>{
    const {userName, email, password} = req.body;
    try {
        if(!userName || !email || !password){
            res.status(422).json("Please fill input fields properly.");
        }else{
            const dbResponse = await adminModel.findOne({email});
            if(dbResponse){
                throw new Error(" This email address already exist.");
            }else{
                const newAdmin = new adminModel({userName, email, password});
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
                res.status(200).json(dbResponse);
            }else{
                throw new Error();
            }
        }
    } catch (error) {
        res.status(400).json("Invalid login Creadentials");
    }
});


router.put("/add-customer-order/:uid", async (req, res)=>{
    const adminId = req.params.uid;
    const {customerId, productId, price, quentity, delivaryAddress, pincode, contactNumber} = req.body;
    try {
        if(!customerId ||  !productId ||  !price ||  !quentity ||  !delivaryAddress || !pincode || !contactNumber){
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

router.get("/profile/:uid", async (req, res)=>{
    const adminId = req.params.uid;
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


module.exports = router;