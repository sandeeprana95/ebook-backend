import camelCase from "./case.js"
import { readFileSync,  writeFileSync } from "fs"
import path from "path"

const endpointSetup=(feature)=>{
    const featureCapital = camelCase(feature)
    const root = process.cwd()

    const serverFile = path.join(root,"src","index.js")
    const contents = readFileSync(serverFile,"utf-8")

    console.log(contents)
    const arr = contents.split("\n")
    const ui = []

    for(let item of arr){
        console.log("this is " + item + " ye h ")
        ui.push(item)
        if(item === "// Routes\r")
            ui.push(`import ${feature}Router from "./${feature}/${feature}.routes.js"`)
    }

            ui.push(`app.use('/${feature}',${feature}Router)`)
            writeFileSync(serverFile,ui.join("\n"))
         console.log(ui)
            return true
}

export default endpointSetup