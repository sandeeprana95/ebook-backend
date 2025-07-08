import EbookModel from "./ebook.model.js"
import Exc from "../util/exc.util.js"
	
 export const fetchEbook = Exc(async(req,res)=>{
	const ebooks = await EbookModel.find().sort({createdAt:-1})
	res.json(ebooks)
	 
})

 export const createEbook = Exc(async(req,res)=>{
	 const newEbook = new EbookModel(req.body)
	 await newEbook.save()
	 res.json({message:"new ebook created"})
})

 export const updatebook = Exc(async(req,res)=>{
	setTimeout(async() => {
		const ebook = await EbookModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
		if(!ebook)
			return res.status(404).json({message:"ebook not found"})

		res.json({message:"ebook updated"})
	}, 2000);

})

 export const deleteEbook = Exc((req,res)=>{
	setTimeout(async()=>{
	 const ebook = await EbookModel.findByIdAndDelete(req.params.id)
	 if(!ebook)
		return res.status(404).json({message:"ebook not found"})

	 res.json({message:"ebook deleted successfully"})

	},2000)

})