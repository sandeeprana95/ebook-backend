import { Schema, model } from "mongoose" 
	
const storageSchema = new Schema({ 
 // define your filled here 
},{timestamps:true}) 
	
const StorageModel = model("Storage",storageSchema)
export default StorageModel