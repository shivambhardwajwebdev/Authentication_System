const express = require("express")
const authRouter = express.Router()
const authControllers = require("./controllers/auth.controllers")
const authMiddleware = require("./middleware/auth.middleware")
/**
 * @routes POST /api/auth/register
 * @description Register a new user
 * @access public
 */
authRouter.post("/register",authControllers.regUserController)
authRouter.post("/login",authControllers.loginUserController)
authRouter.post("/logout",authControllers.logoutUserController)
authRouter.post("/get-me",authMiddleware.authUser,authControllers.getMeController)

module.exports = authRouter