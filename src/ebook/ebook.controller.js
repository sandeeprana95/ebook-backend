import EbookModel from "./ebook.model.js"
import Exc from "../util/exc.util.js"
	
 export const fetchEbook = Exc((req,res)=>{
	setTimeout(async() => {
		const ebooks = await EbookModel.find().sort({createdAt:-1})
		res.json(ebooks)
	}, 2000);
	 
})

 export const createEbook = Exc(async(req,res)=>{
	 const newEbook = new EbookModel(req.body)
	 await newEbook.save()
	 res.json({message:"new ebook created"})
})

 export const updatebook = Exc(async(req,res)=>{
	setTimeout(async() => {
		const {fieldType} = req.query
		const {id} = req.params
		let body = req.body
        console.log(req.query)
		if(fieldType && fieldType === "array")
			body = {$push:req.body}

		console.log(body)
		console.log(id)


		const ebook = await EbookModel.findByIdAndUpdate(id,body,{new:true})
		if(!ebook)
			return res.status(404).json({message:"ebook not found"})

		res.json({message:"ebook updated"})
	}, 2000);

})

 export const deleteEbook = Exc((req,res)=>{
	setTimeout(async()=>{
	 const {id} = req.params
	 const ebook = await EbookModel.findByIdAndDelete(id)
	 if(!ebook)
		return res.status(404).json({message:"ebook not found"})

	 res.json({message:"ebook deleted successfully"})

	},2000)

})