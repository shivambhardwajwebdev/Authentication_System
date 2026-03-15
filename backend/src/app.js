const express= require("express");
const app = express();
app.use(express.json())
//4. Global error handler
module.exports=app