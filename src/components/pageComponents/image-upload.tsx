"use client";
import { useState } from "react";
import { UploadDropzone } from "@/components/uploadthing";
import Image from "next/image";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export default function Home() {

    const [images, setImages] = useState<UploadedImage[]>([])

    type UploadedImage = { url: string; key: string };
    const handleUploadComplete = (res: UploadedImage[]) => {
        const newImages = res.map((file) => ({ url: file.url, key: file.key }))
        setImages((prev) => [...prev, ...newImages])
    }

    const handleRemoveImage = (key: string) => {
        setImages((prev) => prev.filter((image) => image.key !== key))
    }
    return (
        <div>
            <UploadDropzone
                className=" border-neutral-800  border-2 rounded-lg"
                endpoint="imageUploader"
                onClientUploadComplete={handleUploadComplete}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                }}
            />
            {images.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Uploaded Images</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((image) => (
                            <div key={image.key} className="relative group border border-neutral-500 border-2 rounded-lg">
                                <Image
                                    src={image.url || "/placeholder.svg"}
                                    alt="Uploaded Image"
                                    width={300}
                                    height={300}
                                    className="rounded-lg object-cover w-full h-64"
                                />
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => handleRemoveImage(image.key)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
