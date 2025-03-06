import { useEffect, useState } from "react";
import pb from "../utils/pocketbase";
import GridLoading from "./GridLoading";
import DatabaseService from "../services/databaseServices";

export default function Stats() {


    const [tables, setTables] = useState(0);
    const [team, setTeam] = useState(0);
    const [views, setViews] = useState(0);
    const [messages, setMessages] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetch_data() {
            setLoading(true)
            const tb = await DatabaseService.listDocuments(import.meta.env.VITE_TABLES_COLLECTION);
            const tm = await DatabaseService.listDocuments(import.meta.env.VITE_TEAM_COLLECTION);
            const msg = await DatabaseService.listDocuments(import.meta.env.VITE_MESSAGES_COLLECTION);
            setTables(tb.length);
            setTeam(tm.length)
            setMessages(msg.length);

            const totalViews = tb.reduce((sum, tb) => sum + (tb.views || 0), 0);

            setViews(totalViews);

            setLoading(false)
        }

        fetch_data();
    }, [])

    const stats = [
        { label: 'Total Tables', value: tables },
        { label: 'Team', value: team },
        { label: 'Monthly Views', value: views },
        { label: 'New Messages', value: messages },
    ];

    return (
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-4" data-oid="qcgj_p8">
            {loading ?
                <GridLoading />
                :

                stats.map((stat, index) => (
                    <div
                        key={index}
                        className="p-6 transition-all duration-300 transform bg-gray-800 border rounded-xl hover:shadow-xl border-red-900/20 hover:border-red-500/30 hover:-translate-y-1"
                        data-oid="sonyv_3"
                    >
                        <p className="text-sm text-gray-400" data-oid="ikhbon4">
                            {stat.label}
                        </p>
                        <div
                            className="flex items-center justify-between mt-2"
                            data-oid="c8-rsm6"
                        >
                            <p className="text-2xl font-bold text-white" data-oid="4ictpci">
                                {stat.value}
                            </p>
                            <span
                                className="text-sm font-medium text-red-500"
                                data-oid="v2q:hqy"
                            >
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}
