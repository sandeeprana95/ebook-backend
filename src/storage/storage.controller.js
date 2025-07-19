import StorageModel from "./storage.model.js"
import Exc from "../util/exc.util.js"
import s3 from "../util/s3.util.js"
import { S3Client,ListObjectsV2Command,GetObjectCommand,PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

	
 export const createFile =Exc(async(req,res)=>{

	res.json(req.file)
})

export const fetchStorage=Exc(async(req,res)=>{
	 const cmd = new ListObjectsV2Command({
		Bucket:process.env.BUCKET,
		Prefix:process.env.BUCKET_FOLDER
	 })

	 const data = await s3.send(cmd)
	 res.json(data)
})

export const deleteFile = Exc(async(req,res)=>{
	const {path}= req.body
	console.log(path)
	const cmd = new DeleteObjectCommand({
		Bucket:process.env.BUCKET,
		Key:path
	})

	const data = await s3.send(cmd)
	console.log(data)

	res.json({data,message:"file deleted successfully"})
})

export const downloadFile=Exc(async(req,res)=>{
	const {path} = req.body
	const cmd = new GetObjectCommand({
		Bucket:process.env.BUCKET,
		Key:path
	})

    const data = await getSignedUrl(s3,cmd,{expiresIn:30})
	res.json({url:data})

})