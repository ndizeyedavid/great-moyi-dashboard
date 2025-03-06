import { useEffect, useState } from "react";
import Header from "../components/Header"
import NewTeamMember from "../components/NewTeamMember";
import Sidebar from "../components/Sidebar"
import Stats from "../components/Stats"
import TeamCard from "../components/TeamCard";
import TeamEdit from "../components/TeamEdit";
import SimpleLoading from "../components/SimpleLoading";
import pb from "../utils/pocketbase";
import toast from "react-hot-toast";
import Empty from "../components/Empty";
import DatabaseService from "../services/databaseServices";
import { storage } from "../utils/appwrite";

function Team() {
    const [modalOpen, setModalOpen] = useState(false);
    const [showEditPanel, setShowEditPanel] = useState(false);
    const [loading, setLoading] = useState(true);
    const [team, setTeam] = useState([]);
    const [dummy, setDummy] = useState(0);

    const [memberId, setMemberId] = useState("");

    useEffect(() => {
        async function fetch_data() {
            setLoading(true);
            const results = await DatabaseService.listDocuments(import.meta.env.VITE_TEAM_COLLECTION);
            setTeam(results);
            setLoading(false);
        }


        fetch_data();
    }, [dummy])

    async function handleDelete(id) {
        if (confirm("Are you sure you want to delete this member?")) {
            toast.loading("Deleting user", { id: "delete" })

            const deleteMember = await DatabaseService.deleteDocument(import.meta.env.VITE_TEAM_COLLECTION, id);

            if (deleteMember) {
                toast.success("User deleted", { id: "delete" });
            } else {
                toast.error("Failed to delete member", { id: "delete" });
            }
            setDummy(Math.random())
        }
    }

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
                    <div className="space-y-6" data-oid="u195.:c">
                        <div className="flex items-center justify-between">
                            <h2 className="mb-6 text-xl font-bold text-white">
                                Team Members
                            </h2>

                            <button onClick={() => setModalOpen(true)} className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700">
                                Add Team Member
                            </button>
                        </div>

                        {loading ?
                            <SimpleLoading />
                            :

                            <>
                                {team.length == 0 && <Empty title="No team members on board" text="Try adding new members on the team through the 'Add Team Member' button" />}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    {team.map((member, index) => (
                                        <TeamCard
                                            key={index}
                                            id={member.$id}
                                            avatar={storage.getFilePreview(import.meta.env.VITE_IMAGES_BUCKET, member.avatar)}
                                            name={member.name}
                                            role={member.role}
                                            setMemberId={setMemberId}
                                            setShowEditPanel={setShowEditPanel}
                                            handleDelete={handleDelete}
                                        />
                                    ))}
                                </div>
                            </>
                        }
                    </div>
                </main>
            </div>
            {modalOpen && <NewTeamMember setModalOpen={setModalOpen} setDummy={setDummy} />}
            {showEditPanel && <TeamEdit memberId={memberId} setShowEditPanel={setShowEditPanel} setDummy={setDummy} />}
        </div>
    )
}

export default Team
