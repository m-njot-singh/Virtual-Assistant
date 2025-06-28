import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { UserDataContext } from "../Context/UserContext";
import { IoArrowBackOutline } from "react-icons/io5";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Customize2(){
     // Helper for seeded random (for SSR consistency)
    const seededRand = (seed, i, factor = 1) => {
        let x = Math.sin(seed + i * factor) * 10000;
        return x - Math.floor(x);
    };

    const navigate = useNavigate()

    const {userData,backendImage,selectedImage,serverUrl,setUserData} = useContext(UserDataContext);
    const [assistantName,setAssistantName] = useState(userData?.assistantName || "");
    const [loading, setLoading] = useState(false);

    const handleUpdateAssistant = async ()=>{
        setLoading(true)
        try {
            let formData = new FormData();
            formData.append("assistantName",assistantName);
            if(backendImage){
                formData.append("assistantImage",backendImage);
            }else{
                formData.append("imageUrl",selectedImage);
            }

            const result =await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true});
            setLoading(false)
            console.log(result.data);
            setUserData(result.data);
            
        } catch (error) {
            setLoading(false)
            console.log(error);
            
        }
    }

    return (
        <div className="min-h-screen w-full relative overflow-hidden font-orbitron tracking-wider flex justify-center items-center flex-wrap flex-col"
            style={{
                background: "linear-gradient(180deg,#101217 0%,#181a1f 40%,#23272f 100%)"
            }}
        >
            <IoArrowBackOutline className=" absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] hover:scale-120" onClick={()=>navigate("/Customize")}/>
            {/* Night sky stars */}
            {[...Array(90)].map((_, i) => {
                const rand = (seed) => seededRand(seed, i, 13.13);
                const size = rand(1) * 1.2 + 0.8;
                const opacity = rand(2) * 0.35 + 0.55;
                const blur = rand(3) > 0.7 ? "1.2px" : rand(4) > 0.4 ? "0.7px" : "0.3px";
                const color = rand(5) > 0.7 ? "#fff" : "#e0e0e0";
                const top = `${rand(9) * 70 + 2}%`;
                const left = `${rand(10) * 100}%`;
                const boxShadow =
                    rand(6) > 0.6
                        ? `0 0 ${size * 10 + 6}px 2px #fff, 0 0 ${size * 3 + 1}px 0px ${color}`
                        : `0 0 ${size * 5 + 1}px 0px ${color}`;
                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            top,
                            left,
                            width: `${size}px`,
                            height: `${size}px`,
                            background: color,
                            borderRadius: "50%",
                            opacity,
                            filter: `blur(${blur})`,
                            zIndex: 3,
                            pointerEvents: "none",
                            boxShadow,
                            animation: "starTwinkle 2.5s ease-in-out infinite",
                            animationDelay: `${rand(7) * 2}s`
                        }}
                    />
                );
            })}
            {/* Extra subtle stars */}
            {[...Array(60)].map((_, i) => {
                const rand = (seed) => seededRand(seed, i, 7.77);
                const size = rand(1) * 0.7 + 0.3;
                const opacity = rand(2) * 0.25 + 0.45;
                const blur = rand(3) > 0.7 ? "0.9px" : "0.4px";
                const color = rand(4) > 0.5 ? "#fff" : "#bfc2c7";
                const top = `${rand(9) * 80 + 2}%`;
                const left = `${rand(10) * 100}%`;
                const boxShadow =
                    rand(5) > 0.7
                        ? `0 0 ${size * 7 + 2}px 1px #fff, 0 0 ${size * 2 + 1}px 0px ${color}`
                        : `0 0 ${size * 3 + 1}px 0px ${color}`;
                return (
                    <div
                        key={"extra" + i}
                        style={{
                            position: "absolute",
                            top,
                            left,
                            width: `${size}px`,
                            height: `${size}px`,
                            background: color,
                            borderRadius: "50%",
                            opacity,
                            filter: `blur(${blur})`,
                            zIndex: 3,
                            pointerEvents: "none",
                            boxShadow,
                            animation: "starTwinkle 3.2s ease-in-out infinite",
                            animationDelay: `${rand(8) * 2.5}s`
                        }}
                    />
                );
            })}
            {/* Rain drops */}
            {[...Array(40)].map((_, i) => {
                const left = Math.random() * 100;
                const delay = Math.random() * 3;
                const duration = 1.8 + Math.random() * 1.5;
                const top = Math.random() * 80;
                return (
                    <div
                        key={"rain" + i}
                        style={{
                            position: "absolute",
                            top: `${top}%`,
                            left: `${left}%`,
                            width: "1.5px",
                            height: "36px",
                            background: "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(200,200,200,0.09) 100%)",
                            borderRadius: "1px",
                            opacity: 0.45,
                            zIndex: 5,
                            filter: "blur(0.1px)",
                            pointerEvents: "none",
                            animation: `rainDrop ${duration}s linear ${delay}s infinite`
                        }}
                    />
                );
            })}
            {/* Night clouds */}
            {[...Array(4)].map((_, i) => {
                const top = 8 + i * 10 + Math.random() * 5;
                const left = Math.random() * 70 + 5;
                const scale = Math.random() * 0.7 + 0.7;
                const opacity = 0.10 + Math.random() * 0.10;
                return (
                    <div
                        key={i + "cloud"}
                        style={{
                            position: "absolute",
                            top: `${top}%`,
                            left: `${left}%`,
                            width: `${220 * scale}px`,
                            height: `${60 * scale}px`,
                            background: "radial-gradient(ellipse at 50% 50%, #23272f 60%, #181a1f 100%)",
                            borderRadius: "50%",
                            opacity,
                            filter: "blur(12px)",
                            zIndex: 2,
                            pointerEvents: "none"
                        }}
                    />
                );
            })}
            {/* Subtle animated glow */}
            <div
                className="absolute top-1/2 left-1/2"
                style={{
                    width: "80vw",
                    height: "80vw",
                    maxWidth: "1200px",
                    maxHeight: "1200px",
                    background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(32,34,40,0.12) 60%, rgba(0,0,0,0.0) 100%)",
                    transform: "translate(-50%, -50%)",
                    filter: "blur(90px)",
                    zIndex: 0,
                    animation: "pulseGlow 8s ease-in-out infinite"
                }}
            />
            {/* Futuristic grid overlay */}
            <svg
                className="absolute top-0 left-0 pointer-events-none"
                style={{
                    width: "100vw",
                    height: "100vh",
                    opacity: 0.04,
                    zIndex: 1,
                    filter: "blur(2.5px)"
                }}
                width="100%"
                height="100%"
            >
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#22262c" strokeWidth="0.3"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            {/* Night moon */}
                        <div
                            className="absolute"
                            style={{
                                top: "8%",
                                left: "77%",
                                width: "110px",
                                height: "110px",
                                background: "radial-gradient(circle at 60% 40%, #fff 65%, #f5f5f5 90%, #e0e0e0 100%)",
                                borderRadius: "50%",
                                boxShadow: "0 0 120px 32px #fff, 0 0 48px 8px #f5f5f5, 0 0 24px 4px #fff",
                                zIndex: 4,
                                opacity: 0.8,
                                filter: "blur(0.1px)"
                            }}
                        />
                        <style>
                            {`
                                @keyframes pulseGlow {
                                    0%, 100% { opacity: 0.25; }
                                    50% { opacity: 0.38; }
                                }
                                @keyframes rainDrop {
                                    0% {
                                        opacity: 0.45;
                                        transform: translateY(0);
                                    }
                                    90% {
                                        opacity: 0.45;
                                    }
                                    100% {
                                        opacity: 0;
                                        transform: translateY(80vh);
                                    }
                                }
                                @keyframes starTwinkle {
                                    0%, 100% { opacity: 0.7; }
                                    50% { opacity: 1; }
                                }
                            `}
                        </style>
        
        {/* From Here the Actual Code Starts Uperr Part is of the Background Only */}
        
        <h2 className="w-full flex flex-wrap flex-col items-center justify-center mb-2 mt-2 pb-2">
            <span className="flex flex-wrap items-center justify-center gap-3 text-3xl font-extrabold text-center">
                <span className="inline-block animate-bounce text-4xl">🤖</span>
                <span className="flex flex-wrap justify-center">
                    <span className="bg-black/70 px-3 py-1 rounded-xl shadow-lg mr-2 text-white">Enter</span>
                    <span className="text-white/80">your</span>
                    <span className="ml-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-black">Assistant Name</span>
                </span>
            </span>
        </h2>

        <div className="w-full mb-5 flex z-10 items-center justify-center">
            <input
                type="text"
                className="w-[50%] p-3 rounded-xl bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Assistant Name"
                required
                onChange={(e)=>{setAssistantName(e.target.value)}}
                value={assistantName}
            />
        </div>

        {assistantName && <button className="relative z-20 w-[30%] bg-black text-white py-3 rounded-3xl font-semibold cursor-pointer transition mb-4 hover:bg-white hover:text-black"
        disabled={loading}
        onClick={()=>{
            navigate("/")
            handleUpdateAssistant()
        }}
        >
            {loading?"Loading...":"Launch Assistant"}
        </button>}
                



        </div>
    )
}

export default Customize2