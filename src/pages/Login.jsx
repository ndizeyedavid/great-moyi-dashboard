import { useEffect, useState } from 'react';
import pb from "../utils/pocketbase"
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import SimpleLoading from '../components/SimpleLoading';

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [authing, setAuthing] = useState(false);

    useEffect(() => {
        async function checkSession() {
            setAuthing(true);

            const loggedIn = await AuthService.getAdmin();
            if (loggedIn) {
                navigate("/tables")
            } else {
                setAuthing(false);
            }
        }

        checkSession();
    }, [])

    async function loginAdmin(data) {
        setLoading(true)
        toast.loading("Signing in...", { id: "login" });

        const login = await AuthService.login(data.email, data.password);

        if (login) {
            toast.success("Authenticated " + data.email, { id: "login" });
            navigate("/tables");
            setLoading(false);
        } else {
            toast.error("Access Denied. Check your credentials", { id: "login" })
            setLoading(false);
        }

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
            {authing ?
                <SimpleLoading />
                :
                <div className="w-full max-w-md p-8 bg-gray-800 border shadow-xl rounded-2xl border-red-900/20">
                    {/* Logo/Header Section */}
                    <div className="mb-8 text-center">
                        <h2 className="mb-2 text-4xl font-bold text-white">Welcome Back</h2>
                        <p className="text-gray-400">Sign in to continue</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit(loginAdmin)} className="space-y-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-300">
                                Email Address
                            </label>
                            <input
                                disabled={loading}
                                type="email"
                                className="w-full px-4 py-3 text-white transition-all bg-gray-700 border border-gray-600 rounded-lg outline-none focus:ring-red-500 focus:border-red-500"
                                placeholder="Enter your email"
                                {...register("email")}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <input
                                disabled={loading}
                                type="password"
                                className="w-full px-4 py-3 text-white transition-all bg-gray-700 border border-gray-600 rounded-lg outline-none focus:ring-red-500 focus:border-red-500"
                                placeholder="Enter your password"
                                {...register("password")}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label></label>

                            <a href="#" className="text-sm text-red-500 hover:text-red-400">
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full px-4 py-3 text-white transition-colors duration-300 bg-red-600 rounded-lg hover:bg-red-700"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            }
        </div>
    );
}

export default Login;
