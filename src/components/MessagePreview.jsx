import { PhoneCall } from "lucide-react";
import { useEffect, useState } from "react";
import pb from "../utils/pocketbase";
import SimpleLoading from "./SimpleLoading";

export default function MessagePreview({ messageId, setDummy }) {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function update_status() {
            await pb.collection("messages").update(messageId, { status: "read", requestKey: null });
            setDummy(Math.random())
        }

        async function fetch_data() {
            setLoading(true);
            const results = await pb.collection("messages").getOne(messageId, { requestKey: null });

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
