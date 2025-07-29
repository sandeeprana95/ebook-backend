import nodemailer from "nodemailer"
import ForgotPasswordTemplate from "./emailTemplate.js"


const emailSetup=(email,subject,link,fullname)=>{
try{

const smtpEmail = nodemailer.createTransport({
    service:"gmail",
    auth:{
         user:process.env.SMTP_EMAIL,
         pass : process.env.SMTP_PASSWORD
    }  
})

const mailOptions = {
        from :process.env.SMTP_EMAIL,
        to:email,
        subject:subject,
        html:ForgotPasswordTemplate(link,fullname)
    }


smtpEmail.sendMail(mailOptions)    

return true
}catch(err)
{
    return false
}
}

export default emailSetup


