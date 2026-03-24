const authRouter = require("./auth.routes")
const express= require("express");
const cors= require("cors");
const app = express();
app.use(express.json())
//1.Cors should usually come very clearly
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
//1. Global error handler
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({message:"Something went wrong on the server!"})
})
//2.Routes
app.use("/api/auth",authRouter);
module.exports=app