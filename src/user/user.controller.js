import UserModel from "./user.model.js"
import Exc from "../util/exc.util.js"
const x = Exc()
console.log(x)
	
 export const createUser =Exc(async(req,res)=>{
		const user = new UserModel(req.body)
		await user.save()
		res.json({message:"signup success"})
	
})