import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { PenBoxIcon } from "lucide-react";
import { Link } from "react-router-dom";
import pb from "../utils/pocketbase";

function Ads() {
    const [preview, setPreview] = useState({
        vertical1: null,
        vertical2: null,
        horizontal1: null,
        horizontal2: null,
        horizontal3: null
    });

    useEffect(() => {
        async function fetch_ads() {
            const results = await pb.collection("ads").getOne(import.meta.env.VITE_ADS_UPDATE_ID);

            const imageKeys = ["horizontal1", "horizontal2", "horizontal3", "horizontal4", "vertical1", "vertical2"];
            const images = imageKeys
                .filter(key => results[key])
                .map(key => results[key]);

            for (let i = 0; i < imageKeys.length; i++) {
                setPreview(prev => ({
                    ...prev,
                    [imageKeys[i]]: pb.files.getURL(results, images[i])
                }));
            }
        }

        fetch_ads();
    }, []);

    const ImageUploadBox = ({ position, defaultImage, className }) => (
        <div className={`relative group ${className}`}>
            <div className="h-full overflow-hidden rounded-md">
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
                {/* Header */}
                <Header />

                {/* Main Content */}
                <main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Stats Section */}
                    {/* <Stats /> */}

                    {/* Advertisement List */}
                    <section className="mt-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Manage Advertisements</h2>

                            <div className="flex space-x-4 no-print">
                                <Link to="/ads/edit" className="p-2 text-white bg-red-600 rounded-lg aspect-square hover:bg-red-700"> <PenBoxIcon /></Link>
                                {/* <button className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"> Export Report </button> */}
                            </div>
                        </div>

                        <div className="flex w-full gap-4 mt-5">
                            <ImageUploadBox
                                position="vertical1"
                                defaultImage="/sample-vertical.jpg"
                                className="w-[200px]"
                            />

                            <div className="flex flex-col w-full gap-10">
                                <ImageUploadBox
                                    position="horizontal1"
                                    defaultImage="/sample-horizontal.jpg"
                                    className="h-[150px]"
                                />
                                <ImageUploadBox
                                    position="horizontal2"
                                    defaultImage="/sample-horizontal.jpg"
                                    className="h-[260px]"
                                />
                                <ImageUploadBox
                                    position="horizontal3"
                                    defaultImage="/sample-horizontal.jpg"
                                    className="h-[150px]"
                                />
                            </div>

                            <ImageUploadBox
                                position="vertical2"
                                defaultImage="/sample-vertical.jpg"
                                className="w-[200px]"
                            />
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
}

export default Ads;
