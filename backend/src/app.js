const express= require("express");
const app = express();
app.use(express.json())
//4. Global error handler
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({message:"Something went wrong on the server!"})
})
module.exports=app