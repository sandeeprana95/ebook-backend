import { createUser } from "./user.controller.js"
import { Router } from "express" 
	
const userRouter =  Router()
	
userRouter.post("/",createUser)
	
export default userRouter