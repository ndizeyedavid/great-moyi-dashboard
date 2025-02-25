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
                        <div className="relative" data-oid="x3ftqmv">
                            <span
                                className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-600 rounded-full -top-1 -right-1"
                                data-oid="wd_67yw"
                            >
                                {notifications}
                            </span>
                            <button className="p-2 text-red-500 transition-colors rounded-lg hover:bg-gray-800 hover:text-red-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-oid="ak5eihk" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" data-oid="r45p9mg" /> </svg>
                            </button>
                        </div>
                        <div className="flex items-center space-x-2" data-oid="28i7nn_">
                            <button className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-gradient-to-r from-red-600 to-red-800">
                                GM
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
