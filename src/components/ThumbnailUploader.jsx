import { useState } from "react";

export default function ThumbnailUploader({ thumbnail, setThumbnail }) {

    const [preview, setPreview] = useState(null)

    const handleThumbnailUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file)
            setPreview(URL.createObjectURL(file));
        }
    };

    const removeThumbnail = () => {
        setThumbnail(null);
    };

    return (
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Upload Thumbnail</label>
            <div className="flex flex-col items-center space-y-2">
                {thumbnail ? (
                    <div className="relative w-32 h-32">
                        <img src={preview} alt="Thumbnail" className="object-cover w-full h-full border rounded-lg" />
                        <button
                            type="text"
                            className="absolute top-0 right-0 px-2 py-1 text-white bg-red-500 rounded-lg"
                            onClick={removeThumbnail}
                        >
                            X
                        </button>
                    </div>
                ) : (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailUpload}
                        className="block w-full mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-red-200 file:text-red-600 file:bg-white hover:file:bg-gray-100"
                    />
                )}
            </div>
        </div>
    );
}
