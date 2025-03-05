import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Check, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import pb from "../utils/pocketbase";

function EditAds() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [preview, setPreview] = useState({});
    const [uploads, setUploads] = useState({});

    const onSubmit = async () => {
        if (Object.keys(uploads).length === 0) {
            toast.error("No images selected for update", { id: "ads" });
            return;
        }

        toast.loading("Updating ads", { id: "ads" });
        try {
            await pb.collection("ads").update(import.meta.env.VITE_ADS_UPDATE_ID, uploads);
            toast.success("Ads updated successfully", { id: "ads" });
            navigate("/ads");
        } catch (err) {
            toast.error("Failed to update ads", { id: "ads" });
        }
    };

    const handleImageChange = (e, position) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploads(prev => ({ ...prev, [position]: file }));

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(prev => ({ ...prev, [position]: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        async function fetchAds() {
            try {
                const results = await pb.collection("ads").getOne(import.meta.env.VITE_ADS_UPDATE_ID);
                const imageKeys = ["horizontal1", "horizontal2", "horizontal3", "vertical1", "vertical2"];

                const newPreview = {};
                imageKeys.forEach(key => {
                    if (results[key]) {
                        newPreview[key] = pb.files.getURL(results, results[key]);
                    }
                });
                setPreview(newPreview);
            } catch (error) {
                toast.error("Failed to fetch ad images");
            }
        }
        fetchAds();
    }, []);

    const ImageUploadBox = ({ position, defaultImage, className }) => (
        <div className={`relative group ${className}`}>
            <input
                type="file"
                {...register(position)}
                className="hidden"
                accept="image/*"
                id={position}
                onChange={(e) => handleImageChange(e, position)}
            />
            <div className="h-full overflow-hidden rounded-md cursor-pointer" onClick={() => document.getElementById(position).click()}>
                <img
                    src={preview[position] || defaultImage}
                    className="object-cover w-full h-full transition-all group-hover:scale-105"
                    alt={`${position} Banner`}
                />
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen text-white bg-gradient-to-br from-gray-900 to-black">
            <Sidebar />
            <div className="flex-1">
                <Header />
                <main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Editing Advertisements</h2>
                            <div className="flex space-x-4 no-print">
                                <button type="submit" className="p-2 text-white bg-red-600 rounded-lg aspect-square hover:bg-red-700" title="Verify">
                                    <Check />
                                </button>
                                <Link to="/ads" className="p-2 text-white bg-red-600 rounded-lg aspect-square hover:bg-red-700" title="Cancel">
                                    <X />
                                </Link>
                            </div>
                        </div>

                        <div className="flex w-full gap-4 mt-5">
                            <ImageUploadBox position="vertical1" defaultImage="/sample-vertical.jpg" className="w-[200px]" />
                            <div className="flex flex-col w-full gap-10">
                                <ImageUploadBox position="horizontal1" defaultImage="/sample-horizontal.jpg" className="h-[150px]" />
                                <ImageUploadBox position="horizontal2" defaultImage="/sample-horizontal.jpg" className="h-[260px]" />
                                <ImageUploadBox position="horizontal3" defaultImage="/sample-horizontal.jpg" className="h-[150px]" />
                            </div>
                            <ImageUploadBox position="vertical2" defaultImage="/sample-vertical.jpg" className="w-[200px]" />
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default EditAds;