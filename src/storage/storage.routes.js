import { createFile, deleteStorage, downloadFile, fetchStorage } from "./storage.controller.js"
import { Router } from "express" 
import multer from "multer"
import multerS3 from "multer-s3"
import { v4 as uniqueId } from "uuid"
import s3 from "../util/s3.util.js"

const storageRouter =  Router()

const upload = multer({
    s3,
    bucket:process.env.BUCKET,
    key:(req,file,next)=>{
        const arr = file.originalname.split(".")
        const ext = arr[arr.length-1]
        next(null,`demo/${uniqueId()}.${ext}`)
    },
    acl:"public-read"  
})


storageRouter.get("/",fetchStorage)
storageRouter.post("/",upload.single("file"),createFile)
storageRouter.delete("/",deleteStorage)
storageRouter.post("/download",downloadFile)




	
export default storageRouter