import { razorpayGuard, userGuard } from "../middleware/guard.middleware.js"
import { fetchPaymentById, generateOrder, webhook } from "./payment.controller.js"
import { Router } from "express" 
	
const paymentRouter =  Router()
	
paymentRouter.post("/order", userGuard ,generateOrder)
paymentRouter.post("/webhook",razorpayGuard,webhook)
paymentRouter.get("/:id",fetchPaymentById)
	
export default paymentRouter