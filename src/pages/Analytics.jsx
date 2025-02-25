import { useEffect, useState } from "react";
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Stats from "../components/Stats"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, LineChart, Line, PieChart, Pie, ResponsiveContainer } from 'recharts';
import GraphLoading from "../components/GraphLoading";
import pb from "../utils/pocketbase";
import { RotateCw } from "lucide-react";

import "../styles/print.css"
// Sample data

const maintenanceData = [
    { name: 'Equipment', value: 400 },
    { name: 'Labor', value: 300 },
    { name: 'Supplies', value: 200 },
    { name: 'Other', value: 100 },
];

function Analytics() {

    const [dummy, setDummy] = useState(0);

    // chart 1
    const [tables, setTables] = useState([]);

    // chart 2
    const [tableViews, setTableViews] = useState([]);

    // chart 3
    const [websiteViews, setWebsiteViews] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetch_tables_data() {
            setLoading(true);
            const tableAdded = await pb.collection("tables").getFullList();


            // Count tables added per month
            const months = Array.from({ length: new Date().getMonth() + 1 }, (_, i) => ({
                month: new Date(2024, i, 1).toLocaleString("en-US", { month: "long" }),
                count: 0,
            }));

            tableAdded.forEach((table) => {
                const date = new Date(table.created);
                const monthIndex = date.getMonth();
                months[monthIndex].count += 1;
            });


            const webViews = Array.from({ length: new Date().getMonth() + 1 }, (_, i) => ({
                month: new Date(2024, i, 1).toLocaleString("en-US", { month: "long" }),
                views: 0,
            }));

            // Sum up views for each month
            tableAdded.forEach((table) => {
                const date = new Date(table.created);
                const monthIndex = date.getMonth();
                webViews[monthIndex].views += table.views || 0; // Default views to 0 if missing
            });

            // chart 3
            setWebsiteViews(webViews);



            // table views (barchart)
            const formattedData = tableAdded.map(table => ({
                name: table.name,
                views: table.views || 0,
            }));

            // chart 2
            setTableViews(formattedData)

            // chart 1
            setTables(months);
            console.log(months);


            setLoading(false)
        }

        fetch_tables_data();
    }, [dummy]);


    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black">

            <Sidebar />

            <div className="flex-1" data-oid="hb7lodr">
                {/* Header */}
                <Header />

                {/* Main Content */}
                <main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8" data-oid="35q5ixw">
                    {/* Stats Grid */}
                    <Stats />

                    {/* Content Sections */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">
                                Analytics
                            </h2>
                            <div className="flex space-x-4 no-print">
                                <button onClick={() => setDummy(Math.random())} className="p-2 text-white bg-red-600 rounded-lg aspect-square hover:bg-red-700"> <RotateCw /></button>
                                <button onClick={() => print()} className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"> Export Report </button>
                            </div>
                        </div>
                        {loading ?
                            <GraphLoading />

                            :

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="p-6 bg-gray-900 border rounded-lg print-reduce border-red-900/20">
                                    <h3 className="mb-4 text-lg font-semibold text-white">
                                        Table Added
                                    </h3>
                                    <div className="h-64 p-4 bg-gray-800 rounded-lg">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={tables}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                                <XAxis dataKey="month" stroke="#9CA3AF" />
                                                <YAxis stroke="#9CA3AF" />
                                                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                                                <Area type="monotone" dataKey="count" stroke="#EF4444" fill="#991B1B" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="p-6 bg-gray-900 border rounded-lg border-red-900/20">
                                    <h3 className="mb-4 text-lg font-semibold text-white">
                                        Table Views
                                    </h3>
                                    <div className="h-64 p-4 bg-gray-800 rounded-lg">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={tableViews}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                                <XAxis dataKey="name" stroke="#9CA3AF" />
                                                <YAxis stroke="#9CA3AF" />
                                                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                                                <Bar dataKey="views" fill="#EF4444" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="p-6 bg-gray-900 border rounded-lg border-red-900/20">
                                    <h3 className="mb-4 text-lg font-semibold text-white">
                                        Website views
                                    </h3>
                                    <div className="h-64 p-4 bg-gray-800 rounded-lg">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={websiteViews}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                                <XAxis dataKey="month" stroke="#9CA3AF" />
                                                <YAxis stroke="#9CA3AF" />
                                                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                                                <Line type="monotone" dataKey="views" stroke="#EF4444" />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="p-6 bg-gray-900 border rounded-lg border-red-900/20">
                                    <h3 className="mb-4 text-lg font-semibold text-white">
                                        Ads Engagement
                                    </h3>
                                    <div className="h-64 p-4 bg-gray-800 rounded-lg">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={maintenanceData}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    cx="50%"
                                                    cy="50%"
                                                    fill="#EF4444"
                                                    label
                                                />
                                                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                </main>
            </div>
        </div>
    )
}

export default Analytics
