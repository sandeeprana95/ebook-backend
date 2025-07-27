import { createUser , forgotPassword, login, logout, refreshToken, session, updateImage} from "./user.controller.js"
import { Router } from "express" 
import { adminUserGuard, refreshTokenGuard }from "../middleware/guard.middleware.js"
	
const userRouter =  Router()
	
userRouter.post("/signup",createUser)
userRouter.post("/login",login)
userRouter.get("/session",session )
userRouter.get("/logout",logout)
userRouter.put("/update-image/:id",adminUserGuard,updateImage)
userRouter.get("/refresh-token",refreshTokenGuard,refreshToken)
userRouter.post("/forgot-password" , forgotPassword)
	
export default userRouter