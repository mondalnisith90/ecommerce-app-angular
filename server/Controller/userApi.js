const express = require("express");
const router = express.Router();
const userModel = require("../models/user_models");
const bcryptjs = require('bcryptjs');
const userAuth = require('../auth/user_auth');



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
router.put("/add-to-cart", userAuth, async (req, res)=>{
    try {
        const userId = req.userId;
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

//To update add to cart product quantity
router.put("/add-to-cart-change-quentity", userAuth, async (req, res)=>{
    try {
        const userId = req.userId;
        const {productId, quentity} = req.body;
        console.log(productId)
        const dbResponse = await userModel.findOneAndUpdate({_id: userId, "cartItems.productId": productId }, {$set: {"cartItems.$": {productId, quentity}}}, {new: true});
        if(dbResponse){
            res.status(200).json(dbResponse);
        }else{
            throw new Error();
        }
    } catch (error) {
        res.status(400).json("Invalid user id ");
    }
});



//Add product to user cart 
router.put("/remove-from-cart", userAuth, async (req, res)=>{
    try {
        const userId = req.userId;
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
router.put("/add-to-wishlist", userAuth, async (req, res)=>{
    try {
        const userId = req.userId;
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
router.put("/remove-from-wishlist", userAuth, async (req, res)=>{
    try {
        const userId = req.userId;
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
router.get("/profile", userAuth, async (req, res)=>{
    // console.log("running");
    try {
        const _id=req.userId;
        const dbResponse = await userModel.findById(_id, {email: 0, password: 0, jwtToken: 0, mobile: 0, orderItems: 0, address: 0});
        if(dbResponse){
            res.status(200).json(dbResponse);
        }else{
            throw new Error();
        }
    } catch (error) {
        res.status(400).json("Can't find user by this Id")
    }
});

//Add User Order
router.put("/order", userAuth, async (req, res)=>{
    const userId = req.userId;
    const { productId, price, quentity, delivaryAddress, pincode, contactNumber } = req.body;
    try {
        if(!productId || !price || !quentity || !delivaryAddress || !pincode || !contactNumber){
            res.status(422).json("Please fill input fields properly.");
        }else{
            const dbResponse = await userModel.findByIdAndUpdate(userId, {$push: {orderItems: req.body}}, {new: true});
            if(dbResponse){
                const allOrders = dbResponse.orderItems;
                if(allOrders.length>0){
                    const orderDetails = allOrders[allOrders.length-1];
                    console.log(orderDetails)
                    res.status(200).json(orderDetails);
                }else{
                    throw new Error();
                }
            }else{
                throw new Error();
            }
        }
    } catch (error) {
        res.status(400).json("Order not successfull, something went wrong "+error.message);
    }
});

//Change user delivery status

router.put("/update-delivary-status/:uid", async (req, res)=>{
    const userId = req.params.uid;
    const {documentId, delivaryStatus} = req.body;
    try {
        if(! delivaryStatus){
            res.status(422).json("Please fill input field properly.");
        }else{
            const dbResponse = await userModel.findOneAndUpdate({_id: userId, "orderItems._id": documentId}, {$set: {"orderItems.$.delivaryStatus": delivaryStatus}}, {new: true});
            if(dbResponse){
                res.status(200).json(dbResponse);
            }else{
                throw new Error();
            }
        }
    } catch (error) {
        res.status(400).json("Invalid User Id");
    }
});

router.get("/my-orders", userAuth, async (req, res)=>{
    const userId = req.userId;
    try {
        const dbResponse = await userModel.findById(userId, {username: 0, mobile: 0, email: 0, password: 0, address: 0, jwtToken: 0, cartItems: 0, wishlist: 0});
        if(dbResponse){
            res.status(200).json(dbResponse);
        }else{
            throw new Error();
        }
    } catch (error) {
        res.status(400).json("Invalid user");
    }

});


router.get("/logout", userAuth, async (req, res)=>{
    try {
        res.clearCookie("user_key");
        res.status(200).json("Logout successfull.");
    } catch (error) {
        res.status(400).json("Invalid user.");
    }
});



    module.exports = router;