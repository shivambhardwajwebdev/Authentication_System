//we are creating a middleware
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")
async function authUser(req,res,next){
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"TOken not Provided"
        })
    }
    const isTokenBlacklist = await tokenBlacklistModel.findOne({token})
    if(isTokenBlacklist){
        return res.status(401).json({
            message:"Token is invalid"
        })
    }
    try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded //user property is created by us which decode all data of token and add into req.user
    next()
    }catch(err){
        return res.status(401).json({
            message:"Invalid token."
        })
    }
}
module.exports = {authUser}