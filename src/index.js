import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

// Database Connection
const PORT = 8080;

mongoose.connect(process.env.DB_URL)
  .then(() => console.log("✅ DB connected"))
  .catch((err) => console.log("❌ DB error:", err.message));

// App Initialization
const app = express();

// ✅ Middleware Setup
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//Routes
import paymentRouter from "./payment/payment.routes.js";
import ebookRouter from "./ebook/ebook.routes.js";
import storageRouter from "./storage/storage.routes.js";
import categoryRouter from "./category/category.routes.js";
import userRouter from "./user/user.routes.js";
import orderRouter from "./order/order.routes.js"

app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/storage', storageRouter);
app.use('/ebook', ebookRouter);
app.use('/payment', paymentRouter);
app.use('/order',orderRouter)


// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
