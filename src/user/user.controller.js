import UserModel from "./user.model.js"
	
 export const createUser = async(req,res)=>{
	 try{
		const user = new UserModel(req.body)
		await user.save()
		res.json({message:"signup success"})

	 }
	 catch(err)
	 {
		res.status(500).json({
			message:err.message
		})
	 }
}