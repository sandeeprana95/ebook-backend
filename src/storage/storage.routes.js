import { createFile, deleteFile, downloadFile, fetchStorage, uploadPic } from "./storage.controller.js"
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
             console.log(file)
            const {fieldname} = file
            const base = (fieldname === "file"? process.env.BUCKET_FOLDER : process.env.PIC_FOLDER)
            const arr = file.originalname.split(".")
            const ext = arr[arr.length-1]
            next(null,`${base}}/${uniqueId()}.${ext}`)
        },
        acl:(req,file,next)=>{
            next(null,file.fieldname === "file" ? "private" : "public-read")
        } 
    }) 
})


storageRouter.get("/",adminGuard,fetchStorage)
storageRouter.post("/",adminGuard,upload.single("file"),createFile)
storageRouter.post("/upload-pic",adminUserGuard,upload.single("pic"),uploadPic)
storageRouter.post("/delete",adminGuard,deleteFile)
storageRouter.post("/download",adminUserGuard,downloadFile)




	
export default storageRouter