import UserModel from "./user.model.js"
import Exc from "../util/exc.util.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import emailSetup from "../util/emailSetup.js"

const SIX_DAYS = 518400000
const FOURTEEN_MINTUE = 14*60*60*1000

const getToken = (user)=>{
	const payload = {
			id:user._id,
			fullname:user.fullname,
			email:user.email,
			role:user.role,
			image:user.image ? user.image : null
		}

const accessToken =	jwt.sign(payload,process.env.AUTH_SECRET,{expiresIn:"1d"})

const refreshToken = jwt.sign(payload,process.env.RT_SECRET,{expiresIn:"6d"})

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
	// domain : process.env.NODE_ENV === "dev" ? "localhost" : process.env.DOMAIN,
	// secure : process.env.NODE_ENV === "dev" ? false : true,
	// domain:"localhost",
	sameSite: "None",
    secure: true,
	httpOnly : true
 })

 res.cookie('refreshToken',refreshToken,{
	maxAge : SIX_DAYS,
	// doamin : process.env.NODE_ENV === "dev" ? "localhost" : process.env.DOMAIN ,
	// secure : process.env.NODE_ENV === "dev" ? false : true , 
	// domain:"localhost",
	httpOnly : true,
    secure: true,
	sameSite: "None"
 })

 res.json({
	message:"login success",
	role:user.role
 })

})

export const session = Exc(async(req,res)=>{
	const {accessToken}= req.cookies

	if(!accessToken)
		return res.status(401).send("Unauthorized")

	const user = jwt.verify(accessToken,process.env.AUTH_SECRET)

	res.json(user)
})

export const logout = Exc(async(req,res)=>{
	res.clearCookie("accessToken",{
		domain:process.env.NODE_ENV === "dev" ? "localhost" : process.env.DOMAIN,
		secure:process.env.NODE_ENV === "dev" ? false : true,
		httpOnly:true
	})

	res.clearCookie("refreshToken",{
		domain:process.env.NODE_ENV === "dev" ? "localhost" : process.env.DOMAIN,
		secure : process.env.NODE_ENV === "dev" ? false : true,
		httpOnly:true
	})

	res.json({message:"logout success"})

})


export const updateImage= Exc(async(req,res)=>{
	const {image} = req.body
	const data = await UserModel.findByIdAndUpdate(req.params.id,{image},{new:true})
	res.json({message:"image updated success"})
})


export const refreshToken=Exc(async(req,res)=>{
	const user = await UserModel.findById(req.user.id)

	const {accessToken,refreshToken} = getToken(user)

	res.cookie("accessToken",accessToken,{
		maxAge:FOURTEEN_MINTUE,
		domain:process.env.NODE_ENV === "dev" ? "localhost" : process.env.DOMAIN,
		secure : process.env.NODE_ENV === "dev" ? false : true,
		httpOnly:true
	})

	res.cookie("refreshToken",refreshToken,{
		maxAge:SIX_DAYS,
		domain : process.env.NODE_ENV === "dev" ? "localhost" : process.env.DOMAIN,
		secure : process.env.NODE_ENV === "dev" ? false : true,
		httpOnly : true
	})
	res.json({message:"token refresh success"})
})

export const forgotPassword = Exc(async(req,res)=>{

	setTimeout(async() => {
		const {email} = req.body
		const user = await UserModel.findOne({email})
		
		if(!user)
			return res.status(404).json({message:"User doesn't exist"})

		const token = jwt.sign({id:user._id},process.env.FORGOT_PASSWORD_SECRET,{expiresIn:"14m"})
		const link = `${process.env.DOMAIN}/forgot-password?token=${token}`

		emailSetup(email,"Ebook - Forgot Password !",link,user.fullname)

		res.json({message:"mail sent successfully"})

	}, 3000);

})

export const forgotSession=Exc(async(req,res)=>{
	res.json({message:"Verification Success"})
})


export const updatePassword = Exc(async(req,res)=>{
	const {id} = req.user
	const {password} = req.body

	const encrypted = await bcrypt.hash(password.toString(),12)

	setTimeout(async() => {
		
		const user = await UserModel.findByIdAndUpdate(id,{password:encrypted},{new:true})
				
		if(!user)
			return res.status(424).json({message:"Failed to change password"})
		
		res.json({message:"Password Changed"})
		
	}, 4000);
})
