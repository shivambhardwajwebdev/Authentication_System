const mongoose = require("mongoose")
const usertest1Schema = new mongoose.Schema({
    username :{
        type:String,
        unique : [true,"Username already taken"],
        required:true
    },
    email:{
        required:true,
        type:String,
        unique:[true,"Account already exists with this address"]
    },
    mobileNo :{
        required:true,
        type: Number,
        unique:[true,"Account with this MobileNo is already exist"]
    },
    password:{
        type:String,
        required :true,
    }
})
const userModal = mongoose.model("userstest1",usertest1Schema)

module.exports=userModal;