import dotenv from "dotenv"
dotenv.config()
import Razorpay from "razorpay"
import { writeFileSync } from "fs"
import ebookModel from "../ebook/ebook.model.js"
import Exc from "../util/exc.util.js"
import discountedPrice from "../util/discount.util.js"
import { createOrder} from "../order/order.controller.js"


const instance = new Razorpay({
	key_id:process.env.RAZORPAY_KEY,
	key_secret:process.env.RAZORPAY_SECRET
})
	
// helper (order controllers)
export const fetchPaymentById=async(paymentId)=>{
	try{
		const payment  =instance.payments.fetch(paymentId)
		return payment
	}
	catch(err){
		return err
	}

}

export const generateOrder = Exc(async(req,res)=>{
    const { ebookId } = req.body
	const ebook = await ebookModel.findById(ebookId)

	if(!ebook)
		return res.status(400).json({ message: "Bad Request" })

	 const order = await instance.orders.create({
		amount : discountedPrice(ebook.price,ebook.discount)*100,
		currency:"INR",
		receipt:`EBOOK_RN-${Date.now()}`
	 })
	 
	 res.json(order)
	 
})


const paymentSuccess=Exc(async(req,res,next)=>{
	console.log(req.body)
	const { notes,id,amount } = req.body.payload.payment.entity

	   await createOrder({
            user:notes.user,
			ebook:notes.ebook,
			paymentId:id,
			discount:Number(notes.discount),
			status:"success",
			amount:(amount/100)
	})

	res.json({success:true})
	
})

const paymentFailed=Exc(async(req,res,next)=>{
	const { notes,id } = req.body.paylod.payment.entity

	await createOrder({
		user:notes.user,
		ebook:notes.ebook,
		paymentId:id,
		discount:Number(notes.discount),
		status:"failed",
		amount:(amount/100)
	})

	res.json({success:true})

})

export const webhook=Exc(async(req,res,next)=>{
		writeFileSync("payment.json",JSON.stringify(req.body,null,2))
		
		const payload = req.body

		if(process.env.NODE_ENV === "dev" && payload.event === "payment.authorized")
			return paymentSuccess(req,res,next)

		if(process.env.NODE_ENV === "prod" && payload.event === "payment.success")
			return paymentSuccess(req,res,next)

		if(payload.event === "payment.failed")
			return paymentFailed(req,res,next)

		res.json({success:true})

})