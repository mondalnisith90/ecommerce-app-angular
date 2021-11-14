const express = require("express");
const router = express.Router();
const userModel = require("../models/user_models")



router.post("/signup", async (req, res) => {
    try {
        const { username, mobile, email, password, address } = req.body
        if (!username || !mobile || !email || !password || !address) {
            res.status(422).json("Enter all fields properly")
        } else {
            const userData = userModel(req.body)
            const saveData = await userData.save()
            console.log(saveData);
            res.status(201).json(saveData)
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
            dbResponse = await userModel.findOne({ email, password })
            if (dbResponse) {
                res.status(200).json(dbResponse)
            } else {
                res.status(400).json("Invalid login Creadentials")
            }
        }

    } catch (error) {
        res.status(400).json("Invalid login Creadentials")
    }
});

//get profiles by Id
router.get("/profile/:uId", async (req, res)=>{
    // console.log("running");
    try {
        const _id=req.params.uId;
        const dbResponse = await userModel.findById(_id)
        res.status(200).json(dbResponse)

    } catch (error) {
        res.status(400).json("Can't find user by this Id")
    }
}),





    module.exports = router;