import camelCase from "./case.js"

const routerSyntax=(feature)=>{
    const featureCapital = camelCase(feature)
    return[
        `import { fetch${featureCapital} } from "./${feature}.controller.js"`,
        `import { Router } from "express" `,
        `\t`,
        `const ${feature}Router =  Router()`,
        `\t`,
        `${feature}Router.get("/",fetch${featureCapital})`,
        `\t`,
        `export default ${feature}Router`
    ]
}

export default routerSyntax
