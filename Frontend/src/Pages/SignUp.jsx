import {useState,React, useContext} from "react";
import bg from "../assets/auth_bg.jpg";
import { PiEyeBold } from "react-icons/pi";
import { PiEyeClosedBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../Context/UserContext";
import axios from "axios";
function SignUp(){
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err,setErr] = useState("");
    const [loading, setLoading] = useState(false);

    const {serverUrl,userData,setUserData} = useContext(UserDataContext)


    // Import useNavigate from react-router-dom
    const navigate = useNavigate();

    const handleSignUp = async(e)=>{
        e.preventDefault()
        setErr("");
        setLoading(true);
        try {
            let result = await axios.post(`${serverUrl}/api/auth/signUp`,{name, email, password}, {withCredentials:true})
            setUserData(result.data)
            setLoading(false)
            navigate("/Customize")
        } catch (error) {
            console.log(error);
            setUserData(null)
            setLoading(false);
            setErr(error.response.data.message)
            
        }
    }

    return (
        <div className="w-full h-screen bg-gray-100 flex items-center justify-end bg-cover" style={{ backgroundImage: `url(${bg})` }}>
            <form className="w-full max-w-[600px] bg-white/20 backdrop-blur-md shadow-2xl rounded-3xl flex flex-col items-center justify-center p-10 mx-4 mr-16" onSubmit={handleSignUp}>
                <h2 className="w-full flex flex-col items-center justify-center mb-2 mt-2">
                    <span className="flex items-center justify-center gap-3 text-3xl font-extrabold text-center">
                        <span className="inline-block animate-bounce text-4xl">🤖</span>
                        <span>
                            <span className="bg-black/70 px-3 py-1 rounded-xl shadow-lg mr-2 text-white">Register</span>
                            <span className="text-white/80">to</span>
                            <span className="ml-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-black">Virtual Assistant</span>
                        </span>
                    </span>
                </h2>
                <p className="text-white/70 mb-8 text-center text-base italic">Join us and let your AI assistant make life easier, smarter, and more fun! 🚀</p>
                <div className="w-full mb-5">
                    <input
                        id="name"
                        type="text"
                        className="w-full p-3 rounded-xl bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        placeholder="Enter your name"
                        required
                        onChange={(e)=>{setName(e.target.value)}}
                        value={name}
                    />
                </div>
                <div className="w-full mb-5">
                    <input
                        id="email"
                        type="email"
                        className="w-full p-3 rounded-xl bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        placeholder="Email"
                        required
                        onChange={(e)=>{setEmail(e.target.value)}}
                        value={email}
                    />
                </div>
                <div className="w-full mb-7 relative">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="w-full p-3 rounded-xl bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        placeholder="Password"
                        required
                        onChange={(e)=>{setPassword(e.target.value)}}
                        value={password}
                    />
                    {showPassword ? (
                        <PiEyeClosedBold
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword(false)}
                        />
                    ) : (
                        <PiEyeBold
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword(true)}
                        />
                    )}
                </div>
                {err.length>0 && <p className="text-red-500 pb-6">
                    *{err}
                    </p>}
                <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-xl font-semibold transition mb-4 hover:bg-white hover:text-black"
                    disabled={loading}
                >
                    {loading?"Loading...":"Sign Up"}
                </button>
                <div className="w-full text-center">
                    <span className="text-white">Already have an account? </span>
                    <a
                        href="#"
                        className="text-white hover:text-black px-2 py-1 rounded transition font-semibold"
                        onClick={e => {
                            e.preventDefault();
                            navigate("/SignIn");
                        }}
                    >
                        Sign In
                    </a>
                </div>
            </form>
        </div>
    )
}

export default SignUp