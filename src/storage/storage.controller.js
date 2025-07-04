import StorageModel from "./storage.model.js"
import Exc from "../util/exc.util.js"
import s3 from "../util/s3.util.js"
import { S3Client,ListObjectsV2Command,GetObjectCommand,PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"

	
 export const createFile =Exc(async(req,res)=>{
	console.log(req.file)
	const cmd = new PutObjectCommand({
		Bucket:"ebook-storage-sandeep",
		Key:`ebook/${req.file.originalname}`,	
	})
	const data = await s3.send(cmd)
	res.json(data)
})

export const fetchStorage=Exc(async(req,res)=>{
	 const cmd = new ListObjectsV2Command({
		Bucket:"ebook-storage-sandeep",
		Prefix:"demo"
	 })

	 const data = await s3.send(cmd)
	 res.json(data)
})

export const deleteStorage = Exc(async(req,res)=>{
	const {path}= req.body
	console.log(path)
	const cmd = new DeleteObjectCommand({
		Bucket:process.env.BUCKET,
		Key:path
	})

	const data = await s3.send(cmd)

	res.json({data,message:"file deleted successfully"})
})

export const downloadFile=Exc(async(req,res)=>{
	res.json("download file")
})