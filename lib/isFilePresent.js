import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3";

export async function isFilePresent(filename) {
    const transcriptionFile = filename + '.transcription';
    const s3client = new S3Client({
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.AWS_PUBLIC_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECERET_ACCESS_KEY,  
        },
    });
    const getObjectCommand = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: filename,
    });
    let isPresent = null;
    try {
        isPresent = await s3client.send(getObjectCommand);    
    } catch (error) {
        return false;
    }

    if (isPresent) {
        return true
    }
    return false;
}