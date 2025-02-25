import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { X } from 'lucide-react'
import pb from '../utils/pocketbase';
import SimpleLoading from './SimpleLoading';

export default function TableDetails({ setShowDetailsModal, tableId }) {


    function closeModal(e) {
        // console.log(e.target.id)
        if (e.target.id === "modal") {
            setShowDetailsModal(false)
        }
    }
    const [loading, setLoading] = useState(true);
    const [showSpec, setShowSpec] = useState(false);
    const [data, setData] = useState({});
    const [previewImages, setPreviewImages] = useState([]);
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        async function fetch_data() {
            const result = await pb.collection("tables").getOne(tableId);
            setData(result);
            setPreviewImages(result.preview_images)
            setFeatures(result.features);
            setLoading(false);
        }
        fetch_data();

    }, [tableId])


    return (
        <div id='modal' onClick={(e) => closeModal(e)} className='absolute top-0 flex items-center justify-center w-full h-full bg-black/70'>

            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white rounded-xl max-w-4xl w-full h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">
                            Pool Details
                        </h2>
                        <button onClick={() => setShowDetailsModal(false)} className="text-gray-500 hover:text-gray-700">
                            <X size={30} />
                        </button>
                    </div>

                    {/* contents */}
                    <div className="container px-4 py-8 mx-auto">

                        {/* Product Hero Section */}
                        {loading ?
                            <SimpleLoading />
                            :
                            <div className="grid gap-8 md:grid-cols-2">
                                {/* Image Gallery */}
                                <div className="space-y-4">
                                    <div className="overflow-hidden rounded-lg bg-gray-800/50 aspect-[4/3]">
                                        <img
                                            src={pb.files.getURL(data, data.thumbnail)}
                                            alt="Pool Table"
                                            className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                                        />
                                    </div>

                                    <div className="grid grid-cols-4 gap-4">
                                        {/* {console.log(data.preview_images)} */}
                                        {previewImages.map((image, index) => (
                                            <div key={index} className={`overflow-hidden rounded-lg bg-gray-800/50 aspect-square`} >
                                                <img src={pb.files.getURL(data, image)} alt={`View`} className="object-cover w-full h-full transition-all duration-300 hover:scale-110" />
                                            </div>
                                        ))}
                                    </div>
                                </div>


                                {/* Product Info */}
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h1 className="text-3xl font-bold text-black">{data.name}</h1>
                                        <p className="text-xl text-red-400">{data.price.toLocaleString()} RWF</p>
                                    </div>

                                    <div className="space-y-4 text-gray-800">
                                        <p className="leading-relaxed">{data.description}</p>

                                        <div className="space-y-2">
                                            {features.map((value, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className='text-black'>{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setShowSpec(!showSpec)}
                                            className="px-8 py-3 font-semibold text-black transition-all duration-300 transform border border-red-600 rounded-lg hover:border-red-500 hover:text-white hover:bg-[#b91c1c]"
                                        >
                                            Specifications
                                        </button>
                                    </div>

                                    {/* Specifications Dropdown */}
                                    <div className={`transition-all duration-500 overflow-hidden ${showSpec ? 'max-h-[500px]' : 'max-h-0'}`}>
                                        <div className="p-4 mt-4 space-y-3 border border-gray-700 rounded-lg bg-black/20">
                                            {data.specs.map((spec, index) => (
                                                <div key={index} className="flex justify-between text-sm">
                                                    <span className="text-black">{spec.label}</span>
                                                    <span className="text-red-600">{spec.value}</span>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>

                        }

                    </div>

                </div>
            </motion.div>
        </div>
    )
}
