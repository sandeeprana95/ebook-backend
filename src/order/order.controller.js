import OrderModel from "./order.model.js"
import Exc from "../util/exc.util.js"
import { fetchPaymentById } from "../payment/payment.controller.js"
	
 export const fetchOrder = Exc(async(req,res)=>{
	 let orders = []

	 let modified = []

	 const {role,id} = req.user

	 if(role === "user"){
		 orders = await OrderModel.find({user:id,status:"success"}).sort({createdAt:-1}).populate("ebook")
         return res.json(orders)
	 }
	 
	 else{
		const page = Number(req.query.page)? Number(req.query.page) : 1
		const limit = Number(req.query.limit)? Number(req.query.limit) : 6

		const skip = (page-1)*limit
		orders = await OrderModel.find().sort({createdAt:-1})
		.skip(skip)
		.limit(limit)
		.populate("ebook","title -_id")
		.populate("user","email fullname mobile -_id")
		.lean()
		
			for(let order of orders){
				const payment = await fetchPaymentById(order.paymentId)
				modified.push({
					...order,
					payment
				})
			} 
			
		const total = await OrderModel.countDocuments()	

		res.json({
			total,
			data:modified
	       })
	 }

})

// Helper (webhook)
export const createOrder = async(data)=>{
	try{
		const order = new OrderModel(data)
        await order.save()
		return order
	}
	catch(err)
	{
        return err
	}
}