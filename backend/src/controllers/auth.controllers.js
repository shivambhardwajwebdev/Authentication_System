const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModal = require("../models/user.model")
/**
 * @name regUserController
 * @description User Register request expects username,email,mobileNo, password 
 * @access Public
 */
async function regUserController(req,res){
    const {username,email,mobileNo,password} = req.body
    if(!username||!email||!mobileNo||!password){
        return res.status(400).json({
            message : "please provide all details"
        })
    }
    const isUserAlreadyExists = await userModel.findOne({
        $or : [{username},{email},{mobileNo}]
    })
    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"Users Already Exists"
        })
    }
        const hash = await bcrypt.hash(password,10)
    const user = await userModel.create({
        username,email,password:hash,mobileNo
    })
    const token = jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    res.cookie("token",token)
    res.status(201).json({
        message:"User Registered Successfully",
        user:{
            id:user._id,
            username: user.username,
            email:user.email,
            mobileNo: user.mobileNo
        }
    })

    console.log("Register request Successfully")
}
/**
 * @name loginUserController
 * @description login a user, expects mobileNo and password in the request body
 * @access Public
 */
async function loginUserController(req,res){
const {mobileNo,password}=req.body;
const user = await userModal.findOne({mobileNo})
if(!user){
    return res.status(401).json({
        message:"Invalid email or password"
    })
}
const isPasswordValid = await bcrypt.compare(password,user.password)
if(!isPasswordValid){
    return res.status(402).json({
        message:"Incorrect Password"
    })
}
    const token = jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    res.cookie("token",token)
    res.status(201).json({
        message:"User Login Successfully",
        user:{
            id:user._id,
            username: user.username,
            email:user.email
        }
    })
console.log("login request Successfully")
}
/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access Public 
 */
async function logoutUserController(req,res){
    // const token = req.cookies.token
    // if(token){
    //     aw
    // }
console.log("logout request Successfully")
}
async function getMeController(req,res){
console.log("Get me request Successfully")
}
module.exports={regUserController,loginUserController,logoutUserController,getMeController}
