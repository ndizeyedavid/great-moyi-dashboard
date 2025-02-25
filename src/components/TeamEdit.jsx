import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { X } from 'lucide-react'
import ProfileUpload from './ProfileUpload'
import pb from '../utils/pocketbase'
import SimpleLoading from './SimpleLoading'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
export default function TeamEdit({ memberId, setShowEditPanel, setDummy }) {

    function closeModal(e) {
        // console.log(e.target.id)
        if (e.target.id === "modal") {
            setShowEditPanel(false)
        }
    }

    const { register, handleSubmit, reset } = useForm();
    const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetch_data() {
            setLoading(true);
            const results = await pb.collection("team").getOne(memberId);

            setData(results);
            setLoading(false);
        }

        fetch_data();
    }, [])

    async function updateMember(data) {
        toast.loading(`Updating ${data.name}...`, { id: "update" });
        try {

            const formData = {
                name: data.name,
                role: data.role,
                description: data.description,
                avatar: profilePic || data.avatar
            }

            await pb.collection("team").update(memberId, formData)
            toast.success("Team member updated", { id: "update" })
            setDummy(Math.random());
            setShowEditPanel(false);
        } catch (err) {
            toast.error("Failed to update member", { id: "update" });
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
                            Edit Staff Member
                        </h2>
                        <button onClick={() => setShowEditPanel(false)} className="text-gray-500 hover:text-gray-700">
                            <X size={30} />
                        </button>
                    </div>

                    {loading ?
                        <SimpleLoading />

                        :

                        <form onSubmit={handleSubmit(updateMember)} className='space-y-4'>
                            {/* Name */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    defaultValue={data.name}
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
                                    defaultValue={data.role}
                                    className="w-full p-2 border border-gray-300 rounded-lg outline-[#ef4444]"
                                    required
                                    {...register("role")}
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
                                <textarea defaultValue={data.description} className="w-full p-2 border border-gray-300 rounded-lg outline-[#ef4444]" required {...register("description")}></textarea>
                            </div>

                            {/* Profile Picture */}

                            <ProfileUpload setProfilePic={setProfilePic} />

                            {/* Submit Button */}
                            <button type="submit" className="w-full py-2 text-white bg-[#ef4444] rounded-lg hover:bg-[#ef4444]/90">
                                Update Member
                            </button>
                        </form>
                    }

                </div>

            </motion.div>
        </div>
    )
}
