import mongoose, { Schema, model } from "mongoose" 
	
const orderSchema = new Schema({ 
  user:{
    type:mongoose.Types.ObjectId,
    required:true
  },
  ebook:{
    type:mongoose.Types.ObjectId,
    required:true
  },
  paymentId:{
    type:String,
    required:true
  },
  discount:{
    type:Number,
    default:0
  },
  status:{
    type:String,
    enum:["success","failed"]
  }
},{timestamps:true}) 
	
const OrderModel = model("Order",orderSchema)
export default OrderModel