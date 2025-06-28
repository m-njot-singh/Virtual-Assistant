import React from "react";
import { useContext } from "react";
import { useDeferredValue } from "react";
import { UserDataContext } from "../Context/UserContext";


function Card({ image }) {
    const {frontendImage, setFrontendImage, backendImage, setBackendImage, selectedImage, setSelectedImage} = useContext(UserDataContext)
    return (
        <div className={`w-[100px] h-[140px] lg:w-[200px] lg:h-[240px] bg-[#00000052] rounded-2xl relative group overflow-hidden flex items-end justify-center
         
        `}
        onClick={()=>{
            setSelectedImage(image)
            setBackendImage(null)
            setFrontendImage(null)
            }}>

                <img
                    src={image}
                    alt="Card Visual"
                    className={`w-full h-[70%] lg:w-full lg:h-[90%] object-cover transition-transform duration-500 ease-in-out absolute 
                             ${selectedImage === image
                            ? "grayscale-0 z-10"
                            : "grayscale group-hover:grayscale-0"}
        
                        `}
                    style={{
                        zIndex: 1,
                        transformOrigin: "bottom center",
                        transition: "transform 0.2s, filter 0.2s",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        willChange: "transform",
                    }}
                />
            {/* Enlarged image on hover, overflow visible except bottom */}
            <style>{`
                .group:hover img {
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    );
}

export default Card           