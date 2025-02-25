import { SquarePen, Trash2 } from 'lucide-react'
import React from 'react'

export default function TeamCard({ id, avatar, name, role, setMemberId, setShowEditPanel, handleDelete }) {

    function handleUpdate() {
        setMemberId(id)
        setShowEditPanel(true)
    }

    return (
        <div className="relative p-6 text-center transition-colors bg-gray-900 border rounded-lg border-red-900/20 hover:border-red-500/50">
            <button onClick={() => handleDelete(id)} className="absolute px-3 py-1 text-red-900 right-2 top-3 hover:text-red-700">
                <Trash2 />
            </button>

            <div className="mb-4 text-4xl" data-oid="tl:55dt">
                <img src={avatar} className='object-cover mx-auto rounded-full border shadow-md border-[#b91c1c] aspect-square' width={150} />
            </div>

            <h3 className="mb-2 font-semibold text-white">
                {name}
            </h3>
            <p className="mb-4 text-sm text-gray-400">
                {role}
            </p>
            <div className="flex justify-center space-x-2">
                <button onClick={handleUpdate} className="px-3 py-1 text-red-500 hover:text-red-400">
                    <SquarePen />
                </button>
            </div>
        </div>
    )
}
