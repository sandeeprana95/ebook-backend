import { Schema, model } from "mongoose" 
	
const categorySchema = new Schema({ 
  title:{
    type:String,
    trim:true,
    required:true,
    lowercase:true
  }
},{timestamps:true}) 
	
const CategoryModel = model("Category",categorySchema)
export default CategoryModel