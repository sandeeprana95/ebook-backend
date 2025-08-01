import dotenv from "dotenv"
dotenv.config()

import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
        region:"ap-south-1",
        credentials:{
            accessKeyId : process.env.S3_ACCESS_KEY_ID,
            secretAccessKey : process.env.S3_SECRET_ACCESS_KEY
        },
    })
 
export default s3