import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { PenBoxIcon } from "lucide-react";
import { Link } from "react-router-dom";
import DatabaseService from "../services/databaseServices";
import FileService from "../services/fileService";
import { storage } from "../utils/appwrite";

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
            try {
                const results = await DatabaseService.getDocument(
                    import.meta.env.VITE_ADS_COLLECTION,
                    import.meta.env.VITE_AD_DOCUMENT
                );

                if (!results) {
                    console.error("Error: No data returned from DatabaseService.getDocument.");
                    return;
                }

                const imageKeys = ["horizontal1", "horizontal2", "horizontal3", "horizontal4", "vertical1", "vertical2"];

                // Ensure images exist in the results object
                const images = imageKeys
                    .map(key => results[key]) // Extract values
                    .filter(fileId => fileId); // Remove falsy values (undefined, null, "")

                if (images.length === 0) {
                    console.warn("Warning: No valid images found in the document.");
                    return;
                }

                // Update state only if valid fileIds exist
                for (let i = 0; i < images.length; i++) {
                    if (images[i]) {
                        setPreview(prev => ({
                            ...prev,
                            [imageKeys[i]]: storage.getFilePreview(import.meta.env.VITE_IMAGES_BUCKET, images[i])
                        }));
                    } else {
                        console.warn(`Warning: Missing fileId for ${imageKeys[i]}`);
                    }
                }
            } catch (error) {
                console.error("Fetch Ads Error:", error);
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
