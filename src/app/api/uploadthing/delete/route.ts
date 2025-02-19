import { UTApi } from "uploadthing/server";
import { NextResponse } from "next/server";

const utapi = new UTApi();

export async function POST(req: Request) {
    try {
        const { url } = await req.json();

        // Extract the file key from the URL
        // Example URL: https://utfs.io/f/X9ytV3B4p8mwlD4xULdjbzDVL5KsW3mIMc48uwy0rHkaShio
        const fileKey = url.split('/').pop();

        if (!fileKey) {
            return new NextResponse('Invalid file URL', { status: 400 });
        }

        // Delete the file using the UploadThing API
        await utapi.deleteFiles(fileKey);

        return NextResponse.json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error deleting file:', error);
        return new NextResponse('Error deleting file', { status: 500 });
    }
}
