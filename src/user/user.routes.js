import { createUser , login, logout, session, updateImage} from "./user.controller.js"
import { Router } from "express" 
import { adminUserGuard }from "../middleware/guard.middleware.js"
	
const userRouter =  Router()
	
userRouter.post("/signup",createUser)
userRouter.post("/login",login)
userRouter.get("/session",session )
userRouter.get("/logout",logout)
userRouter.put("/update-image/:id",adminUserGuard,updateImage)
	
export default userRouter