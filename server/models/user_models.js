const mongoose=require("mongoose");
const validator= require("validator");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema =new mongoose.Schema({
    username:{
        required: true,
        type:String,
        minlenth:[3,"Username must be atleast 3 characters"]

    },
    userType: {
        type: String,
        default: "user"
    },
    mobile:{
        required:true,
        type:Number
    },
    email:{
        unique:[true,"This email is already registered with us"],
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error("Invalid Email address");
            }
        }
    },
    password:{
        required:true,
        type:String,
        minlenth: 6,

    },
    address:{
        type:String
    },
    cartItems:{
        type:[{
            productId: {
                type: String
            },
            quentity: {
                type: Number,
                default: 1
            },
            timeStamp: {
                type: Date,
                default: new Date(Date.now())
            }
        }]
    },
    wishlist: {
        type: [
            {
               productId: {
                   type: String
               },
               timeStamp: {
                type: Date,
                default: new Date(Date.now())
            }
            }
        ]
    },
    orderItems: {
        type: [{
            productId: {
                type: String
            },
            price: {
                type: Number
            },
            quentity: {
                type: Number
            },
            delivaryAddress: {
                type: String
            },
            pincode: {
                type: Number
            },
            contactNumber: {
                type: String
            },
            delivaryStatus: {
                //If the product is already deliver then this field value will be true
                type: String,
                default: "pending" //It's value will be either pending, successfull, cancel.
            },
            
            timeStamp: {
                type: Date,
                default: new Date(Date.now())
            }
        }]
    },
    jwtToken:{
        type: String,
        default: ""
    }
    
})

userSchema.pre("save", async function(req, res, next){
    if(this.isModified("password")){
        try{
            const hashPassword = await bcryptjs.hash(this.password, 12);
            this.password = hashPassword;
            next();
        }catch(error){
            throw new Error();
        }
    }
});

userSchema.methods.createJWTToken = async function (){
    try {
        const jwtTokenKey = await jwt.sign({_id:  this._id}, process.env.JWT_SECRET_KEY);
        this.jwtToken = jwtTokenKey;
        await this.save();
        return jwtTokenKey;
    } catch (error) {
        console.log(error.message)
        throw new Error();
    }
}




userModel= mongoose.model("uesrCollection",userSchema);
module.exports=userModel;