const mongoose = require('mongoose');
const validator= require("validator");

const adminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        default: "admin"
    },
    email: {
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
    customerOders: {
        type: [{
            customerId: {
                type: String
            },
            productId: {
                type: String
            },
            customerOrderId: {
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
    }
});

const adminModel = mongoose.model("adminCollection", adminSchema);

module.exports = adminModel;
