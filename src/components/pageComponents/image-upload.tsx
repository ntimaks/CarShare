"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { X } from "lucide-react"
import Image from "next/image"
interface ImageUploadProps {
    value: string[]
    onChange: (value: string[]) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
    const [files, setFiles] = useState<File[]>([])

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
            onChange([...value, ...acceptedFiles.map((file) => URL.createObjectURL(file))])
        },
        [onChange, value],
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".webp"],
        },
    })

    const removeFile = (index: number) => {
        const newFiles = [...files]
        newFiles.splice(index, 1)
        setFiles(newFiles)

        const newValue = [...value]
        newValue.splice(index, 1)
        onChange(newValue)
    }

    return (
        <div>
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${isDragActive ? "border-primary" : "border-border"
                    }`}
            >
                <input {...getInputProps()} />
                {isDragActive ? <p>Drop the files here ...</p> : <p>Drag &apos;n&apos; drop some files here, or click to select files</p>}
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {value.map((url, index) => (
                    <div key={index} className="relative">
                        <Image
                            src={url || "/placeholder.svg"}
                            alt={`Uploaded ${index + 1}`}
                            className="w-full h-32 object-cover rounded-md"
                        />
                        <button
                            onClick={() => removeFile(index)}
                            className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

