import chalk from "chalk"
import inquirer from "inquirer"
let db = null
import bcrypt from "bcrypt"
import { MongoClient } from "mongodb"
MongoClient.connect("mongodb://localhost:27017")
.then((conn)=>{
    db = conn.db("ebook")
})



const log = console.log

const options=[
    {
        type:"list",
        name:"role",
        message:"Press arrow up and down key to choose role -",
        choices:[
            chalk.green("User"),
            chalk.green("Admin"),
            chalk.green("Exit")
        ]
    }
]

const input=[
        {
            type:"input",
            name:"fullname",
            message:"enter your fullname ?",
            validate:(input)=>{
                if(!input.length)
                    return "fullname is required"
                
                return true
            }
        },  
        {
            type:"input",
            name:"email",
            message:"enter your email",
            validate:(input)=>{
            const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/  
                if(!input.length)
                    return "email is required"

                if(!emailRegex.test(input))
                    return "invalid email id !"

                return true
            }   
        },
        {
            type:"password",
            name:"password",
            mask:"*",
            message:"enter your password ?",
            validate:(input)=>{
                if(!input.length)
                 return "password must be required !"

                if(input.length < 6)
                 return "Password should be alleast 6 characters !"

                return true
            }
        },
        {
            type:"input",
            name:"mobile",
            message:"enter your mobile number",
            validate:(input)=>{
                const mobileRegex=/^[6-9]\d{9}$/

                if(!input.length)
                return "Mobile is required !"

                if(!mobileRegex.test(input))
                    return "Invalid mobile !"
                
                return true
            }
        }

]

const addUser=async()=>{
    try{
        const user  = await inquirer.prompt(input)
        user.role = "user"
        
        const userCollection = db.collection("users")
        user.password = await bcrypt.hash(user.password,12)
        user.createdAt = new Date()
        await userCollection.insertOne(user)
        log(chalk.green("user has been created"))
        process.exit()

    }
    catch(err)
    {
        chalk.red("Failed to created user please consult to developer")
    }
}

const addAdmin=async()=>{
    try{
        const user = await inquirer.prompt(input)
        user.role = "admin"

        const userCollection = db.collection("users")
        user.password = await bcrypt.hash(user.password,12)
        user.createdAt = new Date()
        await userCollection.insertOne(user)
        log(chalk.green("admin has been created"))
        process.exit()

    }
    catch(err)
    {
        chalk.red("Failed to created user please consult to developer")
    }
}

const exit=()=>{
    log.bgRed.white.bold.underline("Goodbye ! Existing the program")
    process.exit()
}


const createUser=async()=>{
    try{
       log(chalk.bgRed.white.underline.bold("🌟 Admin Signup Console 🌟"))
        const option = await inquirer.prompt(options)
        if(option.role.includes("User"))
            return addUser()

        if(option.role.includes("Admin"))
            return addAdmin()

        if(option.role.includes("Exit"))
            return exit()
    }
    catch(err)
    {
        chalk.red("something is not right")
    }
}

createUser()





