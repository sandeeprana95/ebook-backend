import { createEbook, deleteEbook, fetchEbook, updatebook } from "./ebook.controller.js"
import { Router } from "express" 
	
const ebookRouter =  Router()
	
ebookRouter.get("/",fetchEbook)
ebookRouter.post("/",createEbook)
ebookRouter.put("/:id",updatebook)
ebookRouter.delete("/:id",deleteEbook)
	
export default ebookRouter