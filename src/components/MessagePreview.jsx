import { PhoneCall } from "lucide-react";
import { useEffect, useState } from "react";
import pb from "../utils/pocketbase";
import SimpleLoading from "./SimpleLoading";
import DatabaseService from "../services/databaseServices";

export default function MessagePreview({ messageId, setDummy }) {


    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function update_status() {
            await DatabaseService.updateDocument(import.meta.env.VITE_MESSAGES_COLLECTION, messageId, { status: "read" });
            setDummy(Math.random())
        }

        async function fetch_data() {
            setLoading(true);
            const results = await DatabaseService.getDocument(import.meta.env.VITE_MESSAGES_COLLECTION, messageId);

            setData(results)
            setLoading(false);
        }

        fetch_data();
        update_status();

    }, [messageId])

    return (
        <div className="flex flex-col">
            {loading ?

                <SimpleLoading />

                :

                <>
                    {/* TopBar */}
                    <div className="flex items-center gap-2 p-3 border-b border-gray-800">
                        {/* Profile */}
                        <div className="w-[50px] h-[50px] bg-black rounded-full" />

                        <div className="flex flex-col">
                            <h4 className="font-medium text-start">{data.names}</h4>
                            <h5 className="text-sm">{data.email}</h5>
                        </div>
                    </div>

                    <div className="p-7 h-[190px] overflow-auto">
                        <p>{data.message}</p>
                    </div>

                    <div className="flex items-center justify-center p-3 border-t border-gray-800">
                        <button className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800">
                            <PhoneCall />
                            <span>{data.phone}</span>
                        </button>
                    </div>
                </>
            }
        </div>
    )
}
