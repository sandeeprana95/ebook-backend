const Exc=(fn)=>(req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch((err)=>{
        console.log(err.message + "server error h")
        res.status(500).json(
            { message:process.env.NODE_ENV === "dev"? err.message : "failed! Please try after sometime"
        })
    })
}

export default Exc