require('dotenv').config();
const express =require("express");
const mongoose=require("./DB_Con/DB_con")
const userApi=require("./Controller/userApi")
const productsApi=require("./Controller/productApi")
const adminApi = require('./Controller/adminApi');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app=express()

const port =process.env.PORT||8002
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: true, credentials: true}));
app.use("/user",userApi);
app.use("/products",productsApi);
app.use("/admin",adminApi);



app.listen(port,()=>{
    console.log("Server running at port no: "+port )
})
