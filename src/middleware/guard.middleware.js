 import Exc from "../util/exc.util.js"
 import jwt from "jsonwebtoken"

 const expireSession=async(res)=>{
    res.clearCookie("accessToken",{
        domain : process.env.NODE_ENV === "dev" ? "localhost" : process.env.DOMAIN,
        secure : process.env.NODE_ENV === "dev" ? false : true ,
        httpOnly : true
    })

    res.clearCookie("refreshToken",{
        domain : process.env.NODE_ENV === "dev" ? "localhost" : process.env.DOMAIN,
        secure : process.env.NODE_ENV === "dev" ? false : true ,
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