import dotenv from "dotenv"
dotenv.config()
import Razorpay from "razorpay"
import Exc from "../util/exc.util.js"


const instance = new Razorpay({
	key_id:process.env.RAZORPAY_KEY,
	key_secret:process.env.RAZORPAY_SECRET
})
	
export const createOrder = Exc(async(req,res)=>{
	console.log("hello")
	 const order = await instance.orders.create({
		amount : 500,
		currency:"INR",
		receipt:`EBOOK_RN-${Date.now()}`
	 })
	 
	 res.json(order)
})