import { useState } from "react";
import {React, createContext} from "react";
import axios from "axios"
import { useEffect } from "react";
export const UserDataContext= createContext()
function UserContext({children}){
    const serverUrl = "http://localhost:8000"
    const [userData,setUserData] = useState(null)
    const [frontendImage, setFrontendImage] = useState(null)
    const [backendImage, setBackendImage] = useState(null)
    const [selectedImage,setSelectedImage] = useState(null)
    const [loading, setLoading] = useState(true);
    
    const handleCurrentUser = async()=>{
        try {
            const result = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
            console.log("Current user:", result.data); 
            setUserData(result.data);
            console.log(result.data);
            
        } catch (error) {
            console.log(error);
            
        }finally {
            setLoading(false);
        }
    }


    const getGeminiResponse = async(command)=>{
        try {
            const result = await axios.post(`${serverUrl}/api/user/askToAssistant`,{command},{withCredentials:true});
            return result.data
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        handleCurrentUser()
    },[])


    const value={
        serverUrl,userData,setUserData,frontendImage,setFrontendImage,backendImage,setBackendImage,selectedImage,setSelectedImage, loading, handleCurrentUser, getGeminiResponse

    }


    return(
            <UserDataContext.Provider value={value}>
                {children}
            </UserDataContext.Provider>
    
    )
}

export default UserContext
