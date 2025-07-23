import { Schema, model } from "mongoose" 
import bcrypt from "bcrypt"
	
const userSchema = new Schema({ 
        fullname:{
            type:String,
            required:true,
            trim:true,
            lowercase:true
        },
        email:{
            type:String,
            required:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
            trim:true
        },
        mobile:{
            type:String,
            trim:true,
            required:true
        },
        role:{
            type:String,
            default:"user",
            enum:["user"]
        },
        image:{
            type:String
        }
   },{timestamps:true}) 


   userSchema.pre("save",async function(next){
    const isUser = await model("User").countDocuments({email:this.email})
    if(isUser)
        throw next(new Error("user already exists"))

    const encryptedPassword = await bcrypt.hash(this.password,12)
    this.password = encryptedPassword

    next()
   })
	
const UserModel = model("User",userSchema)

export default UserModel