const express = require("express");
const cron = require('node-cron');
const { PrismaClient } = require("@prisma/client");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");


const db = new PrismaClient();

const app = express();

const s3Client= new S3Client({
  region:"ap-south-1",
  credentials:{
  accessKeyId:process.env.accessKeyId,
  secretAccessKey:process.env.secretAccessKey
  }
});


async function deleteS3Object(key) {
  console.log(`Deleting S3 object with key: ${key}`);
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.Bucket,
      Key: key
    });

    const data = await s3Client.send(command);
    console.log("Object deleted", data);
  } catch (error) {
    console.error("Error deleting S3 object:", error);
  }
}

async function deleteObjects() {
  const now = new Date();
  console.group(`Deleting objects at ${now}`);

  try {

    const records = await db.sharedata.findMany({
      where: {
        deleteat: {
          lt: now
        }
      }
    });

   
    const keys = records.flatMap(record => 
      record.filenames.split(",").map(filename => `${record.id}/${filename}`)
    );

    const deletePromises = keys.map(deleteS3Object);
    await Promise.all(deletePromises).then(
      await db.sharedata.deleteMany({
        where:{
          deleteat:{
            lt:now
          }
        }
      })
    );

    console.log("All objects deleted successfully");
  } catch (error) {
    console.error("Error deleting objects:", error);
  }
}


async function init() {
  await deleteObjects();
}

 cron.schedule('1 * * * * *', async () => {
   await deleteObjects();
 });

init();



app.listen(3000,()=>{
  console.log("App Listening on 3000");
})