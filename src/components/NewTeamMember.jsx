import React, { useState } from 'react'
import { motion } from "framer-motion"
import { X } from 'lucide-react'
import ProfileUpload from './ProfileUpload'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import pb from '../utils/pocketbase'

export default function NewTeamMember({ setModalOpen, setDummy }) {

    function closeModal(e) {
        // console.log(e.target.id)
        if (e.target.id === "modal") {
            setModalOpen(false)
        }
    }

    const [profilePic, setProfilePic] = useState(null);
    const { register, handleSubmit, reset } = useForm();


    async function addMember(data) {
        toast.loading("Adding new team member", { id: "add" });
        try {
            const formData = {
                name: data.name,
                role: data.role,
                description: data.description,
                avatar: profilePic,
            }

            await pb.collection("team").create(formData)
            toast.success("New team member is added", { id: "add" });
            setDummy(Math.random())
            setModalOpen(false);
        } catch (err) {
            toast.error("Failed to add new member", { id: "add" });
        }

    }

    return (
        <div id='modal' onClick={(e) => closeModal(e)} className='absolute top-0 flex items-center justify-center w-full h-full bg-black/70'>

            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">
                            New Team Member
                        </h2>
                        <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                            <X size={30} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(addMember)} className='space-y-4'>
                        {/* Name */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-lg outline-[#ef4444]"
                                required
                                {...register("name")}
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Role</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-lg outline-[#ef4444]"
                                required
                                {...register("role")}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
                            <textarea className="w-full p-2 border border-gray-300 rounded-lg outline-[#ef4444]" required {...register("description")}></textarea>
                        </div>

                        {/* Profile Picture */}

                        <ProfileUpload setProfilePic={setProfilePic} />

                        {/* Submit Button */}
                        <button type="submit" className="w-full py-2 text-white bg-[#ef4444] rounded-lg hover:bg-[#ef4444]/90">
                            Add Member
                        </button>
                    </form>

                </div>
            </motion.div>
        </div>
    )
}
