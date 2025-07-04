import { createCategory, deleteCategory, fetchCategory, fetchCategoryById, updateCategory } from "./category.controller.js"
import { Router } from "express" 
	
const categoryRouter =  Router()
	
categoryRouter.get("/",fetchCategory)
categoryRouter.post("/:id",fetchCategoryById)
categoryRouter.post("/",createCategory)
categoryRouter.put("/:id",updateCategory)
categoryRouter.delete("/:id",deleteCategory)

	
export default categoryRouter