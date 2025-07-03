import camelCase from "./case.js"

const controllerSyntax=(feature)=>{
    const featureCapital = camelCase(feature)
     return[
        `import ${featureCapital}Model from "./${feature}.model.js"`,
        `\t`,
        ` export const fetch${featureCapital} = async(req,res)=>{`,
        `\t res.send("hello")`,
        `}`
     ]
}

export default controllerSyntax