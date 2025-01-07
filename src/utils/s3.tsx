// s3.ts
import { S3Client } from "@aws-sdk/client-s3";

const region = process.env.MYAWS_REGION || 'us-east-1';
const accessKeyId = process.env.MYAWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.MYAWS_SECRET_ACCESS_KEY;

if (!accessKeyId || !secretAccessKey) {
  throw new Error("AWS credentials are not set in environment variables.");
}

export const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});