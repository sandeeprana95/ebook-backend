import { userGuard } from "../middleware/guard.middleware.js"
import { createOrder } from "./payment.controller.js"
import { Router } from "express" 
	
const paymentRouter =  Router()
	
paymentRouter.post("/order", userGuard ,createOrder)
	
export default paymentRouter