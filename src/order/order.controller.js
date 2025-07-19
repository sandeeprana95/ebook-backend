import OrderModel from "./order.model.js"
import Exc from "../util/exc.util.js"
	
 export const fetchOrder = Exc(async(req,res)=>{
	 let orders = []

	 const {role,id} = req.user

	 if(role === "user")
	  orders = await OrderModel.find({user:id,status:"success"}).sort({createdAt:-1}).populate("ebook")
	 
	 else
     orders = await OrderModel.find().sort({createdAt:-1}).populate("ebook")
	console.log(orders)
	 res.json(orders)
})

// Helper (webhook)
export const createOrder = async(data)=>{
	try{
		console.log(data)
		const order = new OrderModel(data)
        await order.save()
		return order
	}
	catch(err)
	{
        return err
	}
}