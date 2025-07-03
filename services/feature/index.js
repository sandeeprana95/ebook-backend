import { existsSync, mkdirSync, writeFileSync } from "fs"
import logger from "node-color-log"
import path from "path"
import modelSyntax from "./modelSyntax.js"
import controllerSyntax from "./controllerSyntax.js"
import routerSyntax from "./routerSyntax.js"
import endpointSetup from "./endpoint.js"

logger.success("independent services")

const argArray = process.argv.slice(2)
const args = argArray.map((item)=>item.toLowerCase())
const feature = args.join("-") 

const root = process.cwd()

const folder = path.join(root,"src",feature)

const featureService=()=>{
    try{
        if(existsSync(folder))
            return logger.error("service already exist !")
        mkdirSync(folder)

        // model
        writeFileSync(path.join(folder,`${feature}.model.js`),modelSyntax(feature).join("\n"))
        // controller
        writeFileSync(path.join(folder,`${feature}.controller.js`),controllerSyntax(feature).join("\n"))
        // rotues
        writeFileSync(path.join(folder,`${feature}.routes.js`),routerSyntax(feature).join("\n"))

        endpointSetup(feature)
        
        logger.success(`${feature} service created`)


    }
    catch(err)
    {
        console.log(err.message)
        logger.error(err.message)
    }
}

featureService()
