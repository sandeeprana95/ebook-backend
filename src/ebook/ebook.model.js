import { Schema, model } from "mongoose" 
	
const ebookSchema = new Schema({ 
  title:{
    type:String,
    lowercase:true,
    trim:true,
    required:true
  },
  description:{
    type:String,
    trim:true,
    lowercase:true
  },
  price:{
    type:Number,
    required:true
  },
  discount:{
    type:Number,
    default:0
  },
  thumbnail:{
    type:String
  }
},{timestamps:true}) 
	
const EbookModel = model("Ebook",ebookSchema)
export default EbookModel