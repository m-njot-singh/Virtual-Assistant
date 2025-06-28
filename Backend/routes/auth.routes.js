import express from "express"
import { logIn, logOut, signUp } from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post("/signUp",signUp)
authRouter.post("/logIn",logIn)
authRouter.get("/logOut",logOut)

export default authRouter