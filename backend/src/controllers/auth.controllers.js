const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModal = require("../models/user.model")
const tokenBlacklistModel = require("../models/blacklist.model")
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
   res.cookie("token", token, {
  httpOnly: true,
  sameSite: "lax",
  secure: false
});
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
const {email,password}=req.body;
const user = await userModal.findOne({email})
if(!user){
    return res.status(401).json({
        message:"Invalid email or password"
    })
}
const isPasswordValid = await bcrypt.compare(password,user.password)
if(!isPasswordValid){
    return res.status(401).json({
        message:"Incorrect Password"
    })
}
    const token = jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    res.cookie("token", token, {
  httpOnly: true,
  sameSite: "lax",
  secure: false
});
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
    const token = req.cookies.token
    if(token){
        await tokenBlacklistModel.create({token})
    }
    res.clearCookie("token")
    res.status(200).json({
        message:"User logged out Successfully"
    })
}
async function getMeController(req,res){
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        message:"User detailed fetch successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            mobileNo:user.mobileNo
        }
    })
}
module.exports={regUserController,loginUserController,logoutUserController,getMeController}
