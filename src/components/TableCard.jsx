import { Eye, Heart } from 'lucide-react'
import React, { useState } from 'react'

export default function TableCard({ id, name, thumbnail, status, price, likes, views, setShowDetailsModal, setTableId }) {


    function handleShowDetails() {
        setShowDetailsModal(true)
        setTableId(id)
    }

    return (
        <div className="p-4 transition-all duration-300 transform bg-gray-900 border rounded-lg border-red-900/20 hover:shadow-lg hover:border-red-500/30 hover:-translate-y-1">
            <div
                className="flex items-start justify-between mb-4"
                data-oid="vr5fldg"
            >
                <h3 className="font-semibold text-white capitalize">
                    {name}
                </h3>
                <span
                    className={`px-2 py-1 rounded-full text-xs ${status === 'Available'
                        ? 'bg-green-100 text-green-800'
                        : status === 'InUse'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                    {status}
                </span>
            </div>

            <div className='w-full h-[200px] rounded-md bg-black mb-4 overflow-hidden'>
                <img src={thumbnail} className='object-cover w-full h-full' alt="Thumbnail" />
            </div>

            <p className="mb-4 text-2xl font-bold text-red-500">
                {price.toLocaleString()} RWF
            </p>
            <div className="flex justify-between mb-4 text-sm text-gray-500">
                <span className='flex items-center gap-1'>
                    <Heart fill='#b91c1c' className='text-[#b91c1c]' size={25} /> {likes}
                </span>
                <span className='flex items-center gap-1'>
                    <Eye fill='#fff' className='text-black' size={25} /> {views}
                </span>
            </div>
            <div className="flex space-x-2">
                <button onClick={handleShowDetails} className="w-full px-3 py-2 text-sm text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700">
                    Manage
                </button>
            </div>

        </div>
    )
}
