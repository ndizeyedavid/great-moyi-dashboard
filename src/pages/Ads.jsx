import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Stats from "../components/Stats";

function Ads() {
    const [ads, setAds] = useState([
        { id: 1, title: "Summer Sale", image: "/ads/summer-sale.jpg", status: "Active" },
        { id: 2, title: "Black Friday Deal", image: "/ads/black-friday.jpg", status: "Inactive" },
    ]);

    const [newAd, setNewAd] = useState({ title: "", image: "" });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewAd({ ...newAd, image: URL.createObjectURL(file) });
        }
    };

    const handleAddAd = () => {
        if (newAd.title && newAd.image) {
            setAds([...ads, { id: ads.length + 1, ...newAd, status: "Active" }]);
            setNewAd({ title: "", image: "" });
        }
    };

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
                        <h2 className="text-xl font-semibold">Manage Advertisements</h2>
                        <div className="grid gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
                            {ads.map((ad) => (
                                <div key={ad.id} className="p-4 bg-gray-800 rounded-lg shadow">
                                    <img src={ad.image} alt={ad.title} className="object-cover w-full h-32 rounded-md" />
                                    <h3 className="mt-2 text-lg font-medium">{ad.title}</h3>
                                    <p className={`mt-1 text-sm ${ad.status === "Active" ? "text-green-400" : "text-red-400"}`}>
                                        {ad.status}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
}

export default Ads;
