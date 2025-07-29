 import Exc from "../util/exc.util.js"
 import jwt from "jsonwebtoken"
 import crypto from "crypto"

 const expireSession=async(res)=>{
    res.clearCookie("accessToken",{
        domain : process.env.NODE_ENV === "dev" ? "localhost" : process.env.DOMAIN,
        secure : process.env.NODE_ENV === "dev" ? false : true ,
        // secure:true,
        sameSite:"None",
        httpOnly : true
    })

    res.clearCookie("refreshToken",{
        domain : process.env.NODE_ENV === "dev" ? "localhost" : process.env.DOMAIN,
        secure : process.env.NODE_ENV === "dev" ? false : true ,
        // secure:true,
        sameSite:"None",
        httpOnly : true
    })

    res.status(400).json({message : "Bad Request"})
 }

 export  const userGuard = Exc(async(req,res,next)=>{
    const { accessToken } = req.cookies
    
    if(!accessToken)
        return expireSession(res)

    const payload = jwt.verify(accessToken,process.env.AUTH_SECRET)

    if(payload.role !== "user")
        return expireSession(res)
    
    req.user = payload
    next()

 })


 export const adminGuard = Exc(async(req,res,next)=>{
    const {accessToken} = req.cookies

    if(!accessToken)
        return expireSession(res)

    const payload = jwt.verify(accessToken,process.env.AUTH_SECRET)

    if(payload.role !== "admin")
        return expireSession(res)

    req.user = payload
    next()
 })


 export const adminUserGuard = Exc(async(req,res,next)=>{
       const {accessToken} = req.cookies

       if(!accessToken)
        return expireSession(res)

       const payload = jwt.verify(accessToken,process.env.AUTH_SECRET)

       if(payload.role !== "user" && payload.role !== "admin")
          return expireSession(res)

       req.user = payload
       next()
 })



 export const razorpayGuard=Exc(async(req,res,next)=>{
    const razorpaySignature = req.headers['x-razorpay-signature']
    console.log(razorpaySignature)
    
    if(!razorpaySignature && razorpaySignature === "undefined" )
        return res.status(400).json({message:"Bad Request"})
    
    const payload = req.body
    
    const generatedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_WEBHOOK_SECRET).update(JSON.stringify(payload)).digest("hex")

    if(razorpaySignature !== generatedSignature)
        return res.status(400).json({message:"Bad Request"})
    next()
 })


 export const refreshTokenGuard=Exc(async(req,res,next)=>{
        const {refreshToken} = req.cookies

        if(!refreshToken)
           return  expireSession(res)

        const payload = jwt.verify(refreshToken,process.env.RT_SECRET)
        
        if(payload.role !== "user" && payload.role !== "admin")
            return expireSession(res)

        req.user = payload
        next()

 })


 export const forgotSessionGuard=Exc(async(req,res,next)=>{

  const authorization = req.headers.authorization

  if(!authorization)
       return res.status(400).json({message:"Bad Request"})

  const [type,token ] = authorization.split(" ")

  if(type !== "Bearer")
     return res.status(400).json({message:"Bad Request"})

  const user = jwt.verify(token , process.env.FORGOT_PASSWORD_SECRET)

  if(!user)
    return res.status(401).json({message:"verification failed"})

  req.user = user

  next()

 })