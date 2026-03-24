const express = require("express")
const authRouter = express.Router()
const authControllers = require("./controllers/auth.controllers")
/**
 * @routes POST /api/auth/register
 * @description Register a new user
 * @access public
 */
authRouter.post("/register",authControllers.regUserController)

module.exports = authRouter