import { fetchOrder } from "./order.controller.js"
import { adminUserGuard } from "../middleware/guard.middleware.js"
import { Router } from "express" 
	
const orderRouter =  Router()
	
orderRouter.get("/",adminUserGuard,fetchOrder)
	
export default orderRouter