import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { PenBoxIcon } from "lucide-react";
import { Link } from "react-router-dom";

function Ads() {
    const [ads, setAds] = useState([
        { id: 1, title: "Summer Sale", image: "/ads/summer-sale.jpg", status: "Active" },
        { id: 2, title: "Black Friday Deal", image: "/ads/black-friday.jpg", status: "Inactive" },
    ]);

    const [newAd, setNewAd] = useState({ title: "", image: "" });

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
                            <div className="p-2 bg-yellow-400 w-[200px] rounded-md"></div>


                            <div className="flex flex-col w-full gap-10 ">
                                <div className="h-[150px] p-2 bg-yellow-400 rounded-md"></div>
                                <div className="h-[150px] p-2 bg-yellow-400 rounded-md"></div>
                                <div className="h-[150px] p-2 bg-yellow-400 rounded-md"></div>
                            </div>

                            <div className="p-2 bg-yellow-400 w-[200px] rounded-md"></div>
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
}

export default Ads;
