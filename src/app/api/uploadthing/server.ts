import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter: FileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB" } })
        .middleware(() => {
            return { userId: "test" }; // Add any necessary auth/validation here
        })
        .onUploadComplete(({ metadata, file }) => {
            console.log("Upload complete", file.url, metadata);
        })
};