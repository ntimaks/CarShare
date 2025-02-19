"use server"

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function deleteUploadedFiles(fileKeys: string[]) {
    try {
        await Promise.all(fileKeys.map(key => utapi.deleteFiles(key)));
    } catch (error) {
        console.error('Error deleting files:', error);
    }
} 