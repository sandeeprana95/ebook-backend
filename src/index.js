import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"
mongoose.connect(process.env.DB_URL)
.then(()=>console.log("db connected"))
.catch((err)=>console.log(err.message))

import express from "express"
import cors from 'cors'
const app = express()
app.listen(8080,()=>console.log("app is running on port 8080"))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))


// Routes
import categoryRouter from "./category/category.routes.js"
import userRouter from "./user/user.routes.js"


app.use('/user',userRouter)
app.use('/category',categoryRouter)