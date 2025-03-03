import { useEffect, useState } from "react";
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import SimpleLoading from "../components/SimpleLoading";
import pb from "../utils/pocketbase";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

function SiteConfiguration() {
    const [loading, setLoading] = useState(true);
    const [dummy, setDummy] = useState(Math.random());
    const [fetching, setFetching] = useState(false);
    const [data, setData] = useState([]);
    const { register, handleSubmit } = useForm();

    // form inputs
    const [about, setAbout] = useState("");
    const [legacy, setLegacy] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [facebook, setFacebook] = useState("");
    const [twitter, setTwitter] = useState("");
    const [instagram, setInstagram] = useState("");
    const [linkedIn, setLinkedIn] = useState("");
    const [tables, setTables] = useState("");
    const [clients, setClients] = useState("");
    const [districts, setDistricts] = useState("");
    const [experience, setExprience] = useState("");

    useEffect(() => {
        async function fetch_data() {
            setFetching(true);
            const results = await pb.collection("site").getOne(import.meta.env.VITE_SITE_UPDATE_ID, { requestKey: null });

            setData(results);

            setAbout(results.about);
            setLegacy(results.legacy);
            setPhone(results.phone);
            setEmail(results.email);
            setAddress(results.address);
            setFacebook(results.facebook);
            setTwitter(results.twitter);
            setInstagram(results.instagram);
            setLinkedIn(results.linkedIn);
            setTables(results.tables_sold);
            setClients(results.happy_clients);
            setDistricts(results.districts);
            setExprience(results.experience);

            setFetching(false);
        }

        fetch_data();
    }, [dummy])


    async function updateSite(useless) {
        toast.loading("Updating site settings", { id: "update" });
        setLoading(true);

        const toInsert = {
            about: about,
            legacy: legacy,
            phone: phone,
            email: email,
            address: address,
            facebook: facebook,
            twitter: twitter,
            instagram: instagram,
            linkedIn: linkedIn,
            tables_sold: tables,
            happy_clients: clients,
            districts: districts,
            experience: experience
        }
        // return console.log(toInsert);
        try {
            await pb.collection('site').update(import.meta.env.VITE_SITE_UPDATE_ID, toInsert)
            toast.success("Site data updated", { id: "update" });
        } catch (err) {
            toast.error("Unable to update data", { id: "update" });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black">
            <Sidebar />

            <div className="flex-1" data-oid="hb7lodr">
                {/* Header */}
                <Header />

                {/* Main Content */}
                <main className="px-4 py-8 mx-auto site-config max-w-7xl sm:px-6 lg:px-8" data-oid="35q5ixw">
                    {/* Stats Grid */}
                    {/* <Stats /> */}

                    {/* Content Sections */}
                    {fetching && <SimpleLoading />}
                    <form onSubmit={handleSubmit(updateSite)}>
                        <fieldset className="space-y-6 p-5 py-2 pb-5 border rounded-md border-[#dc2626]">
                            <legend className="text-xl font-bold text-white px-4 py-2 border border-[#dc2626] rounded-md">Website Content</legend>

                            <fieldset className="p-5 border rounded-md border-[#dc2626]">
                                <legend className="px-4 py-2 text-lg text-[#dc2626] border border-[#dc2626] rounded-md">Company Info</legend>

                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700">About Us</label>
                                        <textarea defaultValue={data.about} onKeyUp={(e) => setAbout(e.target.value)} type="text" className="w-full p-2 border border-red-200 rounded-lg outline-[#dc2626] h-[150px]" placeholder="Describe more about what you do..." {...register("about")} ></textarea>
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700">Our Legacy</label>
                                        <textarea defaultValue={data.legacy} onKeyUp={(e) => setLegacy(e.target.value)} type="text" className="w-full p-2 border border-red-200 rounded-lg outline-[#dc2626] h-[150px]" placeholder="Tell the world how this business started...." {...register("legacy")}></textarea>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset className="p-5 border rounded-md border-[#dc2626]">
                                <legend className="px-4 py-2 text-lg text-[#dc2626] border border-[#dc2626] rounded-md">Contact info</legend>

                                <div className="grid grid-cols-3 gap-5">
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700">Phone Number</label>
                                        <input defaultValue={data.phone} onKeyUp={(e) => setPhone(e.target.value)} type="text" className="w-full p-2 border border-red-200 rounded-lg outline-[#dc2626]" {...register("phone")} />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                                        <input defaultValue={data.email} onKeyUp={(e) => setEmail(e.target.value)} type="email" className="w-full p-2 border border-red-200 rounded-lg outline-[#dc2626]" {...register("email")} />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700">Address</label>
                                        <input defaultValue={data.address} onKeyUp={(e) => setAddress(e.target.value)} type="text" className="w-full p-2 border border-red-200 rounded-lg outline-[#dc2626]" {...register("address")} />
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset className="p-5 border rounded-md border-[#dc2626]">
                                <legend className="px-4 py-2 text-lg text-[#dc2626] border border-[#dc2626] rounded-md">Social Media Links</legend>

                                <div className="grid grid-cols-4 gap-5">
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700">Facebook</label>
                                        <input defaultValue={data.facebook} onKeyUp={(e) => setFacebook(e.target.value)} type="text" className="w-full p-2 border border-red-200 rounded-lg outline-[#dc2626]" {...register("facebook")} />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700">Twitter</label>
                                        <input defaultValue={data.twitter} onKeyUp={(e) => setTwitter(e.target.value)} type="text" className="w-full p-2 border border-red-200 rounded-lg outline-[#dc2626]" {...register("twitter")} />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700">Instagram</label>
                                        <input defaultValue={data.instagram} onKeyUp={(e) => setInstagram(e.target.value)} type="text" className="w-full p-2 border border-red-200 rounded-lg outline-[#dc2626]" {...register("instagram")} />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700">Linked In</label>
                                        <input defaultValue={data.linkedIn} onKeyUp={(e) => setLinkedIn(e.target.value)} type="text" className="w-full p-2 border border-red-200 rounded-lg outline-[#dc2626]" {...register("linkedIn")} />
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset className="p-5 border rounded-md border-[#dc2626]">
                                <legend className="px-4 py-2 text-lg text-[#dc2626] border border-[#dc2626] rounded-md">Other Info</legend>

                                <div className="grid grid-cols-4 gap-5">
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700">Tables Sold</label>
                                        <input defaultValue={data.tables_sold} onKeyUp={(e) => setTables(e.target.value)} type="text" className="w-full p-2 border border-red-200 rounded-lg outline-[#dc2626]" {...register("tables_sold")} />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700">Happy Clients</label>
                                        <input defaultValue={data.happy_clients} onKeyUp={(e) => setClients(e.target.value)} type="text" className="w-full p-2 border border-red-200 rounded-lg outline-[#dc2626]" {...register("happy_clients")} />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700">Operating Districts</label>
                                        <input defaultValue={data.districts} onKeyUp={(e) => setDistricts(e.target.value)} type="text" className="w-full p-2 border border-red-200 rounded-lg outline-[#dc2626]" {...register("districts")} />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700">Years of experience</label>
                                        <input defaultValue={data.experience} onKeyUp={(e) => setExprience(e.target.value)} type="text" className="w-full p-2 border border-red-200 rounded-lg outline-[#dc2626]" {...register("experience")} />
                                    </div>
                                </div>
                            </fieldset>

                            <button type='submit' className="px-4 py-2 w-full text-white bg-[#dc2626] rounded-lg hover:bg-[#dc2626]/70">
                                Save Changes
                            </button>
                        </fieldset>
                    </form>
                </main>
            </div>
        </div>
    )
}

export default SiteConfiguration
