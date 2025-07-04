import CategoryModel from "./category.model.js"
import Exc from "../util/exc.util.js"
	
export const fetchCategory=Exc(async(req,res)=>{
	const allCategories = await CategoryModel.find()
	res.json(allCategories)
})

export const fetchCategoryById=Exc(async(req,res)=>{
	const category = await CategoryModel.findById(req.params.id)
	if(!category)
		return res.status(404).json({message:"category not found"})

	res.json(category)

})

export const createCategory=Exc(async(req,res)=>{
	const category = new CategoryModel(req.body)
	await category.save()
	res.json({message:"new category created successfully",category})
})

export const updateCategory = Exc(async(req,res)=>{
	const category = await CategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
	if(!category)
		return res.status(404).json({message:"category not found"})

	res.json({message:"category updated"})
})

export const deleteCategory = Exc(async(req,res)=>{
	const category = await CategoryModel.findByIdAndDelete(req.params.id)
	if(!category)
		return res.status(404).json({message:"category not found"})

	res.json({message:"category deleted successfully"})
})