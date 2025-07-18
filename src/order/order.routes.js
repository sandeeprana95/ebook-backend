import { fetchOrder } from "./order.controller.js"
import { Router } from "express" 
	
const orderRouter =  Router()
	
orderRouter.get("/",fetchOrder)
	
export default orderRouter