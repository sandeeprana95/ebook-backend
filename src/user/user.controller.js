import UserModel from "./user.model.js"
import Exc from "../util/exc.util.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const SIX_DAYS = 518400000
const FOURTEEN_MINTUE = 84000

const getToken = (user)=>{
	const payload = {
			id:user._id,
			fullname:user.fullname,
			email:user.email,
			role:user.role
		}

const accessToken =	jwt.sign(payload,process.env.AUTH_SECRET,{expiresIn:"15m"})

const refreshToken = jwt.sign(payload,process.env.AUTH_SECRET,{expiresIn:"6d"})

	return{
		accessToken,
		refreshToken
	}

}
	
 export const createUser =Exc(async(req,res)=>{
		const user = new UserModel(req.body)
		await user.save()
		res.json({message:"signup success"})
	
})

export const login = Exc(async(req,res)=>{
	const {email,password} = req.body
	const user = await UserModel.findOne({email})
	
	if(!user)
		return res.status(404).json({
	         message : "user doesn't exist"
		})

	const passwordMatch = await bcrypt.compare(password,user.password)

	if(!passwordMatch)
		return res.status(401).json({
	       message : "Incorrect Password"
		})

 const {accessToken,refreshToken} = getToken(user)

 res.cookie('accessToken',accessToken,{
	maxAge : FOURTEEN_MINTUE,
	domain : process.env.NODE_ENV === "dev" ? "localhost" : process.env.DOMAIN,
	httpOnly : true
 })

 res.cookie('refreshToken',refreshToken,{
	maxAge : SIX_DAYS,
	doamin : process.env.NODE_ENV === "dev" ? "localhost" : process.env.DOMAIN ,
	secure : process.env.NODE_ENV === "dev" ? false : true , 
	httpOnly : true
 })

 res.json({message:"login success"})

})