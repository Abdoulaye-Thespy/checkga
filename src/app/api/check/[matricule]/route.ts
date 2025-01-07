import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from '../../../../utils/s3';
import { NextRequest, NextResponse } from 'next/server';

// Utility function to convert a stream to a string
const streamToString = (stream: NodeJS.ReadableStream): Promise<string> => {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });
};

// Handle GET requests for a specific student
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const bucketName = process.env.MYAWS_S3_BUCKET_NAME;
    const fileKey = 'data.json';

    // Extract the matricule from the request URL
    const { searchParams } = new URL(req.url);
    const matricule = searchParams.get('matricule');

    if (!matricule) {
      return NextResponse.json({ error: 'Matricule is required' }, { status: 400 });
    }

    if (!bucketName) {
      throw new Error('Bucket name is not defined. Please check your environment variables.');
    }

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    });

    const response = await s3Client.send(command);

    if (!response.Body) {
      throw new Error('No response body from S3');
    }

    const jsonData = await streamToString(response.Body as NodeJS.ReadableStream);
    const data = JSON.parse(jsonData);

    // Find the student with the matching matricule
    const student = data.Student.find((student: any) => student.Matricule === matricule);

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: student });
  } catch (error: any) {
    console.error('Error fetching object from S3:', error.message);
    return NextResponse.json({ error: 'Failed to fetch object from S3', details: error.message }, { status: 500 });
  }
}