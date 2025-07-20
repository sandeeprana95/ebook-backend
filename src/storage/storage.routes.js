import { createFile, deleteFile, downloadFile, fetchStorage } from "./storage.controller.js"
import { Router } from "express" 
import multer from "multer"
import multerS3 from "multer-s3"
import { v4 as uniqueId } from "uuid"
import s3 from "../util/s3.util.js"
import { adminGuard, adminUserGuard } from "../middleware/guard.middleware.js"

const storageRouter =  Router()

const upload = multer({
   storage:multerS3({
        s3,
        bucket:process.env.BUCKET,
        key:(req,file,next)=>{
            const arr = file.originalname.split(".")
            const ext = arr[arr.length-1]
            next(null,`${process.env.BUCKET_FOLDER}/${uniqueId()}.${ext}`)
        },
        acl:"public-read"  
    }) 
})


storageRouter.get("/",adminGuard,fetchStorage)
storageRouter.post("/",adminGuard,upload.single("file"),createFile)
storageRouter.post("/delete",adminGuard,deleteFile)
storageRouter.post("/download",adminUserGuard,downloadFile)




	
export default storageRouter