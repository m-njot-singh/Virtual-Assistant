import React from "react";
import { Navigate, Route,Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Customize from "./Pages/Customize";
import Home from "./Pages/Home";
import { useContext } from "react";
import { UserDataContext } from "./Context/UserContext";
import Customize2 from "./Pages/Customize2";


function App() {
  const {userData,setUserData, loading} = useContext(UserDataContext)
  if (loading) return 
  <div className="min-h-screen w-full relative overflow-hidden font-orbitron tracking-wider flex justify-center items-center flex-wrap flex-col"
            style={{
                background: "linear-gradient(180deg,#101217 0%,#181a1f 40%,#23272f 100%)"
            }}
  
  ></div>;
  return(
    <Routes>
      <Route path="/" element={(userData?.assistantImage && userData?.assistantName)? <Home/>: <Navigate to={"/Customize"}/>}/>
      
      <Route path="/SignIn" element={!userData?<SignIn/> : <Navigate to={"/"}/>}/>
      <Route path="/SignUp" element={!userData?<SignUp/> : <Navigate to={"/"}/>}/>
      <Route path="/Customize" element={userData?<Customize/> : <Navigate to={"/SignUp"}/>}/>
      <Route path="/Customize2" element={userData?<Customize2/> : <Navigate to={"/SignUp"}/>}/>
    </Routes>
  )
}

export default App;