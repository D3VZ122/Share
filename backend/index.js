const express = require("express");
const { GetObjectCommand, S3Client, PutObjectCommand, ListObjectsV2Command } =  require("@aws-sdk/client-s3");
const { getSignedUrl } =  require("@aws-sdk/s3-request-presigner");
const app = express();
const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4, v4 } = require('uuid');
const cors = require('cors');

app.use(express.json());
app.use(cors());
const db = new PrismaClient();
const s3Client= new S3Client({
    region:"ap-south-1",
    credentials:{
    accessKeyId:process.env.accessKeyId,
    secretAccessKey:process.env.secretAccessKey
    }
});


async function getobject(key) {
    const command = new GetObjectCommand({
        Bucket:process.env.Bucket,
        Key:key
    });
    const url = await getSignedUrl(s3Client,command);
    return url;
}

async function putobject(filename,type) {
    const command = new PutObjectCommand({
        Bucket:process.env.Bucket,
        Key:filename,
        ContentType:type,
      
    });

    const url = await getSignedUrl(s3Client,command);
    return url;
}


async function getlist(prefix="",delimiter=""){
    const command = new ListObjectsV2Command({
        Bucket:process.env.Bucket,
        Prefix:prefix,
        Delimiter:delimiter
    });

    const list = await s3Client.send(command);
    return list.Contents;
}



 app.post("/putlink",async(req,res)=>{
    const { files } = req.body;
   
    
    const ui = uuidv4();
    
 
    const fn = [];
    const uploadFile = async (element) => {
        fn.push(element.filename);
      return await putobject(ui + '/' + element.filename, element.filetype);
    };
    

    const uploadPromises = files.map(uploadFile);
    
    try {
    
      const results = await Promise.all(uploadPromises);
      const time = Date.now()+3* 60 * 1000;
      const newtime= new Date(time);

    const data =  await db.sharedata.create({
        data:{
            id:ui,
            filenames:fn.toString(),
            deleteat: newtime
        }
      })
      return res.json({ message: results,id:ui});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error uploading files' });
    }
    
 });

 app.get("/getlink",async(req,res)=>{
    const id = req.query.id;

    if(!id){
        return res.status(500).json({
            message:"No Id Provided"
        })
    }
    try{
        const dat = await db.sharedata.findFirst({
            where:{
                id  
            }
        });
        if(!dat){
            return res.json({message:"Wrong Id Or Expired"});
        }
        const filesname = dat.filenames.split(',');
        console.log(filesname);

        const getfile = async(element)=>{
            return await getobject(element);
        }

        const fileprom = filesname.map(async(element)=>{const url = await getfile(id+"/"+element);
            return{
                url:url,
                filename:element
            }
        });
        
        const response = await Promise.all(fileprom);
        console.log(response);
        return res.json({data:response});
    }
    catch(error){
        return res.status(500).json({
            message:"Error Getting Files Ready"
        })
    }
 })


 



app.listen(3000,()=>{
    console.log("Listening on 3000");
})


