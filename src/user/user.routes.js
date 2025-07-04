import { createUser , login} from "./user.controller.js"
import { Router } from "express" 
	
const userRouter =  Router()
	
userRouter.post("/signup",createUser)
userRouter.post("/login",login)
userRouter.get("/session",session)
userRouter.get("/logout",logout)
	
export default userRouter