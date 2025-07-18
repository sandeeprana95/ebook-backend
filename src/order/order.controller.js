import OrderModel from "./order.model.js"
import Exc from "../util/exc.util.js"
	
 export const fetchOrder = Exc(async(req,res)=>{
	 const orders = await OrderModel.findOne()
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