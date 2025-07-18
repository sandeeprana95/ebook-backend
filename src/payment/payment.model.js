import { Schema, model } from "mongoose" 
	
const paymentSchema = new Schema({ 
 // define your filled here  
},{timestamps:true}) 
	
const PaymentModel = model("Payment",paymentSchema)
export default PaymentModel