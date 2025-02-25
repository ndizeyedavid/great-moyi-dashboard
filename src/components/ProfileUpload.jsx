import { useState } from "react";

export default function ProfileUpload({ setProfilePic }) {
    const [preview, setPreview] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setPreview(null);
    };


    return (

        <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Profile Picture</label>
            <div className="flex flex-col items-center space-y-2">
                {preview ? (
                    <div className="relative w-24 h-24">
                        <img src={preview} alt="Profile" className="object-cover w-full h-full border rounded-full" />
                        <button
                            className="absolute top-0 right-0 px-2 py-1 text-white bg-red-500 rounded-full"
                            onClick={removeImage}
                        >
                            X
                        </button>
                    </div>
                ) : (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="block w-full mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-[#ef4444]/20 file:text-[#ef4444] file:bg-white hover:file:bg-gray-100"
                    />
                )}
            </div>
        </div>

    );
}
