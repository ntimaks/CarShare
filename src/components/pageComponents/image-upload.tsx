"use client";
import { useState, useEffect } from "react";
import { UploadDropzone } from "@/components/uploadthing";
import Image from "next/image";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export default function ImageUpload({ onImagesChange }: { onImagesChange: (urls: string[], keys: string[]) => void }) {
    const [images, setImages] = useState<UploadedImage[]>([]);
    const [imageTimeouts, setImageTimeouts] = useState<{ [key: string]: NodeJS.Timeout }>({});

    type UploadedImage = { url: string; key: string };

    useEffect(() => {
        return () => {
            // Cleanup timeouts when component unmounts
            Object.values(imageTimeouts).forEach(timeout => clearTimeout(timeout));
        };
    }, [imageTimeouts]);

    const handleUploadComplete = (res: UploadedImage[]) => {
        const newImages = res.map((file) => ({ url: file.url, key: file.key }));
        setImages((prev) => [...prev, ...newImages]);
        onImagesChange(
            newImages.map(image => image.url),
            newImages.map(image => image.key)
        );



        // Set timeout for each new image
        const newTimeouts: { [key: string]: NodeJS.Timeout } = {};
        newImages.forEach(image => {
            newTimeouts[image.key] = setTimeout(async () => {
                await deleteImage(image.key);

            }, 6000000); // 100 minute timeout
        });

        setImageTimeouts(prev => ({ ...prev, ...newTimeouts }));
    };

    const deleteImage = async (key: string) => {
        try {
            const response = await fetch('/api/uploadthing/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: `https://utfs.io/f/${key}` }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete image');
            }

            // Clear the timeout
            if (imageTimeouts[key]) {
                clearTimeout(imageTimeouts[key]);
                setImageTimeouts(Object.fromEntries(
                    Object.entries(imageTimeouts).filter(([k]) => k !== key)
                ));
            }

            // Update state
            setImages(prev => prev.filter(image => image.key !== key));
            onImagesChange(
                images.filter(image => image.key !== key).map(image => image.url),
                images.filter(image => image.key !== key).map(image => image.key)
            );


        } catch (error) {
            console.error('Error deleting image:', error);

        }
    };

    const handleRemoveImage = async (key: string) => {
        await deleteImage(key);
    };

    return (
        <div>
            <UploadDropzone
                className="border-neutral-800 border-2 rounded-lg"
                endpoint="imageUploader"
                onClientUploadComplete={handleUploadComplete}
                onUploadError={(error: Error) => {
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
