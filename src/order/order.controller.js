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
	 
	 else
     orders = await OrderModel.find().sort({createdAt:-1}).populate("ebook").populate("user","email fullname mobile -_id").lean()
	 
		for(let order of orders){
			const payment = await fetchPaymentById(order.paymentId)
			modified.push({
				...order,
				payment
			})
		}     

	 res.json(modified)

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