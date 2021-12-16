const express = require("express");
const router = express.Router();
const userModel = require("../models/user_models");
const bcryptjs = require('bcryptjs');



router.post("/signup", async (req, res) => {
    try {
        const { username, mobile, email, password, address } = req.body
        if (!username || !mobile || !email || !password || !address) {
            res.status(422).json("Enter all fields properly")
        }
        else {
            const dbResponse = await userModel.findOne({email});
            if(dbResponse){
                throw new Error(" This email address already exist.");
            }else{
                const userData = userModel(req.body)
                const saveData = await userData.save()
                console.log(saveData);
                res.status(201).json(saveData)
            }
        }

    } catch (error) {
        res.status(400).json("User Registration failed "+error.message)
    }
});


router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(422).json("Enter fields properly")
        } else {
            dbResponse = await userModel.findOne({ email })
            if (dbResponse) {
                //check hash password
                const ispasswordMatched = await bcryptjs.compare( password, dbResponse.password);
                if(ispasswordMatched){
                    //If password is matched
                    const jwtToken = await dbResponse.createJWTToken();
                    console.log(jwtToken);
                    res.cookie("user_key", jwtToken, {expires: (new Date(Date.now() + 5184000000)), httpOnly: true});
                    res.status(200).json(dbResponse);
                }else{
                    throw new Error();
                }
         
            } else {
                throw new Error();
            }
        }

    } catch (error) {
        res.status(400).json("Invalid login Creadentials"+error.message)
    }
});

//Add product to user cart 
router.put("/add-to-cart/:uid", async (req, res)=>{
    try {
        const userId = req.params.uid;
        const {productId, quentity} = req.body;
        // console.log(userId, productId)
        const dbResponse = await userModel.findByIdAndUpdate(userId, {$push: {cartItems: {productId, quentity}}}, {new: true});
        if(dbResponse){
            res.status(200).json(dbResponse);
        }else{
            throw new Error();
        }
    } catch (error) {
        res.status(400).json("Invalid user id");
    }
});


//Add product to user cart 
router.put("/remove-from-cart/:uid", async (req, res)=>{
    try {
        const userId = req.params.uid;
        const {productId} = req.body;
        // console.log(userId, productId)
        const dbResponse = await userModel.findByIdAndUpdate(userId, {$pull: {cartItems: {productId}}}, {new: true});
        if(dbResponse){
            res.status(200).json(dbResponse);
        }else{
            throw new Error();
        }
    } catch (error) {
        res.status(400).json("Invalid user id");
    }
});


//Add product to user cart 
router.put("/add-to-wishlist/:uid", async (req, res)=>{
    try {
        const userId = req.params.uid;
        const productId = req.body.productId;
        console.log(userId, productId)
        const dbResponse = await userModel.findByIdAndUpdate(userId, {$push: {wishlist: {productId}}}, {new: true});
        if(dbResponse){
            res.status(200).json(dbResponse);
        }else{
            throw new Error();
        }
    } catch (error) {
        res.status(400).json("Invalid user id");
    }
});


//Add product to user cart 
router.put("/remove-from-wishlist/:uid", async (req, res)=>{
    try {
        const userId = req.params.uid;
        const productId = req.body.productId;
        console.log(userId, productId)
        const dbResponse = await userModel.findByIdAndUpdate(userId, {$pull: {wishlist: {productId} }}, {new: true});
        console.log(dbResponse);
        if(dbResponse){
            res.status(200).json(dbResponse);
        }else{
            throw new Error();
        }
    } catch (error) {
        res.status(400).json("Invalid user id");
    }
});



//get profiles by Id
router.get("/profile/:uId", async (req, res)=>{
    // console.log("running");
    try {
        const _id=req.params.uId;
        const dbResponse = await userModel.findById(_id);
        if(dbResponse){
            res.status(200).json(dbResponse);
        }else{
            throw new Error();
        }
    } catch (error) {
        res.status(400).json("Can't find user by this Id")
    }
});





    module.exports = router;