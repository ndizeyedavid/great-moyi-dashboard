import { X } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from "framer-motion"
import TagInput from './TagInput'
import DynamicSpecs from './DynamicSpecs';
import ImageUploader from './ImageUploader';
import ThumbnailUploader from './ThumbnailUploader';

import { useForm } from 'react-hook-form';
// import pb from '../utils/pocketbase';
import toast from 'react-hot-toast';
import FileService from '../services/fileService';
import DatabaseService from '../services/databaseServices';

export default function NewTable({ setModalOpen, setDummy }) {

    const { register, handleSubmit, reset } = useForm();

    const [tags, setTags] = useState([]);
    const [specs, setSpecs] = useState([{ label: "", value: "" }]);
    const [images, setImages] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);

    function closeModal(e) {
        // console.log(e.target.id)
        if (e.target.id === "modal") {
            setModalOpen(false)
        }
    }

    async function addTable(data) {
        toast.loading("Adding new table...", { id: "add" });

        try {
            // Upload thumbnail first
            let thumbnailId = "";
            if (thumbnail) {
                const uploadedThumbnail = await FileService.uploadFile(import.meta.env.VITE_IMAGES_BUCKET, thumbnail);
                thumbnailId = uploadedThumbnail?.$id || "";
            }

            // Upload preview images
            const imageIds = [];
            for (const image of images) {
                const uploadedImage = await FileService.uploadFile(import.meta.env.VITE_IMAGES_BUCKET, image);
                if (uploadedImage?.$id) imageIds.push(uploadedImage.$id);
            }


            // Create document in Appwrite
            const formObject = {
                name: data.title,
                price: Number(data.price),
                thumbnail: thumbnailId,
                features: JSON.stringify(tags),
                specs: JSON.stringify(specs),
                preview_images: imageIds,
                description: data.description,
            };

            await DatabaseService.createDocument(import.meta.env.VITE_TABLES_COLLECTION, formObject);

            toast.success("New table added successfully", { id: "add" });
            setDummy(Math.random());
            setModalOpen(false);
        } catch (err) {
            console.error("Error creating table:", err);
            toast.error("Unable to create new Table, try again", { id: "add" });
        }
    }


    return (
        <div id='modal' onClick={(e) => closeModal(e)} className='absolute top-0 flex items-center justify-center w-full h-full bg-black/70'>

            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit(addTable)} className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">
                            New Pool Table
                        </h2>
                        <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                            <X size={30} />
                        </button>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        {/* left side form */}
                        <div className='px-2 space-y-5 border-r border-gray-500'>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Table title</label>
                                <input type="text" className="w-full p-2 border border-red-200 rounded-lg outline-[#dc2626]" {...register("title")} />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Price</label>
                                <input type="text" className="w-full p-2 border border-red-200 rounded-lg outline-[#dc2626]" {...register("price")} />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
                                <textarea className="w-full p-2 border border-red-200 rounded-lg outline-[#dc2626]" {...register("description")}></textarea>
                            </div>

                            <TagInput tags={tags} setTags={setTags} />

                            <DynamicSpecs specs={specs} setSpecs={setSpecs} />
                        </div>

                        {/* right side cont */}
                        <div className='space-y-10'>
                            <ThumbnailUploader thumbnail={thumbnail} setThumbnail={setThumbnail} />
                            <ImageUploader images={images} setImages={setImages} />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end mt-6 space-x-3" >
                        <button type='button' className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50" onClick={() => setModalOpen(false)}>Close</button>

                        <button type='submit' className="px-4 py-2 text-white bg-[#ef4444] rounded-lg hover:bg-[#ef4444]/90">
                            Save Changes
                        </button>
                    </div>
                </form>
            </motion.div>

        </div>
    )
}
