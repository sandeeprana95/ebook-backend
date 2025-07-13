import dotenv from "dotenv"
dotenv.config()
import Razorpay from "razorpay"
import ebookModel from "../ebook/ebook.model.js"
import Exc from "../util/exc.util.js"
import discountedPrice from "../util/discount.util.js"


const instance = new Razorpay({
	key_id:process.env.RAZORPAY_KEY,
	key_secret:process.env.RAZORPAY_SECRET
})
	
export const createOrder = Exc(async(req,res)=>{
    const { ebookId } = req.body
	const ebook = await ebookModel.findById(ebookId)

	// if(!ebook)
		// return res.status(400).json({ message: "Bad Request" })

	 const order = await instance.orders.create({
		amount : discountedPrice(ebook.price,ebook.discount)*100,
		currency:"INR",
		receipt:`EBOOK_RN-${Date.now()}`
	 })
	 
	 res.json(order)
})