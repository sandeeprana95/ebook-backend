import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"
mongoose.connect(process.env.DB_URL)

import express from "express"
const app = express()
app.listen(8080,()=>console.log("app is running on port 8080"))

// Routes

