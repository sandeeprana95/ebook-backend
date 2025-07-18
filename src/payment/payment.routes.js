import { razorpayGuard, userGuard } from "../middleware/guard.middleware.js"
import { generateOrder, webhook } from "./payment.controller.js"
import { Router } from "express" 
	
const paymentRouter =  Router()
	
paymentRouter.post("/order", userGuard ,generateOrder)
paymentRouter.post("/webhook",razorpayGuard,webhook)
	
export default paymentRouter