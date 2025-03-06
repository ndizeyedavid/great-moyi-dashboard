import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Stats from "../components/Stats";
import TableCard from "../components/TableCard";
import NewTable from "../components/NewTable";
import TableDetails from "../components/TableDetails";
import SimpleLoading from "../components/SimpleLoading";
import pb from "../utils/pocketbase";
import Empty from "../components/Empty";
import DatabaseService from "../services/databaseServices";
import { storage } from "../utils/appwrite";

function Dashboard() {

    const [modalOpen, setModalOpen] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [tableId, setTableId] = useState("");
    const [dummy, setDummy] = useState(0);

    const [loading, setLoading] = useState(false);
    const [tables, setTables] = useState([]);


    useEffect(() => {
        async function fetch_tables() {
            setLoading(true);
            const results = await DatabaseService.listDocuments(import.meta.env.VITE_TABLES_COLLECTION)
            setTables(results);
            setLoading(false);
        }

        fetch_tables();
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
                    <Stats />

                    {/* Content Sections */}
                    <div className="p-6 bg-gray-800 border shadow-sm rounded-xl border-red-900/20">
                        <div className="space-y-4" data-oid="afl306a">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-3xl font-bold text-white">Pool Tables</h2>

                                <button onClick={() => setModalOpen(true)} className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700">
                                    Add New Table
                                </button>
                            </div>

                            <div>
                                {loading ?
                                    <SimpleLoading />

                                    :

                                    <>
                                        {tables.length == 0 && <Empty title="No pool tables available" text="Looks like you have not yet setup any pool table, try adding one through 'Add New Table' button" />}
                                        <div className="mb-8" data-oid="q-6vbuf">
                                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                                {tables.map((table) => (
                                                    <TableCard
                                                        key={table.id}
                                                        id={table.$id}
                                                        thumbnail={storage.getFilePreview(import.meta.env.VITE_IMAGES_BUCKET, table.thumbnail)}
                                                        name={table.name}
                                                        status={table.status}
                                                        price={table.price}
                                                        likes={table.likes}
                                                        views={table.views}
                                                        setTableId={setTableId}
                                                        setShowDetailsModal={setShowDetailsModal}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {modalOpen && <NewTable setModalOpen={setModalOpen} setDummy={setDummy} />}
            {showDetailsModal && <TableDetails setShowDetailsModal={setShowDetailsModal} tableId={tableId} />}
        </div>
    )
}

export default Dashboard
