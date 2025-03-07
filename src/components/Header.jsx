import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation()

    const [notifications, setNotifications] = useState(3);


    return (
        <header className="bg-gray-900 border-b border-red-900 shadow-lg no-print">
            <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8" data-oid="q_53o64">
                <div className="flex items-center justify-between" data-oid="6i837wp">
                    <div className="flex items-center space-x-4" data-oid="5v1hbh7">
                        <span className="text-xl font-bold text-white capitalize">
                            Greetings👋, Admin!
                        </span>
                    </div>
                    <div className="flex items-center space-x-4" data-oid="r_te3hh">
                        <div className="flex items-center space-x-2" data-oid="28i7nn_">
                            <button className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-gradient-to-r from-red-600 to-red-800">
                                GM
                            </button>
                        </div>
                        <div className="relative" data-oid="x3ftqmv">
                            <button className="p-2 text-red-500 transition-colors border border-gray-800 rounded-lg hover:bg-gray-800 hover:text-red-400">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
