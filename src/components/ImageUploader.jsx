import { useState } from "react";

export default function ImageUploader({ images, setImages }) {

    const [preview, setPreview] = useState([]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        if (preview.length + files.length > 4) {
            alert("You can only upload up to 4 images.");
            return;
        }

        setImages(files);

        const newImages = files.map((file) => URL.createObjectURL(file));
        setPreview((prev) => [...prev, ...newImages]);
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Preview Images (Max: 4)</label>
            <div className="flex flex-wrap gap-2">
                {preview.map((src, index) => (
                    <div key={index} className="relative w-24 h-24">
                        <img src={src} alt={`Upload ${index}`} className="object-cover w-full h-full border rounded-lg" />
                        <button
                            type="button"
                            className="absolute top-0 right-0 px-2 py-1 text-white bg-red-500 rounded-lg"
                            onClick={() => removeImage(index)}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

            {preview.length < 4 && (
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="block w-full mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-red-200 file:text-red-600 file:bg-white hover:file:bg-gray-100"
                />
            )}
        </div>
    );
}
