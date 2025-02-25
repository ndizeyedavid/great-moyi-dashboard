import { NavLink } from "react-router-dom";
import IsLoggedIn from "../utils/session";
import { ChartArea, Image, MessagesSquareIcon, TableCellsMerge, Users2 } from "lucide-react";

export default function Sidebar() {

    IsLoggedIn();

    const navLinks = [
        {
            path: "/tables",
            text: "Tables",
            icon: <TableCellsMerge size={17} />
        },
        {
            path: "/team",
            text: "Team",
            icon: <Users2 size={17} />
        },
        {
            path: "/messages",
            text: "Messages",
            icon: <MessagesSquareIcon size={17} />
        },
        {
            path: "/ads",
            text: "Advertisment",
            icon: <Image size={17} />
        },
        {
            path: "/analytics",
            text: "Analytics",
            icon: <ChartArea size={17} />
        }
    ]

    return (
        <nav className="w-64 bg-black border-r border-red-900  no-print" data-oid="26enmmx">
            <div className="p-6" data-oid="hf4yw4u">
                <div className="flex items-center mb-8 space-x-3" data-oid="pxj.hk1">
                    <div
                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-700"
                        data-oid="frenhv:"
                    >
                        <span className="text-xl font-bold text-white" data-oid="o5ij4bf">
                            GM
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold text-red-500" data-oid="_:msa7h">
                        Great Moyi
                    </h1>
                </div>
                <div className="flex flex-col gap-2 " data-oid="c5c6atz">
                    {navLinks.map((data, index) => (
                        <NavLink to={data.path}
                            key={index}
                            id={"link_" + index}
                            className='flex items-center w-full gap-2 px-4 py-2 font-medium text-left text-gray-400 capitalize rounded-lg'>
                            <span className="flex items-center justify-center w-8 h-8 bg-black rounded-full">
                                {data.icon}
                            </span>
                            {data.text}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>

    )
}
