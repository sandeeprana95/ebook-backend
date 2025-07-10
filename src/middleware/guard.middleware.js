 import jwt from "jsonwebtoken"

 export  const userGuard = async(req,res,next)=>{
    try{
         const { accessToken } = req.cookies

         if(!accessToken)
             return res.status(401).json({
               message:"token is invalid"
            }) 
            
        const user = jwt.verify(accessToken,process.env.AUTH_SECRET) 

        if(!user)
            return res.status(403).json({message:"unauthorized"})

        if(user.role === "user")
        
        next()

    }
    catch(err)
    {
        console.log(err.message)
        res.status(500).json({
            message:err.message
        })
    }
}