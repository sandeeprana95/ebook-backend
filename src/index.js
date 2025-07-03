import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"
mongoose.connect(process.env.DB_URL)
.then(()=>console.log("db connected"))
.catch((err)=>console.log(err.message))

import express from "express"
const app = express()
app.listen(8080,()=>console.log("app is running on port 8080"))
app.use(express.urlencoded({extended:false}))
app.use(express.json())


// Routes
import userRouter from "./user/user.routes.js"


app.use('/user',userRouter)