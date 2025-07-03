import camelCase from "./case.js"

const modelSyntax = (feature)=>{
    const featureCapital = camelCase(feature)
    return[
        `import { Schema, model } from "mongoose" `,
        `\t`,
        `const ${feature}Schema = new Schema({ `,
        ` \//\ define your filled here `,
        `},{timestamps:true}) `,
        `\t`,
        `const ${featureCapital}Model = model("${featureCapital}",${feature}Schema)`,
        `export default ${featureCapital}Model`
        ]
}

export default modelSyntax