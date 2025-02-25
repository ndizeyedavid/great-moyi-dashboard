import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SingleMessage from "../components/SingleMessage";
import { useEffect, useState } from "react";
import pb from "../utils/pocketbase";
import SimpleLoading from "../components/SimpleLoading";
import Empty from "../components/Empty";
import MessagePreview from "../components/MessagePreview";

export default function Messages() {

    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [messageId, setMessageId] = useState("");
    const [dummy, setDummy] = useState(0);

    useEffect(() => {
        async function fetch_data() {
            setLoading(true);
            const results = await pb.collection("messages").getFullList();

            setMessages(results);
            setLoading(false);
        }

        fetch_data();
    }, [dummy])


    return (

        <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black">

            <Sidebar />

            <div className="flex-1" data-oid="hb7lodr">
                {/* Header */}
                <Header />

                {/* Main Content */}
                <main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8" data-oid="35q5ixw">
                    {/* Stats Grid */}
                    {/* <Stats /> */}

                    {/* Content Sections */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white" data-oid="sadxaab">
                                Messages
                            </h2>
                        </div>

                        <div className="flex gap-4" data-oid="kbktono">
                            <div className="w-1/3 p-4 bg-gray-900 border rounded-lg border-red-900/20">
                                <div className="mb-4" data-oid="d_s6wuc">
                                    <input type="text" placeholder="Search messages..." className="w-full px-4 py-2 text-white placeholder-gray-500 bg-gray-800 border rounded-lg outline-none border-red-900/20" />
                                </div>
                                {loading ?
                                    <SimpleLoading />
                                    :
                                    <>
                                        {messages.length === 0 && <Empty title="No messages sent at this moment" text="Wait for your customers to start sending sweet messages" />}
                                        <div className="space-y-2" data-oid="n7lip30">
                                            {messages.map((message, index) => (
                                                <SingleMessage key={index} id={message.id} status={message.status} from={message.names} time={new Date(message.created).toLocaleString()} subject={message.email} setMessageId={setMessageId} />
                                            ))}
                                        </div>
                                    </>
                                }
                            </div>
                            <div className="w-2/3 bg-gray-900 border rounded-lg border-red-900/20">
                                <div className="text-gray-400 ">
                                    {messageId === "" ?
                                        <Empty title="Select a message to preview" />

                                        :

                                        <MessagePreview messageId={messageId} setDummy={setDummy} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>

    )
}
